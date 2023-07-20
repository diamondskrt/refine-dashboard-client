import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useGetIdentity, useForm } from "@refinedev/core";
import { Form } from "@/components";
import { FormTypes } from "@/components/common/form/types";
import { IUser } from "@/interfaces/user";
import { PropertyImg } from "@/interfaces/common";

export const PropertyCreate = () => {
  const { data: user } = useGetIdentity<IUser>();

  const [propertyImg, setPropertyImg] = useState<PropertyImg>({
    name: "",
    url: "",
  });

  const { onFinish, formLoading } = useForm();

  const onImageChange = (file: File | undefined) => {
    if (!file) return;

    const reader = (readFile: File) =>
      new Promise<string>((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImg({ name: file.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImg.name) return;

    await onFinish({ ...data, photoUrl: propertyImg.url, email: user?.email });
  };

  return (
    <Form
      type={FormTypes.CREATE}
      propertyImg={propertyImg}
      onImageChange={onImageChange}
      formLoading={formLoading}
      onFinishHandler={onFinishHandler}
    />
  );
};
