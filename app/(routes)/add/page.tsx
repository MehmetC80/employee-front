import EmployeeForm from '@/components/employee-form';

const AddPage = async () => {
  return (
    <div className='flex flex-col h-[calc(100vh-4rem)] items-center justify-center  w-full'>
      <EmployeeForm initialData={null} />
    </div>
  );
};

export default AddPage;
