import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
const root = resolve("dist");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".json": "application/json",
};
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  if (!url.pathname.startsWith("/csp-brand/")) {
    res.writeHead(404).end();
    return;
  }
  let relative;
  try {
    relative = decodeURIComponent(url.pathname.slice("/csp-brand/".length));
  } catch {
    res.writeHead(400).end();
    return;
  }
  const file = resolve(
    root,
    relative.endsWith("/") || !relative ? relative + "index.html" : relative,
  );
  if (!file.startsWith(root + sep)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const data = await readFile(file);
    res
      .writeHead(200, {
        "Content-Type": mime[extname(file)] ?? "application/octet-stream",
      })
      .end(data);
  } catch {
    try {
      res
        .writeHead(404, { "Content-Type": "text/html" })
        .end(await readFile(resolve(root, "404.html")));
    } catch {
      res.writeHead(404).end();
    }
  }
});
server.listen(4322, "127.0.0.1", () =>
  console.log("Static test server: http://127.0.0.1:4322/csp-brand/"),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
