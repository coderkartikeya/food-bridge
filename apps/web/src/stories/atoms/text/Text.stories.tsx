import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "@components/export/index";

const meta = {
  title: "Components/atoms/Text",
  component: Text,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    fontColor: { control: "text" },
    fontSize: {
      control: "select",
      options: ["xs", "sm", "lg", "xl"],
    },
    fontWeight: {
      control: "select",
      options: ["regular", "semibold", "bold"],
    },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const LargeBold: Story = {
  args: {
    fontSize: "lg",
    fontWeight: "bold",
  },
};

export const SmallSemibold: Story = {
  args: {
    fontSize: "sm",
    fontWeight: "semibold",
  },
};

export const ColoredText: Story = {
  args: {
    fontColor: "text-blue-500",
    fontWeight: "bold",
  },
};
