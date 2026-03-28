import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "@components/export/index"; 

const meta = {
  title: "Components/atoms/Heading", 
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ["autodocs"],
  argTypes: {
    fontColor: { control: "text" },
    fontWeight: {
      control: "select",
      options: ["regular", "semibold", "bold"],
    },
    headingType: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    }
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
} satisfies Meta<typeof Heading>; 

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


export const ColoredText: Story = {
  args: {
    fontColor: "text-blue-500",
    fontWeight: "bold",
    children: "This is a custom colored heading",
  },
};