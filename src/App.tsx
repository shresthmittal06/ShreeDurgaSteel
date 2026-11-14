/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductRangeSection } from './components/ProductRangeSection';
import { IndustriesSection } from './components/IndustriesSection';
import { TrustStatsSection } from './components/TrustStatsSection';
import { CatalogueDownloadSection } from './components/CatalogueDownloadSection';
import { ProductsCataloguePage } from './components/ProductsCataloguePage';
import { ProductDetailView } from './components/ProductDetailView';
import { CommercialKitchenPage } from './components/CommercialKitchenPage';
import { ManufacturingPage } from './components/ManufacturingPage';
import { GnPansPage } from './components/GnPansPage';
import { ProjectsPage } from './components/ProjectsPage';
import { GetAQuotePage } from './components/GetAQuotePage';
import { PriceMatrixPage } from './components/PriceMatrixPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { QuoteModal } from './components/QuoteModal';
import { CatalogueDownloadModal } from './components/CatalogueDownloadModal';
import { AdminCmsModal } from './components/AdminCmsModal';
import { ProductImageModal } from './components/ProductImageModal';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminPanelPage } from './components/AdminPanelPage';
import { AdminFloatingBar } from './components/AdminFloatingBar';

const MainLayout: React.FC = () => {
  const {
    activePage,
    brand,
    selectedProductForDetail,
    goBack,
  } = useContent();

  // Keep dynamic document title in sync with brand name
  useEffect(() => {
    document.title = `${brand.brandName} | Commercial Kitchen Equipment Manufacturer & B2B Solutions`;
  }, [brand.brandName]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3E7DA] text-[#292321] selection:bg-[#5B1018] selection:text-[#F3E7DA]">
      {/* Top B2B Navigation */}
      <Header />

      {/* Main View Router */}
      <main className="flex-grow pb-16 sm:pb-0">
        {selectedProductForDetail ? (
          <ProductDetailView
            product={selectedProductForDetail}
            onBack={goBack}
          />
        ) : (
          <>
            {activePage === 'home' && (
          <>
            {/* SECTION 01 — HERO */}
            <HeroSection />

            {/* SECTION 02 — DEDICATED PRODUCT CATEGORIES GATEWAY */}
            <ProductRangeSection />

            {/* SECTION 03 — PARTIES / CLIENT LOGOS */}
            <IndustriesSection />

            {/* SECTION 04 — QUALITY / TRUST */}
            <TrustStatsSection />

            {/* SECTION 05 — PRODUCT CATALOGUE DOWNLOAD & SPEC SHEET */}
            <CatalogueDownloadSection />
          </>
        )}

        {activePage === 'products' && <ProductsCataloguePage />}

        {activePage === 'commercial' && <CommercialKitchenPage />}

        {activePage === 'manufacturing' && <ManufacturingPage />}

        {activePage === 'gnpans' && <GnPansPage />}

        {activePage === 'projects' && <ProjectsPage />}

        {activePage === 'quote' && <GetAQuotePage />}

        {activePage === 'pricesheet' && <PriceMatrixPage />}

        {activePage === 'solutions' && (
          <div className="pt-20">
            <IndustriesSection />
            <CatalogueDownloadSection />
          </div>
        )}

        {activePage === 'about' && (
          <>
            <AboutPage />
            <TrustStatsSection />
          </>
        )}

        {activePage === 'catalogue' && (
          <div className="pt-20">
            <CatalogueDownloadSection />
            <ProductRangeSection />
          </div>
        )}

        {activePage === 'contact' && <ContactPage />}

        {activePage === 'admin-login' && <AdminLoginPage />}

        {activePage === 'admin-panel' && <AdminPanelPage />}
          </>
        )}
      </main>

      {/* Global B2B Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <WhatsAppFloatingButton />
      <QuoteModal />
      <CatalogueDownloadModal />
      <AdminCmsModal />
      <ProductImageModal />
      <AdminFloatingBar />
    </div>
  );
};

export default function App() {
  return (
    <ContentProvider>
      <MainLayout />
    </ContentProvider>
  );
}
