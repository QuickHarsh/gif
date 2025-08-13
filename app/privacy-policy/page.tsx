'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-12">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={container}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h1 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Privacy Policy
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-lg opacity-90 mb-2"
              >
                Last Updated: June 15, 2023
              </motion.p>
            </motion.div>
          </div>
        </section>
        
        {/* Privacy Policy Content */}
        <section className="py-12">
          <div className="container-custom mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={container}
                className="prose prose-lg max-w-none"
              >
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 mb-6">
                    This Privacy Policy describes how we collect, use, process, and disclose your information, including personal information, in conjunction with your access to and use of our Services. By using our Services, you acknowledge that you have read and understood this Privacy Policy.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>2.1 Information You Provide to Us</strong>
                  </p>
                  <p className="text-gray-700 mb-4">
                    We collect information you provide directly to us, such as:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, phone number, and password.</li>
                    <li><strong>Profile Information:</strong> Your profile picture, address, and preferences.</li>
                    <li><strong>Order Information:</strong> Information related to your orders, including delivery address, payment information, and order history.</li>
                    <li><strong>Communications:</strong> When you contact us directly, we record the communications and collect any additional information you provide.</li>
                    <li><strong>Survey Responses:</strong> Information you provide when participating in surveys or promotions.</li>
                  </ul>
                  
                  <p className="text-gray-700 mb-4">
                    <strong>2.2 Information We Collect Automatically</strong>
                  </p>
                  <p className="text-gray-700 mb-4">
                    When you use our Services, we automatically collect certain information, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li><strong>Usage Information:</strong> Details of your interactions with our Services, including pages visited, products viewed, time spent, and other actions.</li>
                    <li><strong>Device Information:</strong> Information about the device you use to access our Services, including device type, operating system, browser type, and IP address.</li>
                    <li><strong>Location Information:</strong> With your consent, we may collect precise location information from your device.</li>
                    <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to collect information about your browsing activities.</li>
                  </ul>
                  
                  <p className="text-gray-700 mb-4">
                    <strong>2.3 Information from Third Parties</strong>
                  </p>
                  <p className="text-gray-700 mb-6">
                    We may receive information about you from third parties, such as social media platforms, payment processors, and delivery partners, in accordance with their privacy policies.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                  <p className="text-gray-700 mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li><strong>Providing Services:</strong> To provide, maintain, and improve our Services, including processing orders, facilitating deliveries, and managing your account.</li>
                    <li><strong>Communications:</strong> To communicate with you about your orders, account, and our Services, including sending order confirmations, delivery updates, and customer support responses.</li>
                    <li><strong>Marketing:</strong> With your consent, to send you promotional messages, marketing communications, and offers about our products and services.</li>
                    <li><strong>Personalization:</strong> To personalize your experience, including recommending products based on your preferences and purchase history.</li>
                    <li><strong>Security:</strong> To detect, prevent, and address fraud, security breaches, and other potentially illegal activities.</li>
                    <li><strong>Legal Compliance:</strong> To comply with legal obligations and resolve disputes.</li>
                    <li><strong>Analytics:</strong> To understand how users interact with our Services and improve their functionality.</li>
                  </ul>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Share Your Information</h2>
                  <p className="text-gray-700 mb-4">
                    We may share your information with the following categories of recipients:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li><strong>Service Providers:</strong> Third-party vendors who provide services on our behalf, such as payment processing, delivery, customer support, and marketing.</li>
                    <li><strong>Business Partners:</strong> Partners with whom we offer co-branded services or engage in joint marketing activities.</li>
                    <li><strong>Legal Authorities:</strong> When required by law, court order, or governmental regulation, or to protect our rights, property, or safety.</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion of our assets.</li>
                    <li><strong>With Your Consent:</strong> We may share your information with third parties when you have given us your consent to do so.</li>
                  </ul>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
                  <p className="text-gray-700 mb-4">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                    <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
                    <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
                    <li><strong>Restriction:</strong> You can request that we restrict the processing of your information.</li>
                    <li><strong>Data Portability:</strong> You can request a copy of your personal information in a structured, commonly used, and machine-readable format.</li>
                    <li><strong>Objection:</strong> You can object to our processing of your personal information in certain circumstances.</li>
                    <li><strong>Withdraw Consent:</strong> You can withdraw your consent at any time where we rely on consent to process your personal information.</li>
                  </ul>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
                  <p className="text-gray-700 mb-6">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
                  <p className="text-gray-700 mb-6">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining the retention period, we consider the amount, nature, and sensitivity of the information, the potential risk of harm from unauthorized use or disclosure, and applicable legal requirements.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
                  <p className="text-gray-700 mb-6">
                    Your personal information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. We ensure that appropriate safeguards are in place to protect your personal information in accordance with this Privacy Policy.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
                  <p className="text-gray-700 mb-6">
                    Our Services are not directed to children under the age of 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information without parental consent, please contact us, and we will take steps to delete such information.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                  <p className="text-gray-700 mb-6">
                    We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or by posting a notice on our Services prior to the changes becoming effective. We encourage you to review this Privacy Policy periodically to stay informed about our information practices.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>By email: privacy@company.com</li>
                    <li>By phone: +91 8717986200</li>
                    <li>By mail: [Company Address]</li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;