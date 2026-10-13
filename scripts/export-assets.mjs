import { mkdir, writeFile, copyFile } from "node:fs/promises";
import sharp from "sharp";
const dirs = ["brand/assets", "public/brand", "public/images"];
await Promise.all(dirs.map((dir) => mkdir(dir, { recursive: true })));
const symbol = (colour, accent) =>
  `<g><path d="M12 35V18L22 8H42L52 18V35" fill="none" stroke="${colour}" stroke-width="5" stroke-linecap="square" stroke-linejoin="miter"/><path d="M6 28h13v22H6zM45 28h13v22H45z" fill="${colour}"/><path d="M51 45v11H36" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="square"/><path d="M27 52h14v8H27z" fill="${accent}"/></g>`;
const letters = (colour) =>
  `<g fill="${colour}"><path d="M106 12H87L77 22V40L87 50H106V43H91L84 36V26L91 19H106Z"/><path d="M143 12H122L116 18V29L122 35H136V43H116V50H137L143 44V32L137 26H123V19H143Z"/><path fill-rule="evenodd" d="M155 50V12H183V34H162V50ZM162 19V27H176V19Z"/></g>`;
for (const [name, colour, accent] of [
  ["primary", "#006b64", "#102a2a"],
  ["light", "#f7faf9", "#d5f36b"],
  ["mono-dark", "#102a2a", "#102a2a"],
  ["mono-light", "#ffffff", "#ffffff"],
]) {
  const sub = name.startsWith("mono")
    ? colour
    : name.includes("light")
      ? "#f7faf9"
      : "#526763";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 64" role="img" aria-labelledby="title"><title id="title">CSP by kieks.me</title>${symbol(colour, accent)}${letters(colour)}<text x="80" y="62" font-family="Arial,sans-serif" font-size="9" letter-spacing="1.3" fill="${sub}">by kieks.me</text></svg>`;
  await writeFile(`brand/assets/logo-${name}.svg`, svg);
  await writeFile(`public/brand/logo-${name}.svg`, svg);
}
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title"><title id="title">CSP</title>${symbol("#006b64", "#102a2a")}</svg>`;
await writeFile("brand/assets/icon.svg", icon);
await writeFile("public/brand/icon.svg", icon);
for (const size of [32, 192, 512])
  await sharp(Buffer.from(icon))
    .resize(size, size)
    .png()
    .toFile(`public/brand/${size === 32 ? "favicon-32" : `icon-${size}`}.png`);
const apple = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="#f7faf9"/><g transform="translate(39,39) scale(1.6)">${symbol("#006b64", "#102a2a")}</g></svg>`;
await sharp(Buffer.from(apple))
  .png()
  .toFile("public/brand/apple-touch-icon.png");
for (const [locale, lines, note] of [
  [
    "de",
    ["Ihr Serviceportal.", "Ihr Code.", "Ihre Freiheit."],
    "Open Source · Einrichtung & Integration · Kein verpflichtendes Abo",
  ],
  [
    "en",
    ["Your service portal.", "Your code.", "Your freedom."],
    "Open source · Setup & integration · No mandatory subscription",
  ],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f7faf9"/><g transform="translate(70 45)">${symbol("#006b64", "#102a2a")}${letters("#006b64")}<text x="80" y="62" fill="#526763" font-family="Arial,sans-serif" font-size="9" letter-spacing="1.3">by kieks.me</text></g><g transform="translate(850 150) scale(4.2)">${symbol("#dce9e2", "#d5f36b")}</g><g font-family="Arial,sans-serif" font-size="72" font-weight="700" letter-spacing="-3">${lines.map((line, i) => `<text x="70" y="${245 + i * 86}" fill="${i === 2 ? "#006b64" : "#102a2a"}">${line}</text>`).join("")}</g><path d="M70 515h1060" stroke="#b9cbc0"/><text x="70" y="565" fill="#526763" font-family="Arial,sans-serif" font-size="21">${note.replace("&", "&amp;")}</text></svg>`;
  await writeFile(`brand/assets/social-${locale}.svg`, svg);
  await sharp(Buffer.from(svg))
    .png()
    .toFile(`public/brand/social-${locale}.png`);
  await copyFile(
    `public/brand/social-${locale}.png`,
    `brand/assets/social-${locale}.png`,
  );
}
console.log(
  "Exported logo variants, icons and bilingual 1200×630 social images.",
);
