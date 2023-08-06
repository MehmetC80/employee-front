import axios from 'axios';

const API = process.env.NEXT_PUBLIC_EMPLOYEE_API || '';
export default async function getEmployeeById(id: string) {
  try {
    const employee = await axios.get(API + '/' + id);

    return employee.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
