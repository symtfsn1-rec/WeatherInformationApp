import WeatherTable from "@/components/weather/WeatherTable";
import SearchForm from "@/components/weather/SearchForm";
import WeatherInformation from "@/components/weather/WeatherInformation";
import WeatherSkeleton from "@/components/weather/WeatherSkeleton";
import {Suspense} from "react";

type PageProps = {
  searchParams: Promise<{ city?: string }>;
};

export default function Home({searchParams}: PageProps) {
  return (
    <>
      <WeatherTable>
        <Suspense>
          <SearchForm />
        </Suspense>
        <Suspense fallback={<WeatherSkeleton />}>
          <WeatherInformation searchParams={searchParams}/>
        </Suspense>
      </WeatherTable>
    </>
  );
}
