import { PropertyImg } from "@/interfaces/common";
import { BaseRecord, CreateResponse, UpdateResponse } from "@refinedev/core";
import { FieldValues } from "react-hook-form";

export enum FormTypes {
  CREATE = "create",
  EDIT = "edit",
}

export interface FormProps {
  type: FormTypes;
  propertyImg: PropertyImg;
  onImageChange: (file: File | undefined) => void;
  formLoading: boolean;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
}
