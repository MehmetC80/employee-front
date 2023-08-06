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

import { useEffect, useState } from 'react';

import Link from 'next/link';
import deleteEmployeeById from '@/app/actions/deleteEmployeeById';
import { useRouter } from 'next/navigation';

interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
interface HomeTableProps {
  employeeData: Employee[];
}

const HomeTable = ({ employeeData }: HomeTableProps) => {
  const [data, setData] = useState<Employee[] | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setData(employeeData);
  }, [employeeData]);

  const handleDelete = (id: number) => {
    try {
      setLoading(true);
      deleteEmployeeById(id);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  return (
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
              <TableCell className='font-medium'>{item.firstname}</TableCell>
              <TableCell>{item.lastname}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-4'>
                  <Trash2
                    className='hover:text-red-700 duration-300'
                    onClick={() => handleDelete(item.id)}
                  />

                  <Link href={`/add/${item.id}`}>
                    <ClipboardEdit className='hover:text-blue-500 duration-300' />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
export default HomeTable;
