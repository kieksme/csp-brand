import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Field";
const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    "aria-label": "Support request",
    placeholder: "Describe your request",
  },
  parameters: {
    controls: {
      include: ["placeholder", "disabled", "readOnly", "type", "defaultValue"],
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Filled: Story = {
  args: { defaultValue: "How can I contact support?" },
};
export const Disabled: Story = { args: { disabled: true } };
export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: "Customer reference" },
};
