'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Trash2 } from 'lucide-react';
import { ClipboardEdit } from 'lucide-react';

import getAllEmployees from '../actions/getAllEmployees';
import deleteEmployeeById from '../actions/deleteEmployeeById';
import { useEffect, useState } from 'react';

interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export default function Home() {
  const [data, setData] = useState<Employee[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getAllEmployees();

      setData(response);
    })();
  });

  return (
    <main className='flex flex-col items-center justify-center bg-slate-50 text-slate-950 h-[calc(100vh-4rem)]'>
      <h1 className='text-2xl font-semibold'>Angestellten Verwaltung</h1>
      <div className='text-slate-950 w-full sm:w-9/12 md:w-8/12 lg:w-6/12 mt-16'>
        <Table>
          <TableCaption>Angestellten Verwaltung</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Vorname</TableHead>
              <TableHead>Nachname</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className='text-right'>Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='font-medium'>
                    {item.firstname}
                  </TableCell>
                  <TableCell>{item.lastname}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-4'>
                      <Trash2
                        className='hover:text-red-700 duration-300'
                        onClick={() => deleteEmployeeById(item.id)}
                      />

                      <ClipboardEdit className='hover:text-blue-500 duration-300' />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
