export enum FormTypes {
  CREATE = "create",
  EDIT = "edit",
}

export interface FormValues {
  title: string;
  description: string;
  type: PropertyTypeValues;
  price: number | null;
  location: string;
}

export interface PropertyImg {
  name: string;
  url: string;
}

export enum PropertyTypeValues {
  APARTMENT = "apartment",
  VILLA = "villa",
  FORMHOUSE = "formhouse",
  CONDOS = "condos",
  STUDIO = "studio",
}

export interface FormProps {
  type: FormTypes;
  propertyImg: PropertyImg;
  onFinishHandler: (data: FormValues) => Promise<void>;
  formLoading: boolean;
  onImageChange: (file: File | undefined) => void;
}
