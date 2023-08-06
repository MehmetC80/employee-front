'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useParams, useRouter } from 'next/navigation';
import addEmployees from '@/app/actions/addEmployee';
import { useState } from 'react';
import updateEmployees from '@/app/actions/updateEmployee';

const formSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: 'Vorname muss aus mindestends 2 Buchstaben bestehen.' })
    .max(30, {
      message: 'Vorname muss darf nicht mehr als 30 Buchstaben haben.',
    }),
  lastname: z
    .string()
    .min(2, { message: 'Nachname muss aus mindestends 2 Buchstaben bestehen.' })
    .max(30, {
      message: 'Nachname muss darf nicht mehr als 30 Buchstaben haben.',
    }),
  email: z.string().email({ message: 'Dies ist keine gültige Email.' }),
});

interface Employee {
  firstname: string;
  lastname: string;
  email: string;
}
type EmployeeFormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
  initialData: Employee | null;
}

const EmployeeForm = ({ initialData }: EmployeeFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData
    ? 'Angestellten Bearbeiten'
    : 'Angestellten hinzufügen';

  const action = initialData ? 'Speichern' : 'Erstellen';

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      firstname: '',
      lastname: '',
      email: '',
    },
  });

  const onSubmit = async (data: EmployeeFormValues) => {
    const id: string = params.employeeId as any;
    console.log(id);
    console.log(data);
    try {
      setIsLoading(true);
      if (initialData) {
        await updateEmployees(id, data);
      } else {
        await addEmployees(data);
      }

      router.push('/');
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className='flex flex-col gap-16 items-center justify-center  w-full'>
      <h1 className='text-bold text-2xl'>{title}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full px-4 sm:w-8/12 md:w-6/12 lg:w-4/12'
        >
          <FormField
            control={form.control}
            name='firstname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vorname</FormLabel>
                <FormControl>
                  <Input placeholder='Vorname' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nachname</FormLabel>
                <FormControl>
                  <Input placeholder='Nachname' {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between w-full'>
            <Button disabled={isLoading} type='submit' className='min-w-[30%]'>
              {action}
            </Button>
            <Button
              disabled={isLoading}
              type='reset'
              className='min-w-[30%]'
              onClick={() => form.reset()}
              variant={'destructive'}
            >
              Abbrechen
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeForm;
