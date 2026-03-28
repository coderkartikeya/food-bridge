import type { Meta, StoryObj } from '@storybook/react';
import { Button } from "@components/export/index";

const meta = {
  title: 'Components/atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonType: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'destructive'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'FoodBridge Button'
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    buttonType: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    buttonType: 'tertiary',
    children: 'Tertiary Link',
  },
};

export const Destructive: Story = {
  args: {
    buttonType: 'destructive',
    children: 'Delete Item',
  },
};

export const Disabled: Story = {
  args: {
    buttonType: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center p-4">
      <div className="flex items-center gap-6">
        <Button buttonType="primary">Normal</Button>
        <Button buttonType="secondary">Normal</Button>
        <Button buttonType="tertiary">Tertiary Link</Button>
        <Button buttonType="destructive">Delete Item</Button>
      </div>
      
      <div className="flex items-center gap-6 opacity-80">
        <Button buttonType="primary" disabled>Disabled</Button>
        <Button buttonType="secondary" disabled>Disabled</Button>
      </div>
    </div>
  ),
};