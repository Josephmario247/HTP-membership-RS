import React, { useEffect, useState } from 'react'
// import { fetchDepartments } from '../../utils/MembersHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const Edit = () => {
    const [member, setMember] = useState({
        name: '',
        title: '',
        maritalStatus: '',
        occupation: '',
        phoneNo: '',
        regNo:'',
        residential: '',
        baptism: '',
        holyEucharist: '',
        confirmation: '',
        image: '',
    })
    // const [departments, setDepartments] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
 
    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/member/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    const member = response.data.member
                    setMember((prev) => ({ ...prev, name: member.fullName, title: member.title, maritalStatus: member.maritalStatus, occupation: member.occupation, phoneNo: member.phoneNo, regNo:member.regNo, residential: member.residential, baptism:member.baptism,holyEucharist: member.holyEucharist, confirmation: member.confirmation, image:member.image }))
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    toast.error(error.response.data.error)
                }
            }
        }
        fetchMember();
        // const getAllDepartments = async () => {
        //     const departments = await fetchDepartments()
        //     setDepartments(departments)
        // }
        // getAllDepartments();
    }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target
        setMember((prevData) => ({ ...prevData, [name]: value }))   
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.put(`http://localhost:5000/api/member/${id}`, member, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                toast.success('Member edited Successfully',{id:123})
                navigate("/admin-dashboard/members")

            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                toast.error(error.response.data.error,{id:123})
            }
        }
    }
    return (
        <>{ member ? (
            <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className="text-2xl font-bold mb-6">Member Modification form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/*Name  */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Name</label>
                            <input type="text" name='name' value={member.name} onChange={handleChange} placeholder='Enter Name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>

                        {/* Title */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Title</label>
                            <select name="title" value={member.title} onChange={handleChange} placeholder='Marital Status' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                                <option value="">Select title</option>
                                <option value="mr">Mr</option>
                                <option value="mrs">Mrs</option>
                                <option value="miss">Miss</option>
                            </select>
                        </div>
                        {/* Marital Status */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Marital Status</label>
                            <select name="maritalStatus" value={member.maritalStatus} onChange={handleChange} placeholder='Marital Status' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div>

                        {/* Occupation */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Occupation</label>
                            <input type='text' name="occupation" value={member.occupation} onChange={handleChange} placeholder='Occupation' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>


                        {/* Registration */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Registration Number</label>
                            <input type='number' name="regNo" value={member.regNo} onChange={handleChange} placeholder='reg-No' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        {/* Phone */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Phone Number</label>
                            <input type='number' name="phoneNo" value={member.phoneNo} onChange={handleChange} placeholder='Enter phoneNo' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Residential Address</label>
                            <input type='text' name="residential" value={member.residential} onChange={handleChange} placeholder='Resdential Address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        {/* sacrament recieved */}
                        <div className="flex flex-col space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Sacrament Received?</label>
                        <div className="flex items-center space-x-4">
                            <label className="text-gray-700"><input type="checkbox" name="baptism" value={member.baptism} onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Baptism</label>
                            <label className="text-gray-700"><input type="checkbox" name="holyEucharist" value={member.holyEucharist} onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Holy Eucharist</label>
                            <label className="text-gray-700"><input type="checkbox" name="confirmation" value={member.confirmation} onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Confirmation</label>
                        </div>
                    </div>
                    {/* Image */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Passport Photo</label>
                        <input type='file' name="image" onChange={handleChange} placeholder='Upload your Passport' accept='images/' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
                    </div>

                        {/* Department */}
                        {/* <div className='col-span-2'>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Department</label>
                            <select name="department" value={employee.department} onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option value={dep._id} key={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div> */}

                    </div>
                    <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'>Update Member</button>
                </form>
            </div>
        ) : toast.loading("Please wait...")}</>
    )
}

export default Edit