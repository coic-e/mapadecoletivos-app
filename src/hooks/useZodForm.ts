import { ChangeEvent, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDataFormData, createDataFormSchema } from "../types/schemaZod";

export default function useZodForm() {
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<createDataFormData>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(createDataFormSchema),
    defaultValues: {
      name: "",
      about: "",
      email: "",
      uf: "",
      city: "",
      type: "",
      latitude: "",
      longitude: "",
      social: "",
      images: [],
    },
  });

  const onSubmit: SubmitHandler<createDataFormData> = async (
    data: createDataFormData
  ) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
      }

      const apiUrl = "api";

      const request = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!request.ok) {
        const errorResponse = await request.json();
        throw new Error(errorResponse.message);
      }

      const response = await request.json();
      reset();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return {
    register,
    handleSubmit,
    isSubmitting,
    onSubmit,
    errors,
    images,
    setImages,
    setValue
  };
}
