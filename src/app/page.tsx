import WeatherTable from "@/components/weather/WeatherTable";
import SearchForm from "@/components/weather/SearchForm";
import WeatherInformation from "@/components/weather/WeatherInformation";
import {Suspense} from "react";

type PageProps = {
  searchParams: Promise<{ city?: string }>;
};

export default async function Home({searchParams}: PageProps) {
  return (
    <>
      <WeatherTable>
        <Suspense>
          <SearchForm />
        </Suspense>
        <Suspense>
          <WeatherInformation searchParams={searchParams}/>
        </Suspense>
      </WeatherTable>
    </>
  );
}
