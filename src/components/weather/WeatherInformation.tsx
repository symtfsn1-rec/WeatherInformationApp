import { getGeoCodes, getWeatherData } from "@/lib/weatherFetcher";
import { formatTime } from "@/lib/formatTime";
import { MapPin, Droplet, Wind, CloudHail, Sun } from "lucide-react";
import { cacheLife } from 'next/cache';

type Props = {
  searchParams: Promise<{ city?: string }>;
};

export default async function WeatherInformation({ searchParams }: Props) {
  'use cache';
  cacheLife({ revalidate: 3600 }); // キャッシュ1時間

  const { city } = await searchParams;
  if (!city) return null;

  try {
    const geoCodes = await getGeoCodes(city);
    if (!geoCodes) {
      throw new Error('都市の地理座標が取得できませんでした。別の都市名を入力してください。')
    }

    const weatherData = await getWeatherData(geoCodes.lat, geoCodes.lon);
    if (!weatherData) {
      throw new Error('天気情報が取得できませんでした。別の都市名を入力してください。');
    }

    const rainVolume = weatherData.rain?.["1h"] ?? 0;
    const snowVolume = weatherData.snow?.["1h"] ?? 0;
    const rainVolume3h = weatherData.rain?.["3h"] ?? 0;
    const snowVolume3h = weatherData.snow?.["3h"] ?? 0;
    let precipitationVolume = '降雨・降雪は検出されていません。';
    if (rainVolume > 0) {
      precipitationVolume = rainVolume3h > 0 ? `過去3時間の降水量は ${rainVolume3h}mm です` : '直近1時間で雨が検出されています。';
    } else if (snowVolume > 0) {
      precipitationVolume = snowVolume3h > 0 ? `過去3時間の降雪量は ${snowVolume3h}mm です` : '直近1時間で雪が検出されています。';
    }

    const sunriseTime = formatTime(weatherData.sys.sunrise, weatherData.timezone);
    const sunsetTime = formatTime(weatherData.sys.sunset, weatherData.timezone);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base text-gray-500">
        {/*都市、国、現在の気温、最高気温、最低気温、アイコン*/}
        <div className="md:col-span-2 border rounded-2xl bg-white border-gray-200 px-2 pb-2 md:px-4 md:pb-4">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black">{weatherData.name}</h2>
              <div className="flex items-center text-xs">
                <MapPin className="inline-block w-3 h-3 mr-1 text-red-500/50" />
                <span>{weatherData.name}, {weatherData.sys.country}</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`} alt={weatherData.weather[0]?.description} className="w-16 h-16" />
              <span>{weatherData.weather[0]?.description}</span>
            </div>
          </div>

          <span className="text-4xl font-bold text-black">{Math.round(weatherData.main.temp)}°C</span>
          <div className="flex gap-4">
            <span>最高:{Math.round(weatherData.main.temp_max)}°C</span>
            <span>最低:{Math.round(weatherData.main.temp_min)}°C</span>
          </div>
        </div>

        {/*湿度、快適かどうか*/}
        <div className="bg-white border border-gray-200 rounded-2xl p-3">
          <div className="flex gap-2 text-gray-500 mb-4">
            <Droplet className="inline-block w-5 h-5 text-blue-300/70"/>
            <span>湿度</span>
          </div>
          <span className="text-lg font-bold text-black">{weatherData.main.humidity}%</span>
          <p>{weatherData.main.humidity < 30 ? '乾燥しています' : weatherData.main.humidity < 70 ? '快適です' : '湿っています'}</p>
        </div>

        {/*風速、風向*/}
        <div className="bg-white border border-gray-200 rounded-2xl p-3">
          <div className="flex gap-2 text-gray-500 mb-4">
            <Wind className="inline-block w-5 h-5 text-green-300/70"/>
            <span>風速</span>
          </div>
          <span className="text-lg font-bold text-black">{weatherData.wind.speed} m/s</span>
          <p>{`風向:${weatherData.wind.deg !== undefined ? `${weatherData.wind.deg}°` : '不明'} (瞬間風速:${weatherData.wind.gust !== undefined ? `${weatherData.wind.gust} m/s` : '不明'})`}</p>
        </div>

        {/* 降水量（過去１時間）、雪の場合は降雪量（過去１時間）、なければ「降雨・降雪は検出されていません」*/}
        <div className="bg-white border border-gray-200 rounded-2xl p-3">
          <div className="flex gap-2 text-gray-500 mb-4">
            <CloudHail className="inline-block w-5 h-5 text-blue-500/50"/>
            <span>{rainVolume > 0 ? '降水量(過去１時間)' : snowVolume > 0 ? '降雪量(過去１時間)' : '降水量'}</span>
          </div>
          <span className="text-lg font-bold text-black">
            {rainVolume > 0 ? `${rainVolume} mm` : snowVolume > 0 ? `${snowVolume} mm` : '0mm'}
          </span>
          <p>{precipitationVolume}</p>
        </div>

        {/* 日の出、日の入り */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3">
          <div className="flex gap-2 text-gray-500 mb-4">
            <Sun className="inline-block w-5 h-5 text-orange-500/50"/>
            <span>太陽（現地時間）</span>
          </div>
          <div className="flex justify-between">
            <div>
              <p>日の出</p>
              <span className="text-lg font-bold text-black">{sunriseTime}</span>
            </div>
            <div>
              <p>日の入り</p>
              <span className="text-lg font-bold text-black">{sunsetTime}</span>
            </div>
          </div>
        </div>
      </div>
    );

  } catch (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error instanceof Error ? error.message : '予期しないエラーが発生しました。'}</p>
      </div>
    )
  }
}