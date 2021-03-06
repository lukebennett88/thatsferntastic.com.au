import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Header } from './header';
import { MobileMenu } from './mobile-menu';
import { Sidebar } from './sidebar';
import { Footer } from './footer';

export function Layout({ children, hasSidebar = true }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header setMenuOpen={setMenuOpen} />
      <MobileMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <div className="flex-1 w-full max-w-2xl px-6 mx-auto lg:max-w-screen-xl">
        <div className="flex flex-wrap py-12 lg:space-x-16">
          {hasSidebar && <Sidebar />}
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
};
