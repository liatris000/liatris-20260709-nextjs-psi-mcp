import { Noto_Sans_JP } from 'next/font/google'
import Script from 'next/script'

// 変更前: Google Fonts を _document の <link> で読み込み、描画をブロックしていた
// 変更後: next/font でフォントを自前で配信し、サードパーティのスクリプトは lazyOnload で読み込む

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSans.className}>
      <body>
        {children}
        {/* lazyOnload: 全リソース読み込み後に実行 → TBT 改善 */}
        <Script
          src="https://example-chat.com/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
