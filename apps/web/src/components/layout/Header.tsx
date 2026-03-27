'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAVIGATION_ITEMS } from '@/constants';
import { navigationSlide, mobileMenuOverlay } from '@/lib/animations';
import { UserMenu } from '@/components/auth/UserMenu';
import { useSmoothScroll } from '@/hooks/useSmootScroll';
import Image from 'next/image';

interface NavItem {
  id: string;
  label: string;
  href: string;
  dropdown?: { id: string; label: string; href: string }[];
}

interface HeaderProps {
  navItems?: NavItem[];
  logo?: string;
  siteName?: string;
}

export function Header({ navItems, logo, siteName }: HeaderProps = {}) {
  // Use props if provided, fall back to hardcoded constants
  const items = navItems ?? NAVIGATION_ITEMS;
  const logoSrc = logo ?? '/sevaa_logo.png';
  const siteTitle = siteName ?? 'SEVAA';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null);
  const { scrollToSection } = useSmoothScroll();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // Check if we're on the home page
      const currentPath = window.location.pathname;
      if (currentPath === '/') {
        // Already on home page, just scroll
        scrollToSection(href);
      } else {
        // Navigate to home page with hash
        window.location.href = `/${href}`;
      }
    } else {
      // For page routes, use window.location
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <button
              onClick={() => (window.location.href = '/')}
              className='flex items-center space-x-3 hover:opacity-90 transition-opacity'
            >
              <Image
                src={logoSrc}
                alt={`${siteTitle} Logo`}
                width={60}
                height={60}
                className='object-contain'
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {items.map(item => (
              <div key={item.id} className='relative'>
                {'dropdown' in item && item.dropdown ? (
                  <div
                    className='relative'
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className='text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-1'
                    >
                      <span>{item.label}</span>
                      <ChevronDown className='h-4 w-4' />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className='absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'
                        >
                          {item.dropdown.map(subItem => (
                            <div key={subItem.id} className='relative'>
                              {'dropdown' in subItem && subItem.dropdown ? (
                                <div className='group relative'>
                                  <button
                                    onClick={() => handleNavClick(subItem.href)}
                                    className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors flex items-center justify-between'
                                  >
                                    <span>{subItem.label}</span>
                                    <ChevronDown className='h-3 w-3 rotate-[-90deg]' />
                                  </button>

                                  {/* Nested Dropdown */}
                                  <div className='hidden group-hover:block absolute left-full top-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 ml-1 before:content-[""] before:absolute before:top-0 before:bottom-0 before:-left-3 before:w-3'>
                                    {subItem.dropdown.map(nestedItem => (
                                      <div
                                        key={nestedItem.id}
                                        className='relative'
                                      >
                                        {'dropdown' in nestedItem &&
                                        nestedItem.dropdown ? (
                                          <div className='group/nested relative'>
                                            <button
                                              onClick={() =>
                                                handleNavClick(nestedItem.href)
                                              }
                                              className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors flex items-center justify-between'
                                            >
                                              <span>{nestedItem.label}</span>
                                              <ChevronDown className='h-3 w-3 rotate-[-90deg]' />
                                            </button>

                                            {/* Third Level Dropdown */}
                                            <div className='hidden group-hover/nested:block absolute left-full top-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 ml-1 before:content-[""] before:absolute before:top-0 before:bottom-0 before:-left-3 before:w-3'>
                                              {nestedItem.dropdown.map(
                                                deepNestedItem => (
                                                  <button
                                                    key={deepNestedItem.id}
                                                    onClick={() =>
                                                      handleNavClick(
                                                        deepNestedItem.href
                                                      )
                                                    }
                                                    className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors'
                                                  >
                                                    {deepNestedItem.label}
                                                  </button>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        ) : (
                                          <button
                                            onClick={() =>
                                              handleNavClick(nestedItem.href)
                                            }
                                            className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors'
                                          >
                                            {nestedItem.label}
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleNavClick(subItem.href)}
                                  className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors'
                                >
                                  {subItem.label}
                                </button>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className='text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200'
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={toggleMobileMenu}
              className='text-gray-700 hover:text-orange-600 p-2 transition-colors'
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={mobileMenuOverlay}
              initial='closed'
              animate='open'
              exit='closed'
              className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              variants={navigationSlide}
              initial='closed'
              animate='open'
              exit='closed'
              className='fixed top-16 right-0 bottom-0 w-80 bg-white shadow-xl border-l border-border z-50 md:hidden'
            >
              <div className='flex flex-col h-full bg-white'>
                {/* Navigation Items */}
                <nav className='flex-1 px-6 py-8 space-y-2 bg-white overflow-y-auto'>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className='border-b border-gray-100 last:border-b-0'
                    >
                      {'dropdown' in item && item.dropdown ? (
                        <div>
                          <button
                            onClick={() => {
                              if (mobileActiveDropdown === item.id) {
                                setMobileActiveDropdown(null);
                              } else {
                                setMobileActiveDropdown(item.id);
                              }
                            }}
                            className='flex items-center justify-between w-full text-left text-gray-700 hover:text-orange-600 py-3 text-lg font-medium transition-colors'
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${mobileActiveDropdown === item.id ? 'rotate-180' : ''}`}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileActiveDropdown === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className='pl-4 pb-2'
                              >
                                {item.dropdown.map(subItem => (
                                  <div key={subItem.id}>
                                    {'dropdown' in subItem &&
                                    subItem.dropdown ? (
                                      <div className='my-1'>
                                        <button
                                          onClick={() =>
                                            handleNavClick(subItem.href)
                                          }
                                          className='block w-full text-left text-gray-600 hover:text-orange-600 py-2 text-base font-medium transition-colors border-l-2 border-gray-200 pl-3'
                                        >
                                          {subItem.label}
                                        </button>
                                        <div className='pl-4 mt-1'>
                                          {subItem.dropdown.map(nestedItem => (
                                            <button
                                              key={nestedItem.id}
                                              onClick={() =>
                                                handleNavClick(nestedItem.href)
                                              }
                                              className='block w-full text-left text-gray-500 hover:text-orange-600 py-1 text-sm transition-colors pl-2'
                                            >
                                              {nestedItem.label}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleNavClick(subItem.href)
                                        }
                                        className='block w-full text-left text-gray-600 hover:text-orange-600 py-2 text-base transition-colors border-l-2 border-gray-200 pl-3 my-1'
                                      >
                                        {subItem.label}
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className='block w-full text-left text-gray-700 hover:text-orange-600 py-3 text-lg font-medium transition-colors'
                        >
                          {item.label}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className='p-6 border-t border-gray-200 bg-white space-y-4'>
                  <UserMenu />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
