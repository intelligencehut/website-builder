'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Search,
  HelpCircle,
  MessageCircle,
  FileQuestion,
  Users,
  Heart,
  Shield,
} from 'lucide-react';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: 'volunteer', label: 'Volunteering', icon: Users },
    { id: 'programs', label: 'Our Programs', icon: FileQuestion },
    { id: 'general', label: 'General', icon: MessageCircle },
    { id: 'legal', label: 'Legal & Financial', icon: Shield },
  ];

  const faqs = [
    {
      id: 1,
      category: 'donations',
      question: 'How can I make a donation to SEVAA?',
      answer:
        'You can make donations through our secure online donation form, bank transfer, or by sending a cheque to our registered address. We accept donations via UPI, credit/debit cards, and net banking. All donations are processed securely and you will receive a receipt for tax purposes.',
    },
    {
      id: 2,
      category: 'donations',
      question: 'Are donations to SEVAA tax-deductible?',
      answer:
        'Yes, SEVAA is registered under Section 80G of the Income Tax Act. Donations are eligible for tax deduction up to 50% of the donated amount. We provide official receipts that can be used for claiming tax deductions.',
    },
    {
      id: 3,
      category: 'donations',
      question: 'Can I donate specific items instead of money?',
      answer:
        'Yes, we accept in-kind donations such as books, educational materials, medical supplies, and clothing. Please contact us before sending items to ensure they align with our current needs and programs.',
    },
    {
      id: 4,
      category: 'volunteer',
      question: 'How can I volunteer with SEVAA?',
      answer:
        'You can join us as a volunteer by filling out our volunteer registration form. We welcome volunteers for various activities including field work, administrative support, event organization, and professional services like medical camps.',
    },
    {
      id: 5,
      category: 'volunteer',
      question: 'Do I need specific qualifications to volunteer?',
      answer:
        'No specific qualifications are required for general volunteering. However, for specialized roles like medical camps or educational programs, relevant qualifications may be preferred. We value enthusiasm and commitment above all.',
    },
    {
      id: 6,
      category: 'volunteer',
      question: 'How much time commitment is expected from volunteers?',
      answer:
        'We appreciate any amount of time you can contribute. Whether it&apos;s a few hours a month or regular weekly involvement, every contribution helps. We work with your schedule and availability.',
    },
    {
      id: 7,
      category: 'programs',
      question: 'What are SEVAA&apos;s main focus areas?',
      answer:
        'SEVAA focuses on rural development through education, healthcare, livelihood support, and environmental conservation. Our key projects include the Saparambera Project, Ukra Project, and Elachi Project, each addressing specific community needs.',
    },
    {
      id: 8,
      category: 'programs',
      question: 'How do you select communities for your projects?',
      answer:
        'We identify communities through field surveys, local partnerships, and needs assessments. Priority is given to remote areas with limited access to basic services and where our intervention can create maximum impact.',
    },
    {
      id: 9,
      category: 'programs',
      question: 'Can I visit your project sites?',
      answer:
        'Yes, we organize regular visits to our project sites for donors, volunteers, and stakeholders. Please contact us in advance to arrange a visit. We also conduct annual meetings where you can meet beneficiaries and see our work firsthand.',
    },
    {
      id: 10,
      category: 'general',
      question: 'What is the meaning of SEVAA?',
      answer:
        'SEVAA stands for "Society for Envisioning Vivekananda in Awareness and Action." It reflects our commitment to serving society following the ideals and teachings of Swami Vivekananda.',
    },
    {
      id: 11,
      category: 'general',
      question: 'When was SEVAA founded and by whom?',
      answer:
        'SEVAA was founded by a group of dedicated individuals inspired by Swami Vivekananda&apos;s philosophy of service. You can read more about our genesis and founding members in the "Our Genesis" section of our website.',
    },
    {
      id: 12,
      category: 'general',
      question: 'How can I stay updated with SEVAA&apos;s activities?',
      answer:
        'You can subscribe to our newsletter, follow us on social media platforms, or regularly visit our website for updates. We also publish annual reports detailing our activities and impact.',
    },
    {
      id: 13,
      category: 'legal',
      question: 'Is SEVAA a registered organization?',
      answer:
        'Yes, SEVAA is a registered non-profit organization. Our registration details, legal documents, and financial information are available on our Legal & Financial Information page for complete transparency.',
    },
    {
      id: 14,
      category: 'legal',
      question: 'How can I access SEVAA&apos;s financial reports?',
      answer:
        'Our audited financial reports are published annually and available in the Annual Reports section. We believe in complete financial transparency and make all our financial information publicly accessible.',
    },
    {
      id: 15,
      category: 'legal',
      question: 'What is your policy on data privacy?',
      answer:
        'We strictly adhere to data protection laws and maintain the privacy of all personal information. Our detailed Privacy Policy outlines how we collect, use, and protect your data. We never share personal information with third parties without consent.',
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'infosevaa@gmail.com',
      action: 'mailto:infosevaa@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team',
      contact: '+91 98271 93272',
      action: 'tel:+919827193272',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come to our office',
      contact: '131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150',
      action:
        'https://maps.google.com/?q=131/B+Sri+Ramkrishna+Pally+Sonarpur+Kolkata+700150',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <section className='bg-gradient-to-r from-orange-50 to-orange-100 py-16'>
        <div className='container mx-auto px-6'>
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              How Can We Help You?
            </h1>
            <p className='text-xl text-gray-600 mb-8'>
              Find answers to common questions or get in touch with our support
              team
            </p>

            {/* Search Bar */}
            <div className='relative max-w-md mx-auto'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <Input
                type='text'
                placeholder='Search FAQs...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='pl-10 pr-4 py-3 text-lg border-2 border-orange-200 focus:border-orange-500 rounded-lg'
              />
            </div>
          </div>
        </div>
      </section>

      <div className='container mx-auto px-6 py-12'>
        <Tabs defaultValue='faq' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 mb-8'>
            <TabsTrigger value='faq' className='text-lg py-3'>
              <FileQuestion className='h-5 w-5 mr-2' />
              Frequently Asked Questions
            </TabsTrigger>
            <TabsTrigger value='contact' className='text-lg py-3'>
              <MessageCircle className='h-5 w-5 mr-2' />
              Contact Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value='faq' className='space-y-8'>
            {/* FAQ Categories */}
            <div className='flex flex-wrap gap-2 justify-center'>
              {faqCategories.map(category => {
                const IconComponent = category.icon;
                return (
                  <Badge
                    key={category.id}
                    variant={
                      activeCategory === category.id ? 'default' : 'outline'
                    }
                    className={`cursor-pointer px-4 py-2 ${
                      activeCategory === category.id
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'hover:bg-orange-50'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <IconComponent className='h-4 w-4 mr-2' />
                    {category.label}
                  </Badge>
                );
              })}
            </div>

            {/* FAQ Accordion */}
            <div className='max-w-4xl mx-auto'>
              {filteredFaqs.length > 0 ? (
                <Accordion
                  type='single'
                  collapsible
                  className='w-full space-y-4'
                >
                  {filteredFaqs.map(faq => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${faq.id}`}
                      className='border border-gray-200 rounded-lg px-6 py-2 hover:shadow-md transition-shadow'
                    >
                      <AccordionTrigger className='text-left font-semibold text-gray-900 hover:text-orange-600'>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className='text-gray-600 leading-relaxed pt-2'>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className='text-center py-12'>
                  <HelpCircle className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                  <p className='text-gray-500 text-lg'>
                    No FAQs found matching your search criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Still Need Help */}
            <Card className='max-w-2xl mx-auto text-center bg-orange-50 border-orange-200'>
              <CardHeader>
                <CardTitle className='text-2xl text-gray-900'>
                  Still Need Help?
                </CardTitle>
                <CardDescription className='text-gray-600'>
                  Can&apos;t find what you&apos;re looking for? Our support team
                  is here to help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  size='lg'
                  className='bg-orange-500 hover:bg-orange-600'
                  onClick={() => {
                    const contactTab = document.querySelector(
                      '[value="contact"]'
                    ) as HTMLElement;
                    contactTab?.click();
                  }}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='contact' className='space-y-8'>
            {/* Contact Methods */}
            <div className='grid md:grid-cols-3 gap-6 mb-12'>
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card
                    key={index}
                    className='text-center hover:shadow-lg transition-shadow cursor-pointer'
                  >
                    <CardHeader>
                      <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <IconComponent className='h-8 w-8 text-orange-600' />
                      </div>
                      <CardTitle className='text-xl text-gray-900'>
                        {method.title}
                      </CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant='outline'
                        className='w-full border-orange-200 hover:bg-orange-50'
                        onClick={() => window.open(method.action, '_blank')}
                      >
                        {method.contact}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Office Hours */}
            <Card className='max-w-2xl mx-auto'>
              <CardHeader className='text-center'>
                <CardTitle className='flex items-center justify-center text-2xl text-gray-900'>
                  <Clock className='h-6 w-6 mr-2 text-orange-600' />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Sunday:</span>
                  <span>Closed</span>
                </div>
                <div className='mt-4 p-3 bg-orange-50 rounded-lg'>
                  <p className='text-sm text-gray-600'>
                    <strong>Note:</strong> We aim to respond to all inquiries
                    within 24 hours during business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Form */}
            <Card className='max-w-2xl mx-auto'>
              <CardHeader className='text-center'>
                <CardTitle className='text-2xl text-gray-900'>
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Name
                    </label>
                    <Input placeholder='Your full name' />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email
                    </label>
                    <Input type='email' placeholder='your@email.com' />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Subject
                  </label>
                  <Input placeholder='What can we help you with?' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Message
                  </label>
                  <Textarea
                    placeholder='Please describe your question or issue in detail...'
                    rows={5}
                  />
                </div>
                <Button
                  className='w-full bg-orange-500 hover:bg-orange-600'
                  size='lg'
                >
                  Send Message
                </Button>
                <p className='text-sm text-gray-500 text-center'>
                  For urgent matters, please call us directly at +91 98271 93272
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
