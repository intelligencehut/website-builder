'use client';

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import {
  CONTACT_INFO,
  SIMPLE_NAVIGATION_ITEMS,
  SOCIAL_LINKS,
} from '@/constants';
import { InViewAnimation } from '@/components/common/InViewAnimation';
import Image from 'next/image';

const socialLinks = [
  { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
];

const quickLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Annual Reports', href: '/reports' },
  { label: 'Transparency', href: '/transparency' },
];

interface FooterProps {
  quickLinks?: { label: string; href: string }[];
  socialLinks?: { icon: string; href: string; label: string }[];
  siteName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export function Footer(props: FooterProps = {}) {
  // Use props from database if provided, fall back to hardcoded constants
  const footerEmail = props.email ?? CONTACT_INFO.email;
  const footerPhone = props.phone ?? CONTACT_INFO.phone;
  const footerAddress = props.address ?? CONTACT_INFO.address;
  const footerSiteName = props.siteName ?? 'SEVAA';
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // Check if we're on the home page
      const currentPath = window.location.pathname;
      if (currentPath === '/') {
        // Already on home page, just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home page with hash
        window.location.href = `/${href}`;
      }
    } else {
      // For page routes, use window.location
      window.location.href = href;
    }
  };

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Organization Info */}
          <InViewAnimation className='lg:col-span-2'>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <Image
                  src='/images/logo.png'
                  alt='SEVAA Logo'
                  width={48}
                  height={48}
                  className='rounded-full'
                />
                <div>
                  <h3 className='text-2xl font-bold !text-orange-400'>SEVAA</h3>
                  <p className='text-gray-200 text-sm'>
                    &quot;শিব জ্ঞানে জীব সেবা&quot;
                  </p>
                </div>
              </div>
              <p className='text-gray-100 leading-relaxed max-w-md'>
                Society for Envisioning Vivekananda in Awareness and Action -
                Transforming communities through evidence-based programs
                inspired by Swami Vivekananda&apos;s vision of service to
                humanity.
              </p>

              {/* Contact Information */}
              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <Mail className='h-5 w-5 text-orange-400 flex-shrink-0' />
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className='text-gray-100 hover:text-white transition-colors'
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>

                <div className='flex items-center space-x-3'>
                  <Phone className='h-5 w-5 text-orange-400 flex-shrink-0' />
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className='text-gray-100 hover:text-white transition-colors'
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>

                <div className='flex items-start space-x-3'>
                  <MapPin className='h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5' />
                  <address className='text-gray-100 not-italic'>
                    {CONTACT_INFO.address}
                  </address>
                </div>
              </div>
            </div>
          </InViewAnimation>

          {/* Quick Links */}
          <InViewAnimation delay={0.2}>
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold !text-white'>Quick Links</h4>
              <ul className='space-y-2'>
                {SIMPLE_NAVIGATION_ITEMS.map(item => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className='text-gray-100 hover:text-white transition-colors text-sm'
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className='pt-4'>
                <h5 className='text-sm font-medium !text-white mb-2'>Legal</h5>
                <ul className='space-y-2'>
                  {quickLinks.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className='text-gray-100 hover:text-white transition-colors text-sm'
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </InViewAnimation>

          {/* Social Media & Newsletter */}
          <InViewAnimation delay={0.4}>
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold !text-white'>
                Connect With Us
              </h4>

              {/* Social Media Links */}
              <div className='flex space-x-3'>
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className='p-2 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors'
                  >
                    <social.icon className='h-5 w-5' />
                  </a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className='pt-4'>
                <h5 className='text-sm font-medium !text-white mb-2'>
                  Stay Updated
                </h5>
                <p className='text-gray-100 text-sm mb-3'>
                  Subscribe to our newsletter for latest updates
                </p>
                <div className='flex space-x-2'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    className='flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm'
                  />
                  <button className='px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors text-sm font-medium'>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </InViewAnimation>
        </div>

        {/* Our Platforms */}
        <InViewAnimation delay={0.5}>
          <div className='mt-12 pt-8 border-t border-gray-800'>
            <h4 className='text-lg font-semibold !text-white mb-4'>
              Our Platforms
            </h4>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <a
                href='https://tmsvv.sevaa.net/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'
              >
                <div className='w-2 h-2 bg-green-400 rounded-full flex-shrink-0'></div>
                <div>
                  <p className='text-sm font-medium text-white'>TMSVV</p>
                  <p className='text-xs text-gray-400'>
                    Tilka Murmu Forest School
                  </p>
                </div>
              </a>
              <a
                href='https://ukhra.sevaa.net/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'
              >
                <div className='w-2 h-2 bg-orange-400 rounded-full flex-shrink-0'></div>
                <div>
                  <p className='text-sm font-medium text-white'>SEVAA Ukhra</p>
                  <p className='text-xs text-gray-400'>
                    Education in Paschim Bardhaman
                  </p>
                </div>
              </a>
              <a
                href='https://internal.sevaa.net/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'
              >
                <div className='w-2 h-2 bg-blue-400 rounded-full flex-shrink-0'></div>
                <div>
                  <p className='text-sm font-medium text-white'>
                    Internal Operations
                  </p>
                  <p className='text-xs text-gray-400'>
                    Financial &amp; School Management
                  </p>
                </div>
              </a>
            </div>
          </div>
        </InViewAnimation>

        {/* Bottom Bar */}
        <InViewAnimation delay={0.6}>
          <div className='mt-12 pt-8 border-t border-gray-800'>
            <div className='text-center space-y-2'>
              <div className='flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6'>
                <span className='text-gray-200 text-sm'>
                  © {new Date().getFullYear()} SEVAA. All rights reserved.
                </span>
                <span className='text-gray-200 text-sm'>
                  Tax ID: {CONTACT_INFO.taxId}
                </span>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  <span className='text-gray-200 text-sm'>Registered NGO</span>
                </div>
              </div>
              <div>
                <span className='text-gray-400 text-xs'>
                  Powered by Logic & Tech
                </span>
              </div>
            </div>
          </div>
        </InViewAnimation>
      </div>
    </footer>
  );
}
