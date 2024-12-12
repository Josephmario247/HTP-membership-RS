import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, MemberButtons } from '../../utils/MembersHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import toast from 'react-hot-toast'


const List = () => {
  const [members, setMembers] = useState([])
  const [memberLoading, setMembLoading] = useState(false)
  const [filteredMember, setFilteredMember] = useState([])

  // Fetching members from database
  const onDeletMember = ()=> {
    fetchMembers()
  }
  const fetchMembers= async () => {
    setMembLoading(true)
    try {
      const response = await axios.get("http://localhost:5000/api/member", {
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
            dob: new Date(memb.dob).getFullYear(),
            regNo: memb.regNo,
            gender: memb.gender,
            maritalStatus:memb.maritalStatus,
            stateOrigin: memb.stateOrigin,
            image: <img width={40} className='rounded-full' src={`http://localhost:5000/${memb.image}`} alt=" member image" />,
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

  const handleFilter = (e) => {
    const records = members.filter((memb) => (
        memb.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredMember(records)
  }

  return (
    <div className='p-5 mt-20'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Members</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" placeholder='Search Member By Name' onChange={handleFilter} className='px-4 py-0.5 rounded hover:shadow-md border' />
          <Link to={'/admin-dashboard/register-member'} className='px-4 py-1 bg-teal-600 rounded hover:shadow-md text-white'> Add New Member</Link>
        </div>
        <div className='mt-6'>
            <DataTable columns={columns} data={filteredMember} pagination/>
        </div>
    </div>
  )
}

export default List