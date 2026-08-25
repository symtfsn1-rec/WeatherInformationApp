import {z} from 'zod';

// 検索入力用スキーマ
export const searchSchema = z.object({
  city: z.string().trim().min(1, '最低1文字は入力してください').max(50),
});

// 都市名から緯度経度を取得するジオコーディング用スキーマ
const geoResponseItemSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string().optional(),
});

export const geoResponseSchema = z.array(geoResponseItemSchema);

// 天気情報取得用スキーマ
export const weatherResponseSchema = z.object({
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ).nonempty(),
  main: z.object({
    temp: z.number(), // &units=metric
    temp_min: z.number(),
    temp_max: z.number(),
    humidity: z.number(),
  }),
  wind: z.object({
    speed: z.number(), // &units=metric
    deg: z.number().optional(),
    gust: z.number().optional(),
  }),
  rain: z.object({
    "1h": z.number().optional(),
    "3h": z.number().optional(),
  }).optional(),
  snow: z.object({
    "1h": z.number().optional(),
    "3h": z.number().optional(),
  }).optional(),
  sys: z.object({
    sunrise: z.number(),
    sunset: z.number(),
  }),
  name: z.string(),
});
