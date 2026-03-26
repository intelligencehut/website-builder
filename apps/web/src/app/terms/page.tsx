import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - SEVAA',
  description:
    'Terms and Conditions for Society for Envisioning Vivekananda in Awareness and Action (SEVAA)',
};

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Terms and Conditions
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
              Welcome to the Society for Envisioning Vivekananda in Awareness
              and Action (SEVAA) website. These Terms and Conditions
              (&ldquo;Terms&rdquo;) govern your use of our website and services.
              By accessing or using our website, making donations, or
              participating in our programs, you agree to be bound by these
              Terms.
            </p>
          </section>

          {/* Organization Information */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              About SEVAA
            </h2>
            <p className='text-gray-700 mb-4'>
              SEVAA is a registered non-profit organization in India, dedicated
              to social service and community development through various
              educational, healthcare, and livelihood programs.
            </p>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-gray-700 mb-1'>
                <strong>Registered Address:</strong> 131/B Sri Ramkrishna Pally,
                Sonarpur, Kolkata-700150, West Bengal, India
              </p>
              <p className='text-gray-700 mb-1'>
                <strong>Registration Number:</strong> [Registration details as
                applicable]
              </p>
              <p className='text-gray-700'>
                <strong>PAN:</strong> [PAN number as applicable]
              </p>
            </div>
          </section>

          {/* Website Usage */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Website Usage
            </h2>
            <div className='space-y-4'>
              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Permitted Use
                </h3>
                <p className='text-gray-700 mb-2'>
                  You may use our website for:
                </p>
                <ul className='list-disc pl-6 text-gray-700 space-y-1'>
                  <li>Learning about our organization and programs</li>
                  <li>Making donations to support our causes</li>
                  <li>Volunteering and participating in our activities</li>
                  <li>Accessing educational and informational content</li>
                  <li>Contacting us for legitimate purposes</li>
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Prohibited Use
                </h3>
                <p className='text-gray-700 mb-2'>
                  You may not use our website for:
                </p>
                <ul className='list-disc pl-6 text-gray-700 space-y-1'>
                  <li>Any unlawful or fraudulent activities</li>
                  <li>Transmitting harmful code, viruses, or malware</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Interfering with website functionality or security</li>
                  <li>
                    Copying, distributing, or modifying our content without
                    permission
                  </li>
                  <li>
                    Using the website for commercial purposes without consent
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Donations and Financial Contributions */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Donations and Financial Contributions
            </h2>
            <div className='space-y-4'>
              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Donation Policy
                </h3>
                <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                  <li>
                    All donations are voluntary contributions to support our
                    charitable activities
                  </li>
                  <li>
                    Donations are generally non-refundable except in cases of
                    technical errors
                  </li>
                  <li>
                    We reserve the right to refuse donations that may compromise
                    our mission
                  </li>
                  <li>
                    Donors will receive receipts for tax purposes as per Indian
                    tax regulations
                  </li>
                  <li>
                    Donations will be used for the purposes specified or general
                    organizational activities
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Tax Benefits
                </h3>
                <p className='text-gray-700'>
                  Donations to SEVAA may be eligible for tax deductions under
                  Section 80G of the Income Tax Act, 1961. Please consult with
                  your tax advisor for specific benefits applicable to your
                  situation.
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Intellectual Property Rights
            </h2>
            <div className='space-y-4'>
              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Our Content
                </h3>
                <p className='text-gray-700 mb-2'>
                  All content on this website, including text, images, logos,
                  videos, and graphics, is owned by SEVAA or used with
                  permission. This content is protected by copyright and other
                  intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  User Content
                </h3>
                <p className='text-gray-700'>
                  By submitting content to our website (such as testimonials,
                  comments, or feedback), you grant SEVAA a non-exclusive right
                  to use, reproduce, and display such content for our
                  organizational purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Volunteer and Participation Terms */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Volunteer and Participation Terms
            </h2>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>
                Volunteers must complete our application process and background
                verification where applicable
              </li>
              <li>
                Volunteers are expected to adhere to our code of conduct and
                organizational values
              </li>
              <li>
                SEVAA reserves the right to terminate volunteer relationships at
                any time
              </li>
              <li>
                Volunteers participate at their own risk and must follow safety
                guidelines
              </li>
              <li>
                Personal information of beneficiaries and other sensitive data
                must be kept confidential
              </li>
            </ul>
          </section>

          {/* Privacy and Data Protection */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Privacy and Data Protection
            </h2>
            <p className='text-gray-700'>
              Your privacy is important to us. Please review our Privacy Policy
              to understand how we collect, use, and protect your personal
              information. By using our website, you consent to our data
              practices as described in our Privacy Policy.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Disclaimers
            </h2>
            <div className='space-y-4'>
              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Website Availability
                </h3>
                <p className='text-gray-700'>
                  We strive to maintain website availability but cannot
                  guarantee uninterrupted access. We may suspend or modify
                  services for maintenance, updates, or other reasons.
                </p>
              </div>

              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Information Accuracy
                </h3>
                <p className='text-gray-700'>
                  While we make every effort to provide accurate information, we
                  cannot guarantee the completeness or accuracy of all content.
                  Information is subject to change without notice.
                </p>
              </div>

              <div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  Third-Party Links
                </h3>
                <p className='text-gray-700'>
                  Our website may contain links to third-party websites. We are
                  not responsible for the content, privacy practices, or terms
                  of these external sites.
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Limitation of Liability
            </h2>
            <p className='text-gray-700 mb-4'>
              To the maximum extent permitted by law, SEVAA shall not be liable
              for any direct, indirect, incidental, consequential, or punitive
              damages arising from:
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-1'>
              <li>Use or inability to use our website or services</li>
              <li>Technical difficulties or system failures</li>
              <li>Loss of data or unauthorized access to information</li>
              <li>Participation in volunteer activities or programs</li>
              <li>Reliance on information provided on the website</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Indemnification
            </h2>
            <p className='text-gray-700'>
              You agree to indemnify and hold harmless SEVAA, its directors,
              officers, employees, and volunteers from any claims, damages, or
              expenses arising from your use of our website or violation of
              these Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Governing Law and Jurisdiction
            </h2>
            <p className='text-gray-700'>
              These Terms are governed by the laws of India. Any disputes
              arising from these Terms or your use of our website shall be
              subject to the exclusive jurisdiction of the courts in Kolkata,
              West Bengal, India.
            </p>
          </section>

          {/* Force Majeure */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Force Majeure
            </h2>
            <p className='text-gray-700'>
              SEVAA shall not be liable for any failure to perform obligations
              due to circumstances beyond our reasonable control, including
              natural disasters, government actions, strikes, or other
              unforeseeable events.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Modifications to Terms
            </h2>
            <p className='text-gray-700'>
              We reserve the right to modify these Terms at any time. Updated
              Terms will be posted on our website with a revised date. Your
              continued use of our website after changes constitutes acceptance
              of the modified Terms.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Severability
            </h2>
            <p className='text-gray-700'>
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions shall continue in full
              force and effect.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              Contact Information
            </h2>
            <p className='text-gray-700 mb-4'>
              If you have any questions about these Terms and Conditions, please
              contact us:
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

          {/* Acceptance */}
          <section className='border-t pt-8'>
            <p className='text-sm text-gray-600'>
              By using this website, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
              If you do not agree with these Terms, please do not use our
              website or services.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
