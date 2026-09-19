# WeatherInformationApp

リアルタイムな天気情報の検索およびお気に入り管理ができるWebアプリケーションです。  
パフォーマンス向上（PPR/キャッシュ戦略）やレスポンシブ対応、堅牢なエラーハンドリングを意識して開発しました。
[WeatherInformationApp](https://weather-information-app-sigma.vercel.app/)

---

## 概要

- **主要機能**: 都市名検索、詳細天気表示（気温・湿度・風速・降水量・日の出/日の入り）、お気に入り都市のローカル保存
- **UI/UX**: スケルトンUIによるローディング表示、PCサイズ以上限定の追従円エフェクト

---

## 使用技術

| カテゴリ | 技術スタック |
| :--- | :--- |
| **フレームワーク** | Next.js 15 (App Router, PPR, `'use cache'`) |
| **言語** | TypeScript |
| **スタイリング** | Tailwind CSS |
| **アイコン** | Lucide React |
| **バリデーション** | Zod |
| **ストレージ** | LocalStorage |
| **パッケージマネージャー** | pnpm |
| **外部API** | OpenWeatherMap API |

---

## ディレクトリ構成

```text

src
├─ app
│   ├─ page.tsx                        # トップページ（検索&天気表示）
│   ├─ global.css
│   ├─ layout.tsx
│   ├─ favicon.ico
│   ├─ api
│   │   └─ weather
│   │       └─ route.ts               # WeatherAPIRoute
│   ├─ favorites
│   │   └─ page.tsx                   # お気に入り都市一覧ページ
│   └─ weather
│       └─ [city]
│           └─ page.tsx                # 天気詳細ページ（動的ルート）
├─ components
│   ├─ common                          # 汎用UIコンポーネント
│   │   ├─ Header.tsx
│   │   ├─ Footer.tsx
│   │   ├─ HeaderMenu.tsx
│   │   └─ CursorFollower.tsx
│   ├─ weather                         # 天気関連UIコンポーネント
│   │   ├─ SearchForm.tsx
│   │   ├─ WeatherInformation.tsx
│   │   ├─ WeatherTable.tsx
│   │   ├─ WeatherSection.tsx
│   │   └─ WeatherSkeleton.tsx
│   └─ favorites
│       ├─ FavoriteButton.tsx
│       └─ FavoriteList.tsx
├─ hooks                                # カスタムフック
│   └─ useLocalStorage.ts
├─ types
│   └─ weather.ts                      # バリデーション定義からの型抽出
├─ lib                                  # APIフェッチ・ユーティリティ関数
│   ├─ formatTime.ts
│   └─ fetchWeather.ts
├─ schemas                              
│   └─ weather.ts                      # Zodによるバリデーション定義
├─ .env.local                           # git監視対象外
├─ .env.example
├─ .gitignore
├─ next.config.ts
├─ package.json
├─ tsconfig.json
├─ eslint.config.mjs
├─ postcss.config.mjs
├─ pnpm-lock.yaml
└─ pnpm-workspace.yaml

```

---

## ローカル起動手順

1. リポジトリのクローンと依存関係のインストール
```
git clone [https://github.com/symtfsn1-rec/WeatherInformationApp](https://github.com/symtfsn1-rec/WeatherInformationApp)
cd weather-information-app
pnpm install
```

2. 環境変数の設定
プロジェクトルートに.env.localファイルを作成し、OpenWeatherMapのAPIキーを設定してください。
```
OPEN_WEATHER_MAP_API_KEY=your_openweathermap_api_key_here
```

3. 開発サーバーの起動
```
pnpm dev
```

4. ビルド確認
```
pnpm build
```

---

## PR（いくつか抜粋）
### PR#2
```

## 概要
- OpenWeatherMapAPIを利用して天気データを取得・検証するためのRouteHandlerと関連する型定義、ユーティリティを実装しました
- APIキーを隠蔽しつつ、Zodによるバリデーションで安全にデータを取得することができます

## やったこと
- [x] `schemas/weather.ts`: 検索入力、ジオコーディングAPI、天気情報API用のZodバリデーションスキーマの作成
- [x] `types/weather.ts`: Zodスキーマからz.inferで型を抽出
- [x] `lib/weatherFetcher.ts`: OpenWeatherMapとの通信およびデータ検証を行う関数の作成
- [x] `app/api/weather/route.ts`: ステータスコード別（400/404/500）のエラーを返す Route Handler（GET） の作成
- [x] `lib/formatTime.ts`: UNIXタイムスタンプとタイムゾーンオフセットから現地時間を計算する関数の作成

## 動作確認手順
1. `git checkout feature/weather-api` でブランチを切り替える
2. `pnpm dev` でローカルサーバーを起動
3. 以下のテストケースを確認してください：
   - `http://localhost:3000/api/weather?city=Tokyo`にアクセスして、検証済みの天気データ（JSON）が返ってくるか
   - `http://localhost:3000/api/weather?city=`にアクセスして、エラー(`都市名が指定されていません`)が返ってくるか
   - `http://localhost:3000/api/weather?city=abcdef`にアクセスしてエラー(`都市が見つかりませんでした`)が返ってくるか

```

### PR#9
```

## 概要
- スマホとPCで使用する中で気になったUXの改善

## やったこと
- [x] `src/components/weather/SearchForm.tsx`: スマホでの使用時、検索窓をタップするとわずかにズームし、検索ボタンが画面外にはみ出し使いづらく、ブラウザが16px未満の文字を小さいと判断し自動でズームすると知り、フォントサイズを16pxに修正
- [x]  `src/app/page.tsx`と`src/components/weather/WeatherSection.tsx`: 再読み込み時、フェッチしていないにも関わらずスケルトンUIが表示されてしまっていたためWeatherSection.tsxを挟み、`city`が存在しない場合はスケルトンUIを表示しないよう修正
- [x] `src/components/weather/WeatherInformation.tsx`: 都市（例：ハノイと調べてXom Phoという観測地点が表示）をお気に入りに追加した際 、お気に入り都市のリストからXom Phoをクリックするとweather/Xom Phoに移動するが、Xom Phoは主要都市ではないため都市が見つからないというエラーを吐いたため、今までweatherData.nameで保存していたのを、検索窓に入力した都市名をストレージに保存するよう修正
- [x] `src/app/weather/[city]/page.tsx` : 最初はSSGの実装を示すためにgenerateStaticParamsを採用していたが、リアルタイム性の高い天気データはSSGよりもページをPPRしつつ天気情報はSSRでキャッシュ（今回は1時間）する方が適していると判断し修正

## 動作確認手順
1. `git checkout fix/modify-ux` でブランチを切り替える
2. `pnpm dev` でローカルサーバーを起動
3. `http://localhost:3000` にアクセス
4. 以下のテストケースを確認してください：
   - トップページで再読み込みを複数回押してもスケルトンUIが表示されないか
   - 入力した都市名と違う名前の検索結果の場合、お気に入りに保存して、お気に入りリストでの表示名とストレージでの表示名が検索窓で入力した都市名になっているか
   - `pnpm build`コマンドで`weather/[city]`がPPRになっているか

```
