import Hero from '@/components/Hero'
import JoinProcessSection from '@/components/sections/join-process-section'
import HomeSchoolOfMinistry from '@/components/sections/home-som-teaser'
import HomeLatestSermons from '@/components/sections/home-latest-sermons'

export const revalidate = 60

export default function Home() {
  return (
    <>
      <Hero />
      <JoinProcessSection />
      <HomeSchoolOfMinistry />
      <HomeLatestSermons />
    </>
  )
}
