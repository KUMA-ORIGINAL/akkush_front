import { z } from 'zod';

export const Product = z.object({
  id: z.number(),
  name: z.string(),
  photo: z.string().nullable().optional(),
  photos: z
    .array(
      z.object({
        id: z.number(),
        photo: z.string().nullable(),
        order: z.number(),
      })
    )
    .optional(),
  description: z.string().optional(),
  price: z.string(),
  category: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export const AdProduct = z.object({
  title: z.string(),
  description: z.string(),
  photo: z.string(),
});

export const Hit = z.object({
  id: z.number(),
  text: z.string(),
  photo: z.string().nullable(),
  order: z.number(),
});
