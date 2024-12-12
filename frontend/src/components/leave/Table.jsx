// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { columns, LeavesButtons } from '../../utils/LeavesHelper'
// import DataTable from 'react-data-table-component'

// const Table = () => {
//     const [leaves, setLeaves] = useState(null)
//     const [filteredLeaves, setFilteredLeaves] = useState(null)
//     const fetchLeaves = async () => {
//         try {
//             const response = await axios.get(`https://employee-ms-backend.vercel.app/api/leave`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             })
//             if (response.data.success) {
//                 let sno = 1;
//                 const data = await response.data.leaves.map((leave) => (
//                     {
//                         _id: leave._id,
//                         sno: sno++,
//                         employeeId: leave.employeeId?.employeeId,
//                         name: leave.employeeId?.userId.name,
//                         leaveType: leave.leaveType,
//                         department: leave.employeeId?.department.dep_name,
//                         days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
//                         status: leave.status,
//                         action: (<LeavesButtons Id={leave._id} />)

//                     }
//                 ))
//                 setLeaves(data)
//                 setFilteredLeaves(data)
//             }
//         } catch (error) {
//             console.log(error)
//             if (error.response && !error.response.data.success) {
//                 alert(error.response.data.error)
//             }
//         }
//     }
//     useEffect(() => {
//         fetchLeaves()
//     }, [])
//     const filterByInput = (e) => {
//         const data = leaves.filter((leave) => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
//         setFilteredLeaves(data)
//     }
//     const filterByButton = (status) => {
//         const data = leaves.filter((leave) => leave.status.toLowerCase().includes(status.toLowerCase()))
//         setFilteredLeaves(data)
//     }
   
//     return (
//         <>
//         {filteredLeaves ? (
//             <div className='p-6'>
//                 <div className='text-center'>
//                     <h3 className='text-2xl font-bold'>Manage Leaves</h3>
//                 </div>
//                 <div className='flex justify-between items-center'>
//                     <input type="text" placeholder='Search By employee Id'onChange={filterByInput} className='px-4 py-0.5 rounded hover:shadow-md border' />
//                     <div className='space-x-3 '>
//                         <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-md' onClick={() => filterByButton("Pending")}>Pending</button>
//                         <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-md' onClick={() => filterByButton("Approved")}>Approved</button>
//                         <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-md' onClick={() => filterByButton("Rejected")}>Rejected</button>
//                     </div>
//                 </div>
//                 <div className="mt-3">
//                 <DataTable columns={columns} data={filteredLeaves} pagination />
//                 </div>
//             </div>
//         ) : (<div> Loading...</div>)
//         }
        
//     </>
//     )
// }

// export default Table