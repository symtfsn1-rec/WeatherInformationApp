import { Metadata } from "next";
import { Suspense } from "react";
import WeatherInformation from "@/components/weather/WeatherInformation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import WeatherSkeleton from "@/components/weather/WeatherSkeleton";

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);

  return {
    title: `${decodedCity.toUpperCase()}の天気`,
    description: `${decodedCity.toUpperCase()}の現在の天気、気温、風速などの詳細情報をご確認いただけます。`,
  };
}

export async function generateStaticParams() {
  return [
    { city: 'shibuya' },
    { city: 'chiba' },
    { city: 'yokohama' },
    { city: 'sapporo' },
    { city: 'naha' },
    { city: 'nanba' },
    { city: 'iwaki' },
    { city: 'new york' },
    { city: 'paris' },
    { city: 'sydney' },
    { city: 'new delhi' },
    { city: 'rio de janeiro' },
  ];
}

export default async function WeatherPage({ params }: Props) {
  const searchParams = params.then(({ city }) => ({ city }));

  return (
    <div className="max-w-3xl mx-auto px-2 space-y-4 mb-24">
      <div>
        <Link
          href="/favorites"
          className="inline-flex items-center text-gray-500 hover:text-black mt-2"
        >
          <ArrowLeft className="w-5 h-5 mr-1.5" />
          <span className="text-sm font-medium">お気に入り都市一覧へ戻る</span>
        </Link>
      </div>

      <div className="w-full p-2 md:p-4 rounded-2xl space-y-4 bg-gray-200">
        <Suspense fallback={<WeatherSkeleton />}>
          <WeatherInformation searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}