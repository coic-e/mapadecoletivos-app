import { z } from "zod";

export const createDataFormSchema = z.object({
  name: z.string().nonempty("Campo obrigatório."),
  about: z.string().nonempty("Campo obrigatório."),
  email: z.string().nonempty("O e-mail é obrigatório."),
  social: z.string().nonempty("Campo obrigatório."),
  city: z.string().nonempty("Campo obrigatório."),
  uf: z.string().nonempty("Campo obrigatório."),
  type: z.string().nonempty("Campo obrigatório."),
  latitude: z.string(),
  longitude: z.string(),
  images: z.unknown(),
});

export type createDataFormData = z.infer<typeof createDataFormSchema>;
