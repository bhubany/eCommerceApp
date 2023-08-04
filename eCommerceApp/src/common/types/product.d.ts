export interface ProductImageType {
  id?: number | string;
  productid?: string;
  imageurl: string;
  alttext: string | null;
}

export interface ProductType {
  id: string;
  category: string;
  model: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  addedby: string;
  addedat: string;
  updatedby: string | null;
  updatedat: string | null;
  images: ProductImageType[];
}
