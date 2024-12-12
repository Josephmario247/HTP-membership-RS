// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'

// const ViewSalary = () => {
//     const [salaries, setSalaries] = useState(null)
//     const [filteredSalaries, setfilteredSalaries] = useState(null)
//     const { id } = useParams();
//     let Sno = 1;
//     const {user} = useAuth()
//     const fetchSalaries = async () => {
//         try {
//             const response = await axios.get(`https://employee-ms-backend.vercel.app/api/salary/${id}/${user.role}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             })
//             console.log(response.data)
//             if (response.data.success) {
//                 setSalaries(response.data.salary)
//                 setfilteredSalaries(response.data.salary)
//             }
//         } catch (error) {
//             if (error.response && !error.response.data.success) {
//                 alert(error.response.data.error)
//             }
//         }
//     }
//     useEffect(() => {
//         fetchSalaries()
//     }, [])
//     const filterSalaries = (q) => {
//         const filteredRecords = salaries.filter(leave => leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase()))
//         setfilteredSalaries(filteredRecords)
//     }
//     return (
//         <>{filteredSalaries === null ? (<div>Loading...</div>) : (
//             <div className='overflow-x-auto p-5'>
//                 <div className='text-center'>
//                     <h2 className='text-2xl font-bold'>Salary History</h2>
//                 </div>
//                 <div className="flex justify-end my-3">
//                     <input type="text" className="border px-2 rounded-md py-0 5 border-gray-300" placeholder='Search By Emp ID'  onChange={filterSalaries}/>
//                 </div>
//                 {
//                     filteredSalaries.length > 0 ? (
//                         <table className='w-full text-sm text-left text-gray-500'>
//                             <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200 '>
//                                 <tr>
                                    
//                                     <th className='px-6 py-3'>SNo</th>
//                                     <th className='px-6 py-3'>Employee ID</th>
//                                     <th className='px-6 py-3'>Salary</th>
//                                     <th className='px-6 py-3'>Allowances</th>
//                                     <th className='px-6 py-3'>Deductions</th>
//                                     <th className='px-6 py-3'>Total</th>
//                                     <th className='px-6 py-3'>Pay Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     filteredSalaries.map((salary) =>(
//                                         <tr key={salary._id} className='bg-white border-b dark:bg-gray-800 text-white dark:border-gray-700'>
                                            
//                                             <td className='px-6 py-3'>{Sno++}</td>
//                                             <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
//                                             <td className='px-6 py-3'>{salary.basicSalary}</td>
//                                             <td className='px-6 py-3'>{salary.allowances}</td>
//                                             <td className='px-6 py-3'>{salary.deductions}</td>
//                                             <td className='px-6 py-3'>{salary.netSalary}</td>
//                                             <td className='px-6 py-3'>{ new Date(salary.payDate).toLocaleDateString()}</td>
//                                         </tr>
//                                     ))
//                                 }
//                             </tbody>
//                         </table>
//                     ): (<div>No records </div>)
//                 }

//             </div>
//         )}</>
//     )
// }

// export default ViewSalary