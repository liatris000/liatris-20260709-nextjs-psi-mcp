import Image from 'next/image'

// 変更前: <img src="/hero.jpg" alt="hero" style={{ width: '100%' }} />
// 変更後: LCP を改善するため、next/image に priority と sizes を付ける

export function HeroSection() {
  return (
    <section>
      <Image
        src="/hero.jpg"
        alt="hero"
        width={1200}
        height={600}
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
      />
    </section>
  )
}
