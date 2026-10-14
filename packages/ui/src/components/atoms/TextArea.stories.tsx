import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./Field";
const meta = {
  title: "Atoms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    "aria-label": "Request details",
    placeholder: "What happened?",
    rows: 4,
  },
  parameters: {
    controls: { include: ["placeholder", "rows", "disabled", "defaultValue"] },
  },
} satisfies Meta<typeof TextArea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Filled: Story = {
  args: { defaultValue: "Synthetic request details for this demo." },
};
export const Disabled: Story = { args: { disabled: true } };
