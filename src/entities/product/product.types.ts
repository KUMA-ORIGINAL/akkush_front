import { z } from 'zod';
import { AdProduct, Hit, Product } from './product.contracts';

export type Product = z.infer<typeof Product>;
export type AdProduct = z.infer<typeof AdProduct>;
export type Hit = z.infer<typeof Hit>;
