/**
 * Storybook configuration for the Navbar Organism.
 */
import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './NavBar';
import { fn } from '@storybook/test';

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen', 
  },
  tags: ['autodocs'],
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onSearch: fn(),
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;


export const LoggedOut: Story = {
  args: {
    user: undefined,
  },
};

// 2. Authenticated User (Logged In)
export const LoggedIn: Story = {
  args: {
    user: {
      name: "Kartikeya Vats",
      role: "Restaurant Partner",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    },
  },
};

export const LoggedInNoAvatar: Story = {
  args: {
    user: {
      name: "John Doe",
      role: "Volunteer",
    },
  },
};