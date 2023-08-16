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
  fontSize?: string;
  lineHeight?: string;
  fontWeight?: string;
  icon?: ReactNode;
  disabled?: boolean;
}
