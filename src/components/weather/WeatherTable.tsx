export default function WeatherTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center mx-2 mb-26">
      <div className="text-gray-500 text-xs text-center pb-8">
        <h1 className="text-base sm:text-xl md:text-2xl font-bold text-black pb-2">
          <span className="inline-block">気になる都市の天気を</span>
          <span className="inline-block">調べてみましょう</span>
        </h1>
        <p className="leading-relaxed">
          <span className="inline-block">※ 検索キーワードによっては、</span>
          <span className="inline-block">近隣の観測地点名</span>
          <span className="inline-block">（例: shibuya → mita）が</span>
          <span className="inline-block">表示される場合があります。</span>
        </p>
      </div>
      <div className="w-full max-w-3xl p-2 md:p-4 rounded-2xl space-y-4 bg-gray-200">
        {children}
      </div>

    </div>
  );
}