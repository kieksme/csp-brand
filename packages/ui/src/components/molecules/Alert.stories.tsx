import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Alert } from "./Alert";
const meta = {
  title: "Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    title: "Service information",
    children: "Synthetic feedback for this component demo.",
  },
  parameters: {
    docs: {
      description: {
        component:
          'Defaults to role="status". Danger defaults to role="alert". Supply role explicitly when the announcement behaviour should differ.',
      },
    },
  },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Info: Story = {};
export const Success: Story = {
  args: { tone: "success", title: "Request saved" },
};
export const Warning: Story = {
  args: { tone: "warning", title: "Update pending" },
};
export const Danger: Story = {
  args: { tone: "danger", title: "Request could not be saved" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toBeVisible();
  },
};
