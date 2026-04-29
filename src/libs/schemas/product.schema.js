import z, { maxLength, minLength } from "zod";

export const productSchema = z.object({
  name: z.string().check(minLength(3), maxLength(50)),
  brand: z.string().optional(),
  category: z.string(),
  price: z.number().min(1).max(1000000),
  stock: z.number().default(1),
});
