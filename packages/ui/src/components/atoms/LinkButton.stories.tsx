import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { LinkButton } from "./Button";
const meta = {
  title: "Atoms/LinkButton",
  component: LinkButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "light", "danger"],
    },
    hasArrow: { control: "boolean" },
  },
  tags: ["autodocs"],
  args: { href: "../docs/components/", children: "Component documentation" },
  parameters: {
    controls: { include: ["children", "href", "variant", "hasArrow"] },
    docs: {
      description: {
        component:
          "Native anchor for navigation. href is required. Use Button for actions.",
      },
    },
  },
} satisfies Meta<typeof LinkButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link")).toHaveAttribute(
      "href",
      "../docs/components/",
    );
  },
};
export const Secondary: Story = {
  args: { variant: "secondary", hasArrow: false },
};
