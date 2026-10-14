import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "Lena Beispiel" },
  parameters: {
    docs: {
      description: {
        component:
          "Named initials fallback or a supplied image. The caller supplies the image URL and display name. Examples are synthetic.",
      },
    },
  },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Initials: Story = {};
export const Large: Story = { args: { size: 72 } };
export const SingleName: Story = { args: { name: "Lena" } };
