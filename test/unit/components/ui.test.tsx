import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});
for (const [key, value] of Object.entries({
  window: dom.window,
  document: dom.window.document,
  navigator: dom.window.navigator,
  HTMLElement: dom.window.HTMLElement,
  Node: dom.window.Node,
  IS_REACT_ACT_ENVIRONMENT: true,
}))
  Object.defineProperty(globalThis, key, {
    value,
    configurable: true,
    writable: true,
  });
const { render, screen, cleanup } = await import("@testing-library/react");
const userEvent = (await import("@testing-library/user-event")).default;
const {
  Button,
  LinkButton,
  FormField,
  Disclosure,
  Avatar,
  Icon,
  Alert,
  Card,
  Badge,
} = await import("@kieksme/csp-ui");
afterEach(cleanup);

test("native action buttons do not submit by default and disabled/busy buttons block clicks", async () => {
  let clicks = 0;
  const view = render(<Button onClick={() => clicks++}>Act</Button>);
  const button = screen.getByRole("button", { name: "Act" });
  assert.equal(button.getAttribute("type"), "button");
  const user = userEvent.setup({ document: dom.window.document });
  await user.click(button);
  assert.equal(clicks, 1);
  view.rerender(
    <Button isDisabled onClick={() => clicks++}>
      Act
    </Button>,
  );
  await user.click(button);
  assert.equal(clicks, 1);
  view.rerender(
    <Button isLoading onClick={() => clicks++}>
      Act
    </Button>,
  );
  assert.equal(button.getAttribute("aria-busy"), "true");
  await user.click(button);
  assert.equal(clicks, 1);
});
test("navigation retains anchor semantics and supplied href", () => {
  render(<LinkButton href="/support">Support</LinkButton>);
  assert.equal(
    screen.getByRole("link", { name: "Support" }).getAttribute("href"),
    "/support",
  );
  assert.equal(screen.queryByRole("button"), null);
});
test("field labels, helper text and validation errors stay programmatically associated", async () => {
  let value = "";
  render(
    <FormField
      label="Email"
      description="Public contact"
      error="Invalid address"
      inputProps={{ onChange: (event) => (value = event.target.value) }}
    />,
  );
  const input = screen.getByLabelText("Email");
  assert.equal(input.getAttribute("aria-invalid"), "true");
  const ids = input.getAttribute("aria-describedby")!.split(" ");
  assert.deepEqual(
    ids.map((id) => dom.window.document.getElementById(id)?.textContent),
    ["Public contact", "Invalid address"],
  );
  await userEvent
    .setup({ document: dom.window.document })
    .type(input, "demo@example.invalid");
  assert.equal(value, "demo@example.invalid");
});
test("icons are decorative by default, but an explicit label has image semantics", () => {
  const view = render(<Icon name="contact" />);
  assert.equal(
    view.container.querySelector("svg")?.getAttribute("aria-hidden"),
    "true",
  );
  view.rerender(<Icon name="contact" label="Contact team" />);
  assert.equal(
    screen
      .getByRole("img", { name: "Contact team" })
      .getAttribute("aria-hidden"),
    null,
  );
});
test("avatar fallback preserves a meaningful name without requiring an external image", () => {
  render(<Avatar name="Lena Beispiel" />);
  assert.equal(
    screen.getByRole("img", { name: "Lena Beispiel" }).textContent,
    "LB",
  );
});
test("disclosure uses native details/summary and feedback roles distinguish status from alert", () => {
  const view = render(
    <Disclosure question="More details">
      <p>Answer</p>
    </Disclosure>,
  );
  assert.equal(
    view.container.querySelector("summary")?.textContent,
    "More details",
  );
  assert.ok(view.container.querySelector("details"));
  view.rerender(<Alert tone="danger">Error</Alert>);
  assert.equal(screen.getByRole("alert").textContent, "Error");
  view.rerender(<Alert tone="success">Available</Alert>);
  assert.equal(screen.getByRole("status").textContent, "Available");
});
test("molecules compose content without owning provider data or navigation", () => {
  render(
    <Card title="Service" description="Synthetic fixture">
      <Badge tone="success">OK</Badge>
    </Card>,
  );
  assert.equal(screen.getByRole("heading", { name: "Service" }).tagName, "H3");
  assert.ok(screen.getByText("Synthetic fixture"));
  assert.ok(screen.getByText("OK"));
});
