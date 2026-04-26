import Hero from '../components/Hero';
import WelcomeMessage from '../components/WelcomeMessage';
import ServiceTimes from '../components/ServiceTimes';
import QuickButtons from '../components/QuickButtons';
import UpcomingEvents from '../components/UpcomingEvents';
import LatestSermon from '../components/LatestSermon';

export default function Home() {
  return (
    <main>
      <Hero />
      <WelcomeMessage />
      <ServiceTimes />
      <QuickButtons />
      <UpcomingEvents />
      <LatestSermon />
    </main>
  );
}
