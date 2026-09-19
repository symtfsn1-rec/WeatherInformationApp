import WeatherTable from "@/components/weather/WeatherTable";
import SearchForm from "@/components/weather/SearchForm";
import WeatherSection from "@/components/weather/WeatherSection";
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
        <Suspense fallback={null}>
          <WeatherSection searchParams={searchParams}/>
        </Suspense>
      </WeatherTable>
    </>
  );
}
