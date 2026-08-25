import {NextResponse, NextRequest} from "next/server";
import { getGeoCodes, getWeatherData } from "@/lib/weatherFetcher";
import { searchSchema } from "@/schemas/weather";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({error: '都市名が指定されていません'}, {status: 400});
  }

  const validationResult = searchSchema.safeParse({city});
  if (!validationResult.success) {
    return NextResponse.json({error: '都市名の形式が正しくありません'}, {status: 400});
  }

  try {
    const {lat, lon} = await getGeoCodes(city);
    const weatherData = await getWeatherData(lat, lon);
    return NextResponse.json(weatherData);
  } catch(error) {
    console.error('Error in /api/weather:', error);

    if (error instanceof Error && error.message === '都市が見つかりませんでした') {
      return NextResponse.json({error: '都市が見つかりませんでした'}, {status: 404});
    }

   return NextResponse.json({ error: '天気情報の取得に失敗しました' }, { status: 500 });
  }
}