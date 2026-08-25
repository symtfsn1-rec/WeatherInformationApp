import { geoResponseSchema, weatherResponseSchema } from "@/schemas/weather";

export async function getGeoCodes(city: string) {
  const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

  if (!API_KEY) {
    throw new Error('OPEN_WEATHER_MAP_API_KEYが設定されていません');
  }

  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    const geoResponse = await fetch(geoUrl);
  
    if (!geoResponse.ok) {
      throw new Error('地理座標の取得に失敗しました');
    }
  
    const geoData = await geoResponse.json();
  
    if (!geoData || geoData.length === 0) {
      throw new Error('都市が見つかりませんでした');
    }
  
    const result = geoResponseSchema.safeParse(geoData);

    if (!result.success) {
      throw new Error('緯度、経度の形式が正しくありません');
    }
    const lat = result.data[0].lat;
    const lon = result.data[0].lon;

    return {lat, lon};

  } catch(error) {
    console.error('Error fetching geo codes:', error);
    throw error;
  }
}

export async function getWeatherData(lat: number, lon: number) {
  const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

  if (!API_KEY) {
    throw new Error('OPEN_WEATHER_MAP_API_KEYが設定されていません');
  }

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${API_KEY}`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error('天気情報の取得に失敗しました');
    }

    const weatherData = await weatherResponse.json();

    const result = weatherResponseSchema.safeParse(weatherData);

    if (!result.success) {
      throw new Error('天気情報の形式が正しくありません');
    }

    return result.data;

 } catch(error) {
    console.error('Error fetching weather data:', error);
    throw new Error('天気情報の取得に失敗しました');
  }
 }