import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - SEVAA',
  description:
    'Privacy Policy for Society for Envisioning Vivekananda in Awareness and Action (SEVAA)',
};

export default function PrivacyPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Privacy Policy
          </h1>
          <p className='text-lg text-gray-600'>Last updated: August 19, 2025</p>
        </div>

        {/* Content */}
        <div className='bg-white rounded-lg shadow-sm p-8 space-y-8'>
          {/* Introduction */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Introduction
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              Society for Envisioning Vivekananda in Awareness and Action
              (SEVAA) is committed to protecting your privacy and personal
              information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website, make donations, or interact with our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Information We Collect
            </h2>
            <div className='space-y-4'>
              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Personal Information
                </h3>
                <p className='text-gray-700 mb-2'>
                  We may collect the following personal information:
                </p>
                <ul className='list-disc pl-6 text-gray-700 space-y-1'>
                  <li>Name and contact information (email, phone, address)</li>
                  <li>Donation and payment information</li>
                  <li>Volunteer application details</li>
                  <li>Communication preferences</li>
                  <li>Any information you provide when contacting us</li>
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Automatically Collected Information
                </h3>
                <p className='text-gray-700 mb-2'>
                  When you visit our website, we automatically collect:
                </p>
                <ul className='list-disc pl-6 text-gray-700 space-y-1'>
                  <li>IP address and browser information</li>
                  <li>Device and operating system details</li>
                  <li>Website usage patterns and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              How We Use Your Information
            </h2>
            <p className='text-gray-700 mb-4'>
              We use collected information for the following purposes:
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>Process donations and issue tax receipts</li>
              <li>Communicate about our programs and activities</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Coordinate volunteer activities</li>
              <li>Respond to inquiries and provide support</li>
              <li>Improve our website and services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Maintain financial records and transparency</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Information Sharing and Disclosure
            </h2>
            <p className='text-gray-700 mb-4'>
              We do not sell, trade, or rent your personal information. We may
              share information only in the following circumstances:
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>
                <strong>Service Providers:</strong> With trusted third parties
                who assist in our operations (payment processors, email
                services)
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by law or to
                protect our rights and safety
              </li>
              <li>
                <strong>Financial Transparency:</strong> Donor information may
                be included in annual reports as required by law (with
                appropriate privacy protections)
              </li>
              <li>
                <strong>Consent:</strong> With your explicit permission for
                specific purposes
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Data Security
            </h2>
            <p className='text-gray-700 mb-4'>
              We implement appropriate security measures to protect your
              information:
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure payment processing through certified providers</li>
              <li>Regular security audits and updates</li>
              <li>
                Limited access to personal information on a need-to-know basis
              </li>
              <li>Staff training on data protection practices</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Cookies and Tracking Technologies
            </h2>
            <p className='text-gray-700 mb-4'>
              We use cookies and similar technologies to enhance your website
              experience and analyze usage patterns. You can control cookie
              settings through your browser preferences. Some website features
              may not function properly if cookies are disabled.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Your Rights and Choices
            </h2>
            <p className='text-gray-700 mb-4'>
              You have the following rights regarding your personal information:
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>
                <strong>Access:</strong> Request information about the data we
                hold about you
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                information (subject to legal requirements)
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications at any time
              </li>
              <li>
                <strong>Data Portability:</strong> Request a copy of your data
                in a portable format
              </li>
            </ul>
            <p className='text-gray-700 mt-4'>
              To exercise these rights, please contact us using the information
              provided below.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Data Retention
            </h2>
            <p className='text-gray-700'>
              We retain personal information for as long as necessary to fulfill
              the purposes outlined in this policy, comply with legal
              obligations, resolve disputes, and enforce our agreements.
              Financial records are maintained according to applicable
              accounting and tax regulations.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Third-Party Links
            </h2>
            <p className='text-gray-700'>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these external
              sites. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Children&rsquo;s Privacy
            </h2>
            <p className='text-gray-700'>
              Our website is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If you believe we have collected information from a child
              under 13, please contact us immediately.
            </p>
          </section>

          {/* International Users */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              International Users
            </h2>
            <p className='text-gray-700'>
              SEVAA operates primarily in India and our services are governed by
              Indian law. If you are accessing our website from outside India,
              please be aware that your information may be transferred to,
              stored, and processed in India.
            </p>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Changes to This Privacy Policy
            </h2>
            <p className='text-gray-700'>
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              our website and updating the &ldquo;Last updated&rdquo; date. Your
              continued use of our services after any changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Contact Us
            </h2>
            <p className='text-gray-700 mb-4'>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className='bg-gray-50 p-6 rounded-lg'>
              <h3 className='font-medium text-gray-900 mb-2'>
                Society for Envisioning Vivekananda in Awareness and Action
                (SEVAA)
              </h3>
              <p className='text-gray-700 mb-1'>
                <strong>Address:</strong> 131/B Sri Ramkrishna Pally, Sonarpur,
                Kolkata-700150, West Bengal, India
              </p>
              <p className='text-gray-700 mb-1'>
                <strong>Email:</strong>{' '}
                <a
                  href='mailto:infosevaa@gmail.com'
                  className='text-orange-600 hover:text-orange-700'
                >
                  infosevaa@gmail.com
                </a>
              </p>
              <p className='text-gray-700'>
                <strong>Phone:</strong>{' '}
                <a
                  href='tel:+919827193272'
                  className='text-orange-600 hover:text-orange-700'
                >
                  +91 98271 93272
                </a>
              </p>
            </div>
          </section>

          {/* Legal Compliance */}
          <section className='border-t pt-8'>
            <p className='text-sm text-gray-600'>
              This Privacy Policy complies with applicable Indian privacy laws
              and regulations, including the Information Technology Act, 2000
              and the Information Technology (Reasonable Security Practices and
              Procedures and Sensitive Personal Data or Information) Rules,
              2011.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
