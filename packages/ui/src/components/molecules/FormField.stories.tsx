import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { useState } from "react";
import { FormField } from "./FormField";
const meta = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    id: "storybook-name",
    label: "Your name",
    description: "This demo sends no data.",
    inputProps: { autoComplete: "off" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Associates label, hint and validation error with stable IDs. inputProps forwards native input properties and React callbacks.",
      },
    },
  },
} satisfies Meta<typeof FormField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithHelp: Story = {};
export const Error: Story = {
  args: { error: "Please enter a valid name." },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Your name");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      "This demo sends no data. Please enter a valid name.",
    );
  },
};
export const Required: Story = {
  args: {
    inputProps: { required: true, autoComplete: "off" },
    description: "Required field.",
  },
};
export const Controlled: Story = {
  render: function ControlledField(args) {
    const [name, setName] = useState("");
    return (
      <div className="csp-story-stack">
        <FormField
          {...args}
          inputProps={{
            ...args.inputProps,
            value: name,
            onChange: (event) => setName(event.target.value),
          }}
        />
        <p role="status">{name ? `Hello ${name}` : "Enter a name"}</p>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText("Your name"), "Lena");
    await expect(canvas.getByRole("status")).toHaveTextContent("Hello Lena");
  },
};
