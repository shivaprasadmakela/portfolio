import About from '../components/home/About';
import Contact from '../components/home/Contact';
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import Projects from '../components/home/Projects';

import FadeInSection from '../components/FadeInSection';
import YouTubeHome from '../components/home/YouTubeHome';
import Footer from '../components/home/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FadeInSection><About /></FadeInSection>
      <FadeInSection><Projects /></FadeInSection>
      <FadeInSection><YouTubeHome /></FadeInSection>
      <FadeInSection><Contact /></FadeInSection>
      <Footer />
    </>
  );
}