import type { ComponentType, SVGProps } from 'react';

export interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}
