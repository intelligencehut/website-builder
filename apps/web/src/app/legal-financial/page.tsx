import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal & Financial Information - SEVAA',
  description:
    'Legal and Financial Information for Society for Envisioning Vivekananda in Awareness and Action (SEVAA)',
};

export default function LegalFinancialPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Legal & Financial Information
          </h1>
          <p className='text-lg text-gray-600'>
            Complete registration and financial details for transparency
          </p>
        </div>

        {/* Content */}
        <div className='bg-white rounded-lg shadow-sm p-8 space-y-8'>
          {/* Organization Registration */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
              Organization Registration
            </h2>
            <div className='bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg'>
              <div className='flex items-start'>
                <div className='text-orange-600 text-2xl mr-4'>☛</div>
                <div>
                  <p className='text-gray-800 text-lg leading-relaxed'>
                    SEVAA is registered as{' '}
                    <strong>
                      &ldquo;SOCIETY FOR ENVISIONING VIVEKANANDA IN AWARENESS
                      AND ACTION&rdquo;
                    </strong>
                    , a not-for-profit society under West Bengal Societies
                    Registration Act, XXVI of 1961 bearing
                    <strong className='text-orange-700'>
                      {' '}
                      Registration No. S0017771 of 2020-2021
                    </strong>
                    , dated March 18, 2021, with the Registrar of Firms,
                    Societies & Non-Trading Corporations, Government of West
                    Bengal.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tax Exemption */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
              Tax Exemption Status
            </h2>
            <div className='bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg'>
              <div className='flex items-start'>
                <div className='text-green-600 text-2xl mr-4'>☛</div>
                <div>
                  <p className='text-gray-800 text-lg leading-relaxed'>
                    All donations to SEVAA are exempted from Income Tax under{' '}
                    <strong>Section 80G</strong> of the Income Tax Act, 1961,
                    issued by Commissioner of Income Tax, Kolkata – XVIII,
                    Kolkata.
                    <strong className='text-green-700'>
                      {' '}
                      Unique Registration No. ABPAS1880HF20221
                    </strong>
                    dated 28/03/2022 under 12 Clause(iv) of first Proviso to
                    Sub-Section(5) of section 80G.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Organization Details */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
              Organization Details
            </h2>
            <div className='grid md:grid-cols-2 gap-6'>
              {/* PAN Details */}
              <div className='bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg'>
                <div className='flex items-start'>
                  <div className='text-blue-600 text-2xl mr-4'>☛</div>
                  <div>
                    <h3 className='font-semibold text-red-600 text-lg mb-2'>
                      Permanent Account Number (PAN)
                    </h3>
                    <p className='text-gray-800 text-xl font-mono font-bold'>
                      ABPAS1880H
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className='bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg'>
                <div className='flex items-start'>
                  <div className='text-purple-600 text-2xl mr-4'>☛</div>
                  <div>
                    <h3 className='font-semibold text-red-600 text-lg mb-2'>
                      Registered Address
                    </h3>
                    <p className='text-gray-800 leading-relaxed'>
                      SEVAA, 131/B Sri Ramakrishna Pally,
                      <br />
                      Sonarpur, Kolkata 700150,
                      <br />
                      West Bengal, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bank Account Details */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
              Bank Account Details
            </h2>
            <div className='bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg'>
              <div className='flex items-start'>
                <div className='text-gray-600 text-2xl mr-4'>☛</div>
                <div className='w-full'>
                  <h3 className='font-semibold text-red-600 text-lg mb-4'>
                    Bank Account Details
                  </h3>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div className='space-y-3'>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-orange-500 rounded-full mr-3'></span>
                        <span className='font-medium text-gray-700'>
                          Beneficiary:
                        </span>
                        <span className='ml-2 text-gray-900 font-semibold'>
                          SEVAA
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-orange-500 rounded-full mr-3'></span>
                        <span className='font-medium text-gray-700'>Bank:</span>
                        <span className='ml-2 text-gray-900 font-semibold'>
                          Indian Bank
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-orange-500 rounded-full mr-3'></span>
                        <span className='font-medium text-gray-700'>
                          Branch:
                        </span>
                        <span className='ml-2 text-gray-900 font-semibold'>
                          Tollygunge
                        </span>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-orange-500 rounded-full mr-3'></span>
                        <span className='font-medium text-gray-700'>
                          A/c Number:
                        </span>
                        <span className='ml-2 text-gray-900 font-mono font-bold'>
                          7103506260
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-orange-500 rounded-full mr-3'></span>
                        <span className='font-medium text-gray-700'>
                          A/c Type:
                        </span>
                        <span className='ml-2 text-gray-900 font-semibold'>
                          Savings
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <span className='w-3 h-3 bg-orange-500 rounded-full mr-3'></span>
                        <span className='font-medium text-gray-700'>IFSC:</span>
                        <span className='ml-2 text-gray-900 font-mono font-bold'>
                          IDIB000K777
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
              Additional Information
            </h2>
            <div className='space-y-6'>
              {/* Transparency Note */}
              <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
                <h3 className='font-semibold text-yellow-800 text-lg mb-3'>
                  Transparency Commitment
                </h3>
                <p className='text-yellow-700 leading-relaxed'>
                  SEVAA is committed to maintaining complete transparency in all
                  our operations. We ensure that all donations are utilized
                  effectively for the intended charitable purposes and maintain
                  proper financial records in accordance with applicable laws
                  and regulations.
                </p>
              </div>

              {/* Contact for Queries */}
              <div className='bg-indigo-50 border border-indigo-200 rounded-lg p-6'>
                <h3 className='font-semibold text-indigo-800 text-lg mb-3'>
                  Financial Queries
                </h3>
                <p className='text-indigo-700 leading-relaxed mb-4'>
                  For any questions regarding our financial operations, donation
                  receipts, or legal documentation, please contact us:
                </p>
                <div className='space-y-2 text-indigo-700'>
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href='mailto:infosevaa@gmail.com'
                      className='text-indigo-600 hover:text-indigo-800 underline'
                    >
                      infosevaa@gmail.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      href='tel:+919827193272'
                      className='text-indigo-600 hover:text-indigo-800 underline'
                    >
                      +91 98271 93272
                    </a>
                  </p>
                </div>
              </div>

              {/* Annual Reports */}
              <div className='bg-teal-50 border border-teal-200 rounded-lg p-6'>
                <h3 className='font-semibold text-teal-800 text-lg mb-3'>
                  Annual Reports
                </h3>
                <p className='text-teal-700 leading-relaxed'>
                  SEVAA publishes annual reports detailing our activities,
                  financial statements, and impact metrics. These reports are
                  available in our
                  <a
                    href='/annual-reports'
                    className='text-teal-600 hover:text-teal-800 underline font-medium'
                  >
                    {' '}
                    Annual Reports section
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section className='border-t pt-8'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
              Legal Compliance
            </h2>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <h3 className='font-medium text-gray-800'>
                  Regulatory Compliance
                </h3>
                <ul className='space-y-2 text-gray-700'>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
                    West Bengal Societies Registration Act, 1961
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
                    Income Tax Act, 1961 (Section 80G)
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
                    Foreign Contribution Regulation Act (FCRA)
                  </li>
                </ul>
              </div>
              <div className='space-y-4'>
                <h3 className='font-medium text-gray-800'>
                  Financial Standards
                </h3>
                <ul className='space-y-2 text-gray-700'>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full mr-3'></span>
                    Audited Financial Statements
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full mr-3'></span>
                    Proper Books of Accounts
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full mr-3'></span>
                    Tax Compliance Certificate
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Download Section */}
          <section className='bg-gray-100 rounded-lg p-6'>
            <h3 className='font-semibold text-gray-800 text-lg mb-4'>
              Download Documents
            </h3>
            <p className='text-gray-600 mb-4'>
              Official documents and certificates are available for download.
              For additional documentation, please contact our office.
            </p>
            <div className='flex flex-wrap gap-4'>
              <button className='bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors'>
                Registration Certificate
              </button>
              <button className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors'>
                80G Certificate
              </button>
              <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                PAN Card Copy
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
