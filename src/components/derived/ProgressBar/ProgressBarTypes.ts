export interface ProgressBarProps {
  label: string;
  value: number;
  color?: string;
  progress: number;
}

export interface MultipleProgressBarsProps {
  data: { label: string; value: number; progress: number }[];
  colors?: string[];
}
