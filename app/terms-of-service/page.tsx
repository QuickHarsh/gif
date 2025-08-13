'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfServicePage = () => {
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
                Terms of Service
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
        
        {/* Terms Content */}
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
                    Welcome to our platform. These Terms of Service ("Terms") govern your use of our website, mobile application, and services (collectively, the "Services") operated by our company. By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Services.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definitions</h2>
                  <p className="text-gray-700 mb-4">
                    <strong>"Account"</strong> means a unique account created for you to access our Services.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>"Company"</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to our company.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>"Content"</strong> refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You, regardless of the form of that content.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>"Device"</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
                  </p>
                  <p className="text-gray-700 mb-6">
                    <strong>"Service"</strong> refers to the Website and/or the Application.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                  <p className="text-gray-700 mb-4">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Services.
                  </p>
                  <p className="text-gray-700 mb-4">
                    You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                  </p>
                  <p className="text-gray-700 mb-6">
                    You may not use as a username the name of another person or entity that is not lawfully available for use, or a name or trademark that is subject to any rights of another person or entity without appropriate authorization.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Products and Services</h2>
                  <p className="text-gray-700 mb-4">
                    All products and services displayed on our platform are subject to availability. We reserve the right to discontinue any product or service at any time.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Prices for our products are subject to change without notice. We reserve the right to modify or discontinue the Services (or any part or content thereof) without notice at any time.
                  </p>
                  <p className="text-gray-700 mb-6">
                    We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Services.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Orders and Delivery</h2>
                  <p className="text-gray-700 mb-4">
                    When you place an order through our Services, you are making an offer to purchase the products you have selected. We reserve the right to accept or decline your order at our discretion.
                  </p>
                  <p className="text-gray-700 mb-4">
                    We strive to deliver products within the estimated delivery time. However, delivery times are not guaranteed and may vary due to factors beyond our control.
                  </p>
                  <p className="text-gray-700 mb-6">
                    You agree to provide accurate delivery information and ensure that someone is available to receive the delivery at the specified address during the selected time slot.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Payment Terms</h2>
                  <p className="text-gray-700 mb-4">
                    We accept various payment methods as indicated on our platform. By providing a payment method, you represent and warrant that you are authorized to use the designated payment method.
                  </p>
                  <p className="text-gray-700 mb-4">
                    You agree to pay all charges at the prices then in effect for your purchases and any applicable delivery fees, and you authorize us to charge your chosen payment provider for any such amounts.
                  </p>
                  <p className="text-gray-700 mb-6">
                    We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Returns and Refunds</h2>
                  <p className="text-gray-700 mb-4">
                    Our return and refund policy is outlined separately and forms part of these Terms. Please refer to our Return and Refund Policy for more information.
                  </p>
                  <p className="text-gray-700 mb-6">
                    We reserve the right to refuse returns or refunds that do not comply with our policy.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
                  <p className="text-gray-700 mb-4">
                    The Services and their original content, features, and functionality are and will remain the exclusive property of the Company and its licensors. The Services are protected by copyright, trademark, and other laws of both the Country and foreign countries.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Prohibited Uses</h2>
                  <p className="text-gray-700 mb-4">
                    You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>In any way that violates any applicable national or international law or regulation.</li>
                    <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                    <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
                    <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                    <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.</li>
                  </ul>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
                  <p className="text-gray-700 mb-4">
                    To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Services, third-party software and/or third-party hardware used with the Services, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
                  <p className="text-gray-700 mb-4">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                  <p className="text-gray-700 mb-4">
                    By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
                  <p className="text-gray-700 mb-4">
                    These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms, please contact us:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>By email: legal@company.com</li>
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

export default TermsOfServicePage;