
import React from 'react';
import { iconMapper, type IconName } from './icon-mapper';

/**
 * Customized Icon Component just need to pass name of icon we extract svg from svg mapper.
 */
export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = ({ 
  name, 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}: IconProps) => {
  const svgContent = iconMapper[name];

  if (!svgContent) {
    console.warn(`Icon "${name}" does not exist in the icon-mapper.`);
    return null;
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        color: color, 
      }}
    >
      
      {React.cloneElement(svgContent, {
        width: '100%',
        height: '100%',
      })}
    </span>
  );
};