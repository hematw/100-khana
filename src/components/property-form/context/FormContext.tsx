import React, { createContext, useContext, ReactNode } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

interface FormContextType<T extends FieldValues> {
  form: UseFormReturn<T>;
}

const FormContext = createContext<FormContextType<any> | null>(null);

interface FormProviderProps<T extends FieldValues> {
  children: ReactNode;
  form: UseFormReturn<T>;
}

export function FormProvider<T extends FieldValues>({ children, form }: FormProviderProps<T>) {
  return (
    <FormContext.Provider value={{ form }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext<T extends FieldValues>() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context as FormContextType<T>;
}
