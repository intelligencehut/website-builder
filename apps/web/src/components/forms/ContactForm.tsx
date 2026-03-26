'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CheckCircleIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

export function ContactForm({ className, onSuccess }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const hcaptchaRef = useRef<HCaptcha>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      hcaptchaToken: '',
    },
  });

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    form.setValue('hcaptchaToken', token);
    form.clearErrors('hcaptchaToken');
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    form.setValue('hcaptchaToken', '');
  };

  const handleCaptchaError = (_err: string) => {
    setCaptchaToken(null);
    form.setValue('hcaptchaToken', '');
    setSubmitError('Captcha verification failed. Please try again.');
  };

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error types
        if (result.code === 'RATE_LIMITED') {
          throw new Error(
            "You've sent too many messages recently. Please wait before trying again."
          );
        } else if (result.code === 'VALIDATION_ERROR') {
          throw new Error('Please check your input and try again.');
        } else if (result.code === 'INVALID_CONTENT') {
          throw new Error(
            'Please remove any HTML or script content from your message.'
          );
        } else if (result.code === 'CAPTCHA_FAILED') {
          // Reset captcha on failure
          hcaptchaRef.current?.resetCaptcha();
          setCaptchaToken(null);
          form.setValue('hcaptchaToken', '');
          throw new Error(
            result.error || 'Security verification failed. Please try again.'
          );
        } else {
          throw new Error(
            result.error || 'Failed to send message. Please try again.'
          );
        }
      }

      // Success case
      setIsSubmitted(true);
      form.reset();
      setCaptchaToken(null);
      hcaptchaRef.current?.resetCaptcha();
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
          <CheckCircleIcon className='mb-4 h-12 w-12 text-green-600' />
          <h3 className='mb-2 text-xl font-semibold text-gray-900'>
            Message Sent Successfully!
          </h3>
          <p className='text-gray-600 mb-4'>
            Thank you for contacting us. We&apos;ll get back to you within 24
            hours.
          </p>
          <Button
            variant='outline'
            onClick={() => {
              setIsSubmitted(false);
              setCaptchaToken(null);
              hcaptchaRef.current?.resetCaptcha();
            }}
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MailIcon className='h-5 w-5' />
          Get in Touch
        </CardTitle>
        <CardDescription>
          We&apos;d love to hear from you. Send us a message and we&apos;ll
          respond as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <UserIcon className='h-4 w-4' />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your full name'
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <MailIcon className='h-4 w-4' />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter your email address'
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <PhoneIcon className='h-4 w-4' />
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='tel'
                        placeholder='Enter your phone number (optional)'
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional - we&apos;ll only call if necessary
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='subject'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <MessageSquareIcon className='h-4 w-4' />
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='What is this regarding?'
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tell us how we can help you...'
                      className='min-h-[120px]'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide as much detail as possible so we can assist
                    you better.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* hCaptcha */}
            <FormField
              control={form.control}
              name='hcaptchaToken'
              render={({ field: _field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    <ShieldCheckIcon className='h-4 w-4' />
                    Security Verification
                  </FormLabel>
                  <FormControl>
                    <div className='flex justify-center'>
                      <HCaptcha
                        ref={hcaptchaRef}
                        sitekey={
                          process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''
                        }
                        onVerify={handleCaptchaVerify}
                        onExpire={handleCaptchaExpire}
                        onError={handleCaptchaError}
                        theme='light'
                        size='normal'
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Please complete the security verification to continue.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitError && (
              <div className='rounded-md bg-red-50 border border-red-200 p-4'>
                <p className='text-sm text-red-800'>{submitError}</p>
              </div>
            )}

            <Button
              type='submit'
              disabled={isSubmitting || !captchaToken}
              className='w-full'
              size='lg'
            >
              {isSubmitting ? (
                <>
                  <span className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-white'></span>
                  Sending Message...
                </>
              ) : (
                <>
                  <MailIcon className='mr-2 h-4 w-4' />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
