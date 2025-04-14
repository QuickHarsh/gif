import React from 'react';
import Navbar from '../components/Navbar';
import RegistrationSection from '../components/RegistrationSection';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <RegistrationSection />
    </main>
  );
}