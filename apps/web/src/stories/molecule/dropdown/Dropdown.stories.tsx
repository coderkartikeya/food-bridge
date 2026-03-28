/**
 * Storybook configuration for the Select Dropdown component.
 * Showcases single select, multi-select with badges, and error states.
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "@components/export/index";

const meta = {
  title: "Components/molecules/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const standardOptions = [
  { label: "Baked Goods & Pastries", value: "baked" },
  { label: "Fresh Produce", value: "produce" },
  { label: "Prepared Meals", value: "meals" },
  { label: "Dairy & Eggs", value: "dairy" },
];

const SingleSelectInteractive = () => {
  const [value, setValue] = useState<string>("");
  return (
    <div className="max-w-sm h-[300px]">
      <Dropdown
        label="Food Category"
        options={standardOptions}
        value={value}
        onChange={setValue}
        placeholder="Choose a category..."
      />
    </div>
  );
};

export const SingleSelect: Story = {
  args: {
    options: standardOptions,
  },
  render: () => <SingleSelectInteractive />,
};

const MultiSelectInteractive = () => {
  const [values, setValues] = useState<string[]>(["baked", "dairy"]);
  return (
    <div className="max-w-sm h-[300px]">
      <Dropdown
        label="Dietary Tags (Multi)"
        options={standardOptions}
        value={values}
        onChange={setValues}
        multiple
        placeholder="Select tags..."
        helperText="You can select multiple categories."
      />
    </div>
  );
};

export const MultiSelect: Story = {
  args: {
    options: standardOptions,
  },
  render: () => <MultiSelectInteractive />,
};

export const ErrorState: Story = {
  args: {
    options: standardOptions,
  },
  render: () => (
    <div className="max-w-sm">
      <Dropdown
        label="Assigned Volunteer"
        options={standardOptions}
        value=""
        error="You must select a volunteer for this pickup."
      />
    </div>
  ),
};

export const DisabledState: Story = {
  args: {
    options: standardOptions,
  },
  render: () => (
    <div className="max-w-sm">
      <Dropdown
        label="Locked Field"
        options={standardOptions}
        value="baked"
        disabled
      />
    </div>
  ),
};
