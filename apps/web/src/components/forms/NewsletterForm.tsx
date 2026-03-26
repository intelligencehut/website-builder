'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema, type NewsletterData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MailIcon, CheckCircleIcon } from 'lucide-react';

interface NewsletterFormProps {
  className?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export function NewsletterForm({
  className,
  onSuccess,
  compact = false,
}: NewsletterFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      preferences: ['newsletter'],
    },
  });

  const handleSubmit = async (data: NewsletterData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call - in real implementation, this would call your newsletter service
      await new Promise(resolve => setTimeout(resolve, 1500));

      // eslint-disable-next-line no-console
      console.log('Newsletter subscription:', data);

      setIsSubmitted(true);
      form.reset();
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
      <div
        className={`flex flex-col items-center justify-center py-8 text-center ${className}`}
      >
        <CheckCircleIcon className='mb-3 h-8 w-8 text-green-600' />
        <h3 className='mb-2 text-lg font-semibold text-gray-900'>
          Successfully Subscribed!
        </h3>
        <p className='text-gray-600 mb-4'>
          Thank you for subscribing. You&apos;ll receive our latest updates in
          your inbox.
        </p>
        {!compact && (
          <Button
            variant='outline'
            size='sm'
            onClick={() => setIsSubmitted(false)}
          >
            Subscribe Another Email
          </Button>
        )}
      </div>
    );
  }

  if (compact) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={`space-y-4 ${className}`}
        >
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='flex-1'>
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

            <Button type='submit' disabled={isSubmitting} size='default'>
              {isSubmitting ? (
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-white'></span>
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>

          {submitError && <p className='text-sm text-red-600'>{submitError}</p>}
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`space-y-6 ${className}`}
      >
        <div>
          <h3 className='text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2'>
            <MailIcon className='h-5 w-5' />
            Stay Updated
          </h3>
          <p className='text-gray-600 text-sm'>
            Subscribe to our newsletter to receive updates about our programs
            and impact.
          </p>
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
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

        <FormField
          control={form.control}
          name='preferences'
          render={() => (
            <FormItem>
              <FormLabel>What would you like to receive?</FormLabel>
              <div className='space-y-3'>
                {[
                  { value: 'newsletter', label: 'Monthly Newsletter' },
                  { value: 'updates', label: 'Program Updates' },
                  { value: 'events', label: 'Event Notifications' },
                ].map(item => (
                  <FormField
                    key={item.value}
                    control={form.control}
                    name='preferences'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={checked => {
                              const value = field.value || [];
                              if (checked) {
                                field.onChange([...value, item.value]);
                              } else {
                                field.onChange(
                                  value.filter(v => v !== item.value)
                                );
                              }
                            }}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                          <FormLabel className='text-sm font-normal'>
                            {item.label}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitError && (
          <div className='rounded-md bg-red-50 border border-red-200 p-4'>
            <p className='text-sm text-red-800'>{submitError}</p>
          </div>
        )}

        <Button type='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? (
            <>
              <span className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-white'></span>
              Subscribing...
            </>
          ) : (
            <>
              <MailIcon className='mr-2 h-4 w-4' />
              Subscribe to Newsletter
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
