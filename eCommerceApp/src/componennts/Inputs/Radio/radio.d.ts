export interface Option {
  label: string;
  value: string;
}

export interface RadioProps {
  name: string;
  id?: string;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  formikProps?: any;
  options: Option[];
  onChange?: (e: any) => void;
  required?: boolean;
}
