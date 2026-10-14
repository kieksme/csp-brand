import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";
const meta = {
  title: "Atoms/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: {
    src: "./brand/logo-primary.svg",
    alt: "CSP by kieks.me",
    width: 246,
    height: 72,
  },
  parameters: {
    docs: {
      description: {
        component:
          "Accepts a resolved image URL and meaningful alt text. Customer-owned logos work through the same API. CSP logos retain separate brand terms.",
      },
    },
  },
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Light: Story = {
  args: { src: "./brand/logo-light.svg" },
  globals: { theme: "dark" },
};
export const Monochrome: Story = {
  args: { src: "./brand/logo-mono-dark.svg" },
};
export const IconMark: Story = {
  args: { src: "./brand/icon.svg", width: 64, height: 64 },
};
