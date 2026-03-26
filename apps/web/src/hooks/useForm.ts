/**
 * Hook for form handling with validation
 */

import { useState, useCallback } from 'react';
import { FieldValidation, FormState } from '@/types';

export function useForm<T extends Record<string, unknown>>(
  initialData: T,
  validation?: FieldValidation
) {
  const [formState, setFormState] = useState<FormState<T>>({
    data: initialData,
    errors: {},
    isSubmitting: false,
    isValid: true,
    touched: {},
  });

  const validateField = useCallback(
    (name: keyof T, value: unknown): string | undefined => {
      if (!validation || !validation[name as string]) return undefined;

      const rules = validation[name as string];
      
      if (rules.required && (!value || String(value).trim() === '')) {
        return 'This field is required';
      }

      if (rules.minLength && String(value).length < rules.minLength) {
        return `Must be at least ${rules.minLength} characters`;
      }

      if (rules.maxLength && String(value).length > rules.maxLength) {
        return `Must be no more than ${rules.maxLength} characters`;
      }

      if (rules.pattern && !rules.pattern.test(String(value))) {
        return 'Invalid format';
      }

      if (rules.custom) {
        return rules.custom(value);
      }

      return undefined;
    },
    [validation]
  );

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    let isValid = true;

    Object.keys(formState.data).forEach(key => {
      const error = validateField(key, formState.data[key]);
      if (error) {
        errors[key] = error;
        isValid = false;
      }
    });

    return { errors, isValid };
  }, [formState.data, validateField]);

  const setFieldValue = useCallback((name: keyof T, value: unknown) => {
    setFormState(prev => {
      const newData = { ...prev.data, [name]: value };
      const error = validateField(name, value);
      const newErrors = { ...prev.errors };
      
      if (error) {
        newErrors[name as string] = error;
      } else {
        delete newErrors[name as string];
      }

      return {
        ...prev,
        data: newData,
        errors: newErrors,
        touched: { ...prev.touched, [name]: true },
        isValid: Object.keys(newErrors).length === 0,
      };
    });
  }, [validateField]);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [name]: error },
      isValid: false,
    }));
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState(prev => ({ ...prev, isSubmitting }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState({
      data: initialData,
      errors: {},
      isSubmitting: false,
      isValid: true,
      touched: {},
    });
  }, [initialData]);

  const handleSubmit = useCallback(
    (onSubmit: (data: T) => Promise<void> | void) => 
      async (e: React.FormEvent) => {
        e.preventDefault();
        
        const { errors, isValid } = validateForm();
        
        if (!isValid) {
          setFormState(prev => ({ ...prev, errors, isValid }));
          return;
        }

        setSubmitting(true);
        
        try {
          await onSubmit(formState.data);
        } catch {
        } finally {
          setSubmitting(false);
        }
      },
    [formState.data, validateForm, setSubmitting]
  );

  return {
    ...formState,
    setFieldValue,
    setFieldError,
    setSubmitting,
    resetForm,
    handleSubmit,
    validateForm,
  };
}