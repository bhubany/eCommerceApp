export interface ImageList {
  id: number;
  url: string;
}

export interface CarouselProps {
  backgroundColor?: string;
  randomBackgroundColor?: boolean;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  checkColor?: string;
  checkFontSize?: string;
  textColor?: string;
  textFontSize?: string;
  height?: string;
  width?: string;
  filled?: boolean;
  imageList: ImageList[];
  interval?: number;
}
