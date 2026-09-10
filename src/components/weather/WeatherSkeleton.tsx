export default function WeatherSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 animate-pulse">
      {/* メインカード（都市名・気温・アイコン） */}
      <div className="md:col-span-2 border rounded-2xl bg-white border-gray-200 p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="h-7 w-32 bg-gray-200 rounded-md" />
            <div className="h-3 w-24 bg-gray-200 rounded-md" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 bg-gray-200 rounded-full" />
            <div className="h-3 w-12 bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="h-10 w-24 bg-gray-200 rounded-md mb-3" />
        <div className="flex gap-4">
          <div className="h-4 w-16 bg-gray-200 rounded-md" />
          <div className="h-4 w-16 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* 湿度 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 space-y-3">
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="h-4 w-12 bg-gray-200 rounded-md" />
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-md" />
        <div className="h-4 w-24 bg-gray-200 rounded-md" />
      </div>

      {/* 風速 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 space-y-3">
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="h-4 w-12 bg-gray-200 rounded-md" />
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded-md" />
        <div className="h-4 w-36 bg-gray-200 rounded-md" />
      </div>

      {/* 降水量 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 space-y-3">
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="h-4 w-16 bg-gray-200 rounded-md" />
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-md" />
        <div className="h-4 w-40 bg-gray-200 rounded-md" />
      </div>

      {/* 太陽（日の出・日の入り） */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 space-y-3">
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="h-4 w-28 bg-gray-200 rounded-md" />
        </div>
        <div className="flex justify-between pt-1">
          <div className="space-y-1">
            <div className="h-3 w-10 bg-gray-200 rounded-md" />
            <div className="h-6 w-14 bg-gray-200 rounded-md" />
          </div>
          <div className="space-y-1">
            <div className="h-3 w-10 bg-gray-200 rounded-md" />
            <div className="h-6 w-14 bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}