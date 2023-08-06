import getEmployeeById from '@/app/actions/getEmployeeById';
import EmployeeForm from '@/components/employee-form';

const UpdatePage = async ({ params }: { params: { employeeId: number } }) => {
  const employee = await getEmployeeById(params.employeeId);

  return (
    <div className='flex flex-col h-[calc(100vh-4rem)] items-center justify-center  w-full'>
      <EmployeeForm initialData={employee} />
    </div>
  );
};

export default UpdatePage;
