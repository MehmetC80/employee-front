import axios from 'axios';

interface Employee {
  firstname: string;
  lastname: string;
  email: string;
}

const API = process.env.NEXT_PUBLIC_EMPLOYEE_API || '';
export default async function deleteEmployeeById(id: string) {
  try {
    const emp = await axios.delete(API + '/' + id);

    if (!emp) {
      throw new Error('delete failed');
    }

    return emp;
  } catch (error: any) {
    throw new Error(error);
  }
}
