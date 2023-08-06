import axios from 'axios';

interface Employee {
  firstname: string;
  lastname: string;
  email: string;
}

const API = process.env.NEXT_PUBLIC_EMPLOYEE_API || '';
export default async function updateEmployees(id: number, employee: Employee) {
  try {
    const emp: Employee = await axios.put(`${API}/${id}`, employee);

    if (!emp) {
      throw new Error('Fetching failed');
    }

    return emp;
  } catch (error: any) {
    throw new Error(error);
  }
}
