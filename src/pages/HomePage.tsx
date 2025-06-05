import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ProductShowcase from '../components/home/ProductShowcase';
import PrintingService from '../components/home/PrintingService';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <ProductShowcase />
      <PrintingService />
      <Testimonials />
    </Layout>
  );
};

export default HomePage;