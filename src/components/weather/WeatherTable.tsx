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
          <span className="inline-block">（例: 渋谷 → 三田）が</span>
          <span className="inline-block">表示される場合があります。</span>
        </p>
        <p className="leading-relaxed mt-1">
          <span className="inline-block">※ 日本の都市はローマ字で入力すると</span>
          <span className="inline-block">（例: 千葉(市) → chiba）</span>
          <span className="inline-block">正しく表示される場合があります。</span>
        </p>
      </div>
      <div className="w-full max-w-3xl p-2 md:p-4 rounded-2xl space-y-4 bg-gray-200">
        {children}
      </div>

    </div>
  );
}