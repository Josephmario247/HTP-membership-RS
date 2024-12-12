import React, { useEffect, useState } from 'react'
import {FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import SummaryCard from './SummaryCard'
import  axios from 'axios';
import toast from 'react-hot-toast';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)
  useEffect(()=> {
    const fetchSummary = async() => {
      try {
        const summary = await axios.get("http://localhost:5000/api/dashboard/summary",{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        })
        setSummary(summary.data)
      } catch (error) {
        if(error.response){
          toast.error(error.response.data.error)
          console.log(error.message)
        }
      }
    }
    fetchSummary()
  },[])
  if (!summary ) {
    return (
      //Loading Indicators:
      <div class="flex items-center justify-center h-screen bg-gray-100">
          <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
  )
  }
  return (
    <div className='p-6 mt-20'>
        <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            <SummaryCard icons={<FaUsers/>} text={"Total Members"} number={summary?.totalMembers} color="bg-teal-600"/> 
            <SummaryCard icons={<FaBuilding/>} text={"Total Users"} number={summary?.totalUsers} color="bg-yellow-600"/> 
            <SummaryCard icons={<FaMoneyBillWave/>} text={"Total Amc/Annual"}  number={`₦ ${summary?.totalSalary||0}`} color="bg-red-600"/> 

        </div>

        <div className='mt-12'>
            <h4 className="text-center text-2xl font-bold">Sacrament Details</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SummaryCard icons={<FaUsers/>} text={"Total Baptism registered "} number={summary?.leaveSummary?.appliedForLeave||0} color="bg-teal-600"/> 
            <SummaryCard icons={<FaUsers/>} text={"Total First-Communion registered"} number={summary?.leaveSummary?.approved||0} color="bg-green-600"/> 
            <SummaryCard icons={<FaUsers/>} text={"Total Confirmation registered "} number={summary?.leaveSummary?.pending||0} color="bg-yellow-600"/> 
            <SummaryCard icons={<FaTimesCircle/>} text={"Total Marriage registered"} number={summary?.leaveSummary?.rejected||0} color="bg-red-600"/> 

            </div>

        </div>
    </div>
  )
} 

export default AdminSummary