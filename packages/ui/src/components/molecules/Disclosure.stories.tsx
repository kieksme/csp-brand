import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Disclosure } from "./Disclosure";
const meta = {
  title: "Molecules/Disclosure",
  component: Disclosure,
  tags: ["autodocs"],
  args: {
    question: "Can I contact a person directly?",
    children:
      "Yes. Use the hotline or request human support through a configured support channel. Agreed service hours apply.",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Native details/summary disclosure. Opening and closing work without JavaScript.",
      },
    },
  },
} satisfies Meta<typeof Disclosure>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Closed: Story = {};
export const Open: Story = { args: { open: true } };
export const Interaction: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByText("Can I contact a person directly?"));
    await expect(canvasElement.querySelector("details")).toHaveAttribute(
      "open",
    );
    await expect(canvas.getByText(/Yes. Use the hotline/)).toBeVisible();
  },
};
