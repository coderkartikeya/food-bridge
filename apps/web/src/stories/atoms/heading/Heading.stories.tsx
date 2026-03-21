import type { Meta, StoryObj } from "@storybook/react-vite";
import Text from "./Heading";

const meta = {
  title: "Components/atoms/Heading",
  component: Text,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    fontColor: { control: "text" },
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

export const H1: Story = {
  args: {
    headingType: "h1",
  },
};
export const H2: Story = {
  args: {
    headingType: "h2",
  },
};

export const H3: Story = {
  args: {
    headingType: "h3",
  },
};
export const H4: Story = {
  args: {
    headingType: "h4",
  },
};

export const H5: Story = {
  args: {
    headingType: "h5",
  },
};

export const SmallSemibold: Story = {
  args: {
    fontWeight: "semibold",
  },
};

export const ColoredText: Story = {
  args: {
    fontColor: "text-blue-500",
    fontWeight: "bold",
  },
};
