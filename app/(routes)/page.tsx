import HomeTable from '@/components/home-table';
import getAllEmployees from '../actions/getAllEmployees';

const API = process.env.NEXT_PUBLIC_EMPLOYEE_API || '';
export default async function Home() {
  const employeeData = await getAllEmployees();

  return (
    <main className='flex flex-col items-center justify-center bg-slate-50 text-slate-950 h-[calc(100vh-4rem)]'>
      <h1 className='text-2xl font-semibold'>Angestellten Verwaltung</h1>
      <div className='text-slate-950 w-full sm:w-9/12 md:w-8/12 lg:w-6/12 mt-16'>
        <HomeTable employeeData={employeeData} />
      </div>
    </main>
  );
}
