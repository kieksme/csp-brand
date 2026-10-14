import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
const meta = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Service status",
    description: "Synthetic content for this component demo.",
    icon: "kuma",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Composes a title, optional description/icon and supplied children. It has no provider or business logic. Portal colours are inherited via csp-ui-portal.",
      },
    },
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
export const WithStatus: Story = {
  args: { children: <Badge tone="success">Available</Badge> },
};
export const WithAction: Story = {
  args: { children: <Button>Contact support</Button> },
};
export const Dark: Story = { globals: { theme: "dark" } };
