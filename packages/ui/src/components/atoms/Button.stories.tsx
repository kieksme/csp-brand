import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { useState } from "react";
import { Button } from "./Button";
const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Contact support", onClick: fn() },
  parameters: {
    controls: {
      include: ["children", "variant", "hasArrow", "isDisabled", "isLoading"],
    },
    docs: {
      description: {
        component:
          'Native action button. Defaults to type="button". Use LinkButton for navigation. Disabled and loading states prevent clicks.',
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Light: Story = { args: { variant: "light" } };
export const Danger: Story = {
  args: { variant: "danger", children: "Remove draft" },
};
export const WithArrow: Story = { args: { hasArrow: true } };
export const Disabled: Story = {
  args: { isDisabled: true },
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole("button");
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
export const Loading: Story = {
  args: { isLoading: true, children: "Saving" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button")).toBeDisabled();
    await expect(canvas.getByRole("button")).toHaveAttribute(
      "aria-busy",
      "true",
    );
  },
};
export const Interaction: Story = {
  render: function Counter(args) {
    const [count, setCount] = useState(0);
    return (
      <div className="csp-story-stack">
        <Button
          {...args}
          onClick={() => {
            args.onClick?.();
            setCount((value) => value + 1);
          }}
        >
          Try button
        </Button>
        <p role="status">Clicks: {count}</p>
      </div>
    );
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Try button" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Clicks: 1");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
