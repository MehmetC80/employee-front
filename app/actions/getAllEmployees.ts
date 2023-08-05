import axios from 'axios';

const API = process.env.NEXT_PUBLIC_EMPLOYEE_API || '';
export default async function getAllEmployees() {
  try {
    const employees = await axios.get(API);

    if (!employees) {
      throw new Error('Fetching failed');
    }

    return employees.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
