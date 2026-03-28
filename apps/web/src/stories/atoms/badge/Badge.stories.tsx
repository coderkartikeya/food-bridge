/**
 * Storybook configuration for the Badge component.
 * Displays the various semantic states and layout options (with/without dots).
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@components/export/index";

const meta = {
  title: "Components/atoms/badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    badgeType: {
      control: "select",
      options: ["success", "warning", "danger", "neutral"],
    },
    showDot: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Pending",
    badgeType: "neutral",
  },
};

export const Success: Story = {
  args: {
    children: "Active Pickups",
    badgeType: "success",
    showDot: true,
  },
};

export const Warning: Story = {
  args: {
    children: "Expiring Soon",
    badgeType: "warning",
    showDot: true,
  },
};

export const Danger: Story = {
  args: {
    children: "Cancelled",
    badgeType: "danger",
    showDot: true,
  },
};

export const AllBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-6 font-sans">
      <div className="flex gap-4 items-center">
        <span className="text-sm font-medium text-gray-500 w-24">
          Standard:
        </span>
        <Badge badgeType="success">Success</Badge>
        <Badge badgeType="warning">Warning</Badge>
        <Badge badgeType="danger">Danger</Badge>
        <Badge badgeType="neutral">Pending</Badge>
      </div>
      <div className="flex gap-4 items-center">
        <span className="text-sm font-medium text-gray-500 w-24">
          With Dots:
        </span>
        <Badge badgeType="success" showDot>
          Success
        </Badge>
        <Badge badgeType="warning" showDot>
          Warning
        </Badge>
        <Badge badgeType="danger" showDot>
          Danger
        </Badge>
        <Badge badgeType="neutral" showDot>
          Pending
        </Badge>
      </div>
    </div>
  ),
};
