# PSI MCP × Claude Code — Next.js Core Web Vitals 改善サンプル

Zenn 記事「PSI MCP × Claude Code で Core Web Vitals を改善する」の実装サンプル。

記事: https://zenn.dev/liatris/articles/20260709-nextjs-psi-with-claude

このリポジトリは、単体で起動する Next.js アプリではない。改善前後のコード例(`components/` / `app/`)と、PSI MCP の設定テンプレート(`.claude/mcp.json`)を、自分の Next.js プロジェクトに写して使う形になっている。

## 前提

- Claude Code
- Node.js(`npx` で PSI MCP サーバーを起動するため)
- Google Cloud の PageSpeed Insights API キー
- 改善例を当てる先の、自分の Next.js(App Router)プロジェクト

## ブラウザで Before/After を見る

GitHub Pages: <https://liatris000.github.io/liatris-20260709-nextjs-psi-mcp/>

`index.html` 1 枚に、4 つの改善の Before/After と、MCP の設定例を並べている。

1. ヒーロー画像 (LCP) — `<img>` → `next/image` + `priority` + `sizes`
2. フォント (FCP / LCP) — Google Fonts `<link>` → `next/font`
3. サードパーティスクリプト (TBT) — 直書き `<script>` → `next/script` `lazyOnload`
4. Tailwind CSS の purge (Speed Index) — `content` パス更新
5. `.claude/mcp.json` 設定例 (コピーボタン付き)

手元で開く場合は、clone して `index.html` をブラウザで開く。

```bash
git clone https://github.com/liatris000/liatris-20260709-nextjs-psi-mcp.git
open liatris-20260709-nextjs-psi-mcp/index.html   # macOS。Linux なら xdg-open
```

## 動かし方(自分の Next.js プロジェクトで計測する)

### 1. Google Cloud API キーを発行

1. [Google Cloud Console](https://console.cloud.google.com/) → 「API とサービス」→「ライブラリ」
2. "PageSpeed Insights API" を検索して有効化
3. 「認証情報」→「認証情報を作成」→「API キー」

### 2. MCP 設定をプロジェクトに追加

このリポジトリの `.claude/mcp.json` を Next.js プロジェクトのルートに置き、API キーを設定する:

```json
{
  "mcpServers": {
    "pagespeed": {
      "command": "npx",
      "args": ["-y", "pagespeed-insights-mcp"],
      "env": {
        "PSI_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Claude Code を再起動すると `pagespeed` ツールが有効になる。

### 3. 計測と改善

Claude Code のチャットで:

```
このURLのPageSpeed InsightsをモバイルとPCで取得して
https://your-site.com
```

結果の Opportunities から、影響が大きい 1 項目を選んで修正 → 再計測、のループを回す。

## 期待される出力

PSI MCP からは、LCP / INP / CLS / FCP / TTFB / TBT と Performance スコアが返る。数値は計測対象のサイトと計測のたびのぶれで変わるので、このリポジトリには固定の出力例を置いていない。

## 確かめていない範囲

- このリポジトリには、PSI の実測結果(改善前後のスコア)を置いていない
- `components/` / `app/` のコードは断片で、このリポジトリ単体ではビルドしない(`package.json` が無い)
- PSI MCP サーバー(`pagespeed-insights-mcp`)の挙動は、記事執筆時点のもの

## ファイル構成

| ファイル | 説明 |
|---|---|
| `index.html` | Before/After を並べたショーケース(GitHub Pages) |
| `.claude/mcp.json` | PSI MCP サーバー設定テンプレート |
| `components/HeroSection.tsx` | `next/image` + `priority` + `sizes` による LCP 改善例 |
| `app/layout.tsx` | `next/font` + `lazyOnload` Script による FCP・TBT 改善例 |
| `tailwind.config.js` | `content` パス設定の注意点 |

## 参考

- [ruslanlap/pagespeed-insights-mcp](https://github.com/ruslanlap/pagespeed-insights-mcp)
- [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- [next/image](https://nextjs.org/docs/app/api-reference/components/image)
- [next/font](https://nextjs.org/docs/app/api-reference/components/font)
- [next/script](https://nextjs.org/docs/app/api-reference/components/script)

## ライセンス

MIT
