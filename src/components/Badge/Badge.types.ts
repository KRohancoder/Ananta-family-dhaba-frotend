import type { ReactNode } from 'react';

export type BadgeTone = 'veg' | 'non-veg' | 'neutral' | 'accent';

export interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}
