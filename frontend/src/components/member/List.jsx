import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, MemberButtons } from '../../utils/MembersHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import toast from 'react-hot-toast'
const VITE_API_URL = import.meta.env.VITE_API_URL


const List = () => {
  const [members, setMembers] = useState([])
  const [memberLoading, setMembLoading] = useState(false)
  const [filteredMember, setFilteredMember] = useState("")

  // Fetching members from database
  const onDeletMember = ()=> {
    fetchMembers()
  }
  const fetchMembers=  async () => {
    setMembLoading(true)
    try {
      const response = await axios.get(`${VITE_API_URL}/api/member`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.members.map((memb) => (
          {
            _id: memb._id,
            sno: sno++,
            // nextofkin_name: memb.nextofkin.nextofkin_name,
            name: memb.fullName,
            dob: new Date(memb?.dob).getFullYear(),
            regNo: memb.regNo,
            gender: memb.gender,
            maritalStatus:memb.maritalStatus,
            stateOrigin: memb.stateOrigin,
            image: <img width={40} className='rounded-full' src={`${VITE_API_URL}/${memb?.image}`} alt="img" />,
            action: (<MemberButtons id={memb._id} onDeletMember={onDeletMember}/>)

          }
        ))
        setMembers(data)
        setFilteredMember(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error,{id:123})
      }
    } finally {
      setMembLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers();
  }, [])

  // const handleFilter = (e) => {
  //   const records = members.filter((memb) => (
  //       memb.name.toLowerCase().includes(e.target.value.toLowerCase())
  //   ))
  //   setFilteredMember(records)
  // }
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      setFilteredMember(members);
      return;
    }
  
    const filteredRecords = members.filter((member) => {
      // Define the fields to search
      const searchFields = ['name', 'regNo', 'stateOrigin', 'gender', 'maritalStatus'];
      
      // Check if any of the fields include the search term
      return searchFields.some(field => {
        const fieldValue = member[field];
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchTerm);
        }
        if (typeof fieldValue === 'number') {
          return fieldValue.toString().includes(searchTerm);
        }
        return false;
      });
    });
  
    setFilteredMember(filteredRecords);
  };

  return (
    <div className='md:p-5 p-2 mt-10 md:mt-20'>

        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Members</h3>
        </div>

       
        <label htmlFor="" className='block text-lg font-medium text-gray-700'>Search</label>
        <div className='flex justify-between items-center'>
          <input type="text" placeholder='Search by Name/regNo' onChange={handleFilter} className='px-4 py-0.5 rounded hover:shadow-md border border-gray-700' />
          <Link to={'/admin-dashboard/register-member'} className='px-3 py-1 bg-[#41436A] hover:bg-[#2a2b44] cursor-pointer rounded hover:shadow-md text-white'> Add New Member</Link>
        </div>
        {memberLoading?
       ( <div className='mt-5'>
            <div class="flex justify-center h-screen bg-gray-100 mt-0">
               <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
        </div>):
        (<div className='mt-3 md:mt-6'>
            <DataTable columns={columns} data={filteredMember}  pagination/>
        </div>)}

    </div>
  )
}

export default List


//tabnine generated component
// import React, { useEffect, useState, useCallback, useMemo } from 'react'
// import { Link } from 'react-router-dom'
// import { columns, MemberButtons } from '../../utils/MembersHelper'
// import DataTable from 'react-data-table-component'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// const VITE_API_URL = import.meta.env.VITE_API_URL

// const List = () => {
//   const [members, setMembers] = useState([])
//   const [memberLoading, setMemberLoading] = useState(false)
//   const [filteredMember, setFilteredMember] = useState([])
//   const [lastFetchTime, setLastFetchTime] = useState(0)

//   // Memoize the fetchMembers function
//   const fetchMembers = useCallback(async (force = false) => {
//     const now = Date.now()
//     if (!force && now - lastFetchTime < 60000) { // 1 minute cooldown
//       return // Don't fetch if it's been less than a minute since last fetch
//     }

//     setMemberLoading(true)
//     try {
//       const response = await axios.get(`${VITE_API_URL}/api/member`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       })
//       if (response.data.success) {
//         const data = response.data.members.map((memb, index) => ({
//           _id: memb._id,
//           sno: index + 1,
//           name: memb.fullName,
//           dob: new Date(memb?.dob).getFullYear(),
//           regNo: memb.regNo,
//           gender: memb.gender,
//           maritalStatus: memb.maritalStatus,
//           stateOrigin: memb.stateOrigin,
//           image: <img width={40} className='rounded-full' src={`${VITE_API_URL}/${memb?.image}`} alt="img" />,
//           action: (<MemberButtons id={memb._id} onDeleteMember={() => fetchMembers(true)}/>)
//         }))
//         setMembers(data)
//         setFilteredMember(data)
//         setLastFetchTime(now)
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.success) {
//         toast.error(error.response.data.error, {id: 'fetch-error'})
//       }
//     } finally {
//       setMemberLoading(false)
//     }
//   }, [lastFetchTime])

//   useEffect(() => {
//     fetchMembers()
//   }, [fetchMembers])

//   // Memoize the handleFilter function
//   const handleFilter = useCallback((e) => {
//     const searchTerm = e.target.value.toLowerCase().trim()
    
//     if (searchTerm === '') {
//       setFilteredMember(members)
//       return
//     }
  
//     const filteredRecords = members.filter((member) => {
//       const searchFields = ['name', 'regNo', 'stateOrigin', 'gender', 'maritalStatus']
//       return searchFields.some(field => {
//         const fieldValue = member[field]
//         return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(searchTerm)
//           || typeof fieldValue === 'number' && fieldValue.toString().includes(searchTerm)
//       })
//     })
  
//     setFilteredMember(filteredRecords)
//   }, [members])

//   // Memoize the columns
//   const memoizedColumns = useMemo(() => columns, [])

//   return (
//     <div className='md:p-5 p-2 mt-10 md:mt-20'>
//       {/* ... rest of your component ... */}
//       <div className='mt-3 md:mt-6'>
//         <DataTable 
//           columns={memoizedColumns} 
//           data={filteredMember}  
//           pagination
//           progressPending={memberLoading}
//           progressComponent={<div className="flex justify-center h-screen bg-gray-100 mt-0">
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>}
//         />
//       </div>
//     </div>
//   )
// }

// export default React.memo(List)