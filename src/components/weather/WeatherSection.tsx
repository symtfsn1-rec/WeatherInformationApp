import { Suspense } from "react";
import WeatherInformation from "./WeatherInformation";
import WeatherSkeleton from "./WeatherSkeleton";

type Props = {
  searchParams: Promise<{ city?: string }>;
};

export default async function WeatherSection({ searchParams }: Props) {
  const { city } = await searchParams;
  if (!city) return null;

  return (
    <Suspense fallback={<WeatherSkeleton />}>
      <WeatherInformation city={decodeURIComponent(city)} />
    </Suspense>
  )
}