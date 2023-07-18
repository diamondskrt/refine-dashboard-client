import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/core";
import { Form } from "@/components";
import {
  FormTypes,
  FormValues,
  PropertyImg,
} from "@/components/common/form/types";
import { IUser } from "@/interfaces/user";

export const PropertyCreate = () => {
  const { data: user } = useGetIdentity<IUser>();

  const [propertyImg, setPropertyImg] = useState<PropertyImg>({
    name: "",
    url: "",
  });

  const { onFinish, formLoading } = useForm({
    action: "create",
  });

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

  const onFinishHandler = async (data: FormValues) => {
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
