/**
 * Storybook configuration for the Input component.
 * Showcases standard inputs alongside native HTML5 variations (Date, Time, File, Color).
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@components/export/index";

const meta = {
  title: "Components/atoms/Input",
  component: Input,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    inputSize: { control: "radio", options: ["sm", "md", "lg"] },
    type: {
      control: "select",
      options: ["text", "search", "email", "date", "time", "file", "color"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Restaurant Name",
    placeholder: "e.g. Bakery Delights",
  },
};

export const HTML5NativeTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Input type="date" label="Pickup Date" />
      <Input type="time" label="Pickup Time" />
      <Input type="datetime-local" label="Exact Expiration" />
      <Input
        type="file"
        label="Upload Restaurant Logo"
        helperText="Supports PNG, JPG up to 5MB"
      />
      <Input type="color" label="Brand Color" defaultValue="#1A7F37" />
    </div>
  ),
};
export const ToggleVariant: Story = {
  args: {
    type: "toggle",
    label: "Enable Public Profile",
    inputSize: "md",
    defaultChecked: true,
  },
};

export const ToggleDisabled: Story = {
  args: {
    type: "toggle",
    label: "Push Notifications (Locked)",
    disabled: true,
  },
};
