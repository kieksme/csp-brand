import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Icon } from "./Icon";
const names = [
  "contact",
  "signl4",
  "kuma",
  "content",
  "chat",
  "teams",
  "slack",
  "telegram",
  "module",
  "arrow",
  "arrow-up-right",
  "arrow-down-left",
  "arrow-left-right",
  "corner-down-right",
  "check",
  "menu",
  "plus",
  "infinity",
  "code",
];
const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "contact", size: 32 },
  argTypes: { name: { control: "select", options: names } },
  parameters: {
    docs: {
      description: {
        component:
          "Lucide icons rendered locally. Decorative by default. Provide label only when the icon carries its own meaning. The CSP headset logo is separate brand artwork.",
      },
    },
  },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Decorative: Story = {};
export const Labelled: Story = {
  args: { label: "Contact support" },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: "Contact support" }),
    ).toBeVisible();
  },
};
export const Status: Story = {
  args: { name: "kuma", label: "Service status" },
};
