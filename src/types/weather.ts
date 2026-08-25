import { searchSchema, geoResponseItemSchema, geoResponseSchema, weatherResponseSchema } from "@/schemas/weather";
import {z} from 'zod';

export type Search = z.infer<typeof searchSchema>;
export type GeoResponseItem = z.infer<typeof geoResponseItemSchema>;
export type GeoResponse = z.infer<typeof geoResponseSchema>;
export type WeatherResponse = z.infer<typeof weatherResponseSchema>;