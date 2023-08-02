export interface ButtonProps {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  color?: string;
  height?: string;
  width?: string;
  outlined?: boolean;
  handleClick?(): any;
  title: string;
  icon?: ReactNode;
}
