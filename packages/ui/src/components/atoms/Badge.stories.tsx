import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Service status" },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Neutral: Story = {};
export const Accent: Story = { args: { tone: "accent", children: "CSP" } };
export const Success: Story = {
  args: { tone: "success", children: "Available" },
};
export const Warning: Story = {
  args: { tone: "warning", children: "Pending" },
};
export const DarkAccent: Story = {
  args: { tone: "accent", children: "CSP" },
  globals: { theme: "dark" },
};
