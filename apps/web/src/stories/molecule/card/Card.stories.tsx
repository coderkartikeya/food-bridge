/**
 * Storybook configuration for the Card component.
 * Demonstrates the "Container Pattern" by nesting different atomic components.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Card, Button, Icon, Badge, Input } from "@components/export/index";

const meta = {
  title: "Components/molecules/card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    hoverable: { control: "boolean" },
    shadow: { control: "boolean" },
    noPadding: { control: "boolean" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 1. Standard Content Card
 * Used for simple text blocks or info sections.
 */
export const Default: Story = {
  args: {
    children: (
      <div className="max-w-xs">
        <h3 className="text-lg font-bold text-gray-900">Standard Card</h3>
        <p className="text-sm text-gray-500 mt-2">
          This is a basic container card with default padding and shadow. It
          scales to fit its children.
        </p>
      </div>
    ),
  },
};

/**
 * 2. Zomato-Style Restaurant Card
 * Demonstrates the 'noPadding' prop combined with an image and internal padding.
 */
export const RestaurantCard: Story = {
  args: {
    hoverable: true,
    noPadding: true,
    className: "w-[320px]",
    children: (
      <div className="flex flex-col">
        <div className="relative h-44 w-full">
          <img
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Food"
          />
          <div className="absolute top-3 right-3">
            <Badge badgeType="success" showDot>
              Open Now
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-900">Sunrise Bakery</h3>
            <span className="bg-green-700 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
              4.2 <Icon name="check" size={10} />
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1 truncate">
            Bakery, Desserts, Fast Food
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-400 text-xs">Pickup in 20 mins</span>
            <Button buttonType="primary" className="py-1 px-4 text-xs">
              View
            </Button>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * 3. Form Container Card
 * Shows how the card acts as a shell for interactive form elements.
 */
export const FormCard: Story = {
  args: {
    className: "w-[400px]",
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold">Create Account</h3>
          <p className="text-sm text-gray-500">
            Enter your details to join FoodBridge.
          </p>
        </div>
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Kartikeya Vats" />
          <Input type="email" label="Email" placeholder="vats@example.com" />
          <Input type="toggle" label="Accept terms and conditions" />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <Button buttonType="secondary">Cancel</Button>
          <Button buttonType="primary">Create</Button>
        </div>
      </div>
    ),
  },
};

/**
 * 4. Stats / Widget Card
 * Small, low-profile card for dashboard-style metrics.
 */
export const MetricCard: Story = {
  args: {
    className: "w-[250px] border-l-4 border-l-green-600",
    children: (
      <div className="flex items-center gap-4">
        <div className="p-3 bg-green-50 text-green-700 rounded-full">
          <Icon name="check" size={24} />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">
            Food Saved
          </p>
          <p className="text-2xl font-black text-gray-900">450 kg</p>
        </div>
      </div>
    ),
  },
};
