import { PropertyImg } from "@/interfaces/common";
import { FieldValues } from "react-hook-form";

export enum FormTypes {
  CREATE = "create",
  EDIT = "edit",
}

export interface FormProps {
  type: FormTypes;
  propertyImg: PropertyImg;
  onFinishHandler: (data: FieldValues) => Promise<void>;
  formLoading: boolean;
  onImageChange: (file: File | undefined) => void;
}
