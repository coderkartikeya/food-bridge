import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@components/export/index';
import { iconMapper, type IconName } from './icon-mapper';

const meta: Meta<typeof Icon> = {
  title: 'Components/atoms/Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(iconMapper),
      description: 'The name of the icon in the mapper',
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 4 },
      description: 'Size of the icon in pixels',
    },
    color: {
      control: 'color',
      description: 'CSS color value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'search',
    size: 24,
    color: '#1A7F37',
  },
};

export const ThemeColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Icon name="check" size={32} color="#1A7F37" />
        <span style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>Trust Green</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Icon name="edit" size={32} color="#FBBF24" />
        <span style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>Warm Amber</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Icon name="search" size={32} color="#DC2626" />
        <span style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>Destructive</span>
      </div>
    </div>
  ),
};

export const AllIconsGallery: Story = {
  render: () => {
    const allIconNames = Object.keys(iconMapper) as IconName[];

    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
        gap: '24px',
        width: '600px',
        fontFamily: 'sans-serif'
      }}>
        {allIconNames.map((iconName) => (
          <div 
            key={iconName} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '12px',
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}
          >
            <Icon name={iconName} size={32} color="#1F2937" />
            <span style={{ fontSize: '14px', color: '#4B5563' }}>{iconName}</span>
          </div>
        ))}
      </div>
    );
  },
};