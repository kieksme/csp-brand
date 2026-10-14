import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label, Input } from "./Field";
const meta = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
  args: { htmlFor: "storybook-labelled-name", children: "Your name" },
  render: (args) => (
    <div>
      <Label {...args} />
      <Input id={args.htmlFor} autoComplete="off" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "Use htmlFor to associate the visible label with the input id. FormField provides this association automatically.",
      },
    },
  },
} satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;
export const AssociatedInput: Story = {};
