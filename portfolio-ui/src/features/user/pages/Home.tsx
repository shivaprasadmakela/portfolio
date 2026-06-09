import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import YouTubeHome from '../components/YouTubeHome/YouTubeHome';
import { FadeInSection } from '../../../shared/components';

export default function Home() {
  return (
    <>
      <Hero />
      <FadeInSection delay={0.3}><About /></FadeInSection>
      <FadeInSection><Projects /></FadeInSection>
      <FadeInSection><YouTubeHome /></FadeInSection>
      <FadeInSection><Contact /></FadeInSection>
    </>
  );
}
