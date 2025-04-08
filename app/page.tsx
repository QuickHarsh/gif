import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CategorySection from './components/CategorySection';
import QualitySection from './components/QualitySection';
import DeliveryModelsSection from './components/DeliveryModelsSection';
import SustainabilitySection from './components/SustainabilitySection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div >
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <CategorySection />
        <QualitySection />
        <DeliveryModelsSection />
        <SustainabilitySection />
        <FAQSection />
        <Footer />
      </div>
      <ThemeToggle />
    </main>
  );
} 
