import React, { useEffect, useState } from 'react'
// import { fetchDepartments } from '../../utils/MembersHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
const VITE_API_URL = import.meta.env.VITE_API_URL

const Edit = () => {
    const [member, setMember] = useState({
        fullName: '',
        title: '',
        maritalStatus: '',
        occupation: '',
        phoneNo:"",
        regNo:"",
        residential: '',
        baptism:"",
        holyEucharist:"",
        confirmation:"",
        image: '',
        gender: '',
        stateOrigin: '',
        cathCommunity: '',
        email: '',
        nextOfKin:{
            fullName: '',
            email: '',
            address: '',
            gender: '',
            relationship: '',
            phoneNo:""
        }
    })
    const navigate = useNavigate()
    const { id } = useParams()
    //fetching member by id from the database
    const fetchMember = async () => {
        try {
            const response = await axios.get(`${VITE_API_URL}/api/member/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                const member = response.data.member
                setMember((prev) => ({ ...prev, fullName: member.fullName, title: member.title, maritalStatus: member.maritalStatus, occupation: member.occupation, phoneNo: member.phoneNo, regNo:member.regNo, residential: member.residential, baptism:member.baptism,holyEucharist: member.holyEucharist, confirmation: member.confirmation, image:member.image, gender:member.gender,stateOrigin:member.stateOrigin, cathCommunity:member.cathCommunity, email:member.email,
                    nextOfKin: member.nextOfKin
                }))
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                toast.error(error.response.data.error)
            }
        }
    }
 
    useEffect(() => {
        fetchMember();
        
    }, [])

    const handleChange = async (e) => {
        // const { name, value } = e.target
        // setMember((prevData) => ({ ...prevData, [name]: value}))
        //  
        const { name, value, type, checked, files } = e.target
        setMember(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }))
         
    }
    // Handle next of kin input changes
    const handleNextOfKinChange = (e) => {
        const { name, value } = e.target;
        setMember((prevData) => ({ ...prevData, nextOfKin: { ...prevData.nextOfKin, [name]: value } }));

    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        console.log(member)
        try {
            
            const response = await axios.put(`${VITE_API_URL}/api/member/${id}`, member, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                toast.success(`${response.data.message}`,{id:123})
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
                <h2 className="text-lg md:text-2xl font-bold mb-6 text-center">Member Modification form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/*Name  */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Name</label>
                            <input type="text" name='name' value={member?.fullName} onChange={handleChange} placeholder='Enter Name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
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
                        {/*Gender  */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Gender</label>
                            <input type="text" name='gender' value={member?.gender} onChange={handleChange} placeholder='Enter Gender' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        {/*email address  */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Email</label>
                            <input type="text" name='email' value={member?.email} onChange={handleChange} placeholder='email address ' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'  />
                        </div>
                        {/* Marital Status */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Marital Status</label>
                            <select name="maritalStatus" value={member?.maritalStatus} onChange={handleChange} placeholder='Marital Status' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                                <option value="Widower">Widower</option>
                            </select>
                        </div>

                        {/* Occupation */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Occupation</label>
                            <input type='text' name="occupation" value={member?.occupation} onChange={handleChange} placeholder='Occupation' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                        </div>


                        {/* Registration */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Registration Number</label>
                            <input type='number' name="regNo" value={member?.regNo} onChange={handleChange} placeholder='reg-No' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        {/* Phone */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Phone Number</label>
                            <input type='number' name="phoneNo" value={member?.phoneNo} onChange={handleChange} placeholder='Enter phoneNo' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        {/* residential address */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Residential Address</label>
                            <input type='text' name="residential" value={member?.residential} onChange={handleChange} placeholder='Resdential Address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        {/* stateOrigin */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>State Origin</label>
                            <input type='text' name="stateOrigin" value={member?.stateOrigin} onChange={handleChange} placeholder='state Origin' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        {/* catholic community */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Community/Societies</label>
                            <input type='text' name="cathCommunity" value={member?.cathCommunity} onChange={handleChange} placeholder='Community/Societies' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                        </div>
                        {/* sacrament recieved */}
                        <div className="flex flex-col space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Sacrament Received?</label>
                        <div className="flex items-center space-x-4">
                            <label className="text-gray-700"><input type="checkbox" name="baptism" onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Baptism</label>
                            <label className="text-gray-700"><input type="checkbox" name="holyEucharist"  onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Holy Eucharist</label>
                            <label className="text-gray-700"><input type="checkbox" name="confirmation"  onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Confirmation</label>
                        </div>
                    </div>
                    {/* Image */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Passport Photo</label>
                        <input type='file' name="image" onChange={handleChange} placeholder='Upload your Passport' accept='images/' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
                    </div>
                    </div>
                        <h3 className="text-lg md:text-xl font-medium mb-6 text-center m-5 underline">Update Next of Kins Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Next Of Kin */}
                        <div >
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Name</label>
                            <input type='text' name="fullName" value={member?.nextOfKin?.fullName} onChange={handleNextOfKinChange} placeholder='fullName' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>

                        {/* nextOfKin email*/}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Email</label>
                            <input type='text' name="email" value={member?.nextOfKin?.email} onChange={handleNextOfKinChange} placeholder='email address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'  />
                        </div>
                        {/* nextOfKin address*/}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Address</label>
                            <input type='text' name="address" value={member?.nextOfKin?.address} onChange={handleNextOfKinChange} placeholder='address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        {/* nextOfKin relationship*/}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Relationship</label>
                            <input type='text' name="relationship" value={member?.nextOfKin?.relationship} onChange={handleNextOfKinChange} placeholder='relationship' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        {/* nextOfkin phone*/}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Phone Number</label>
                            <input type='number' name="phoneNo" value={member?.nextOfKin?.phoneNo} onChange={handleNextOfKinChange} placeholder='phoneNo' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                        </div>
                        {/*Gender  */}
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Gender</label>
                            <input type="text" name='gender' value={member?.nextOfKin?.gender} onChange={handleNextOfKinChange} placeholder='Enter Gender' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                        </div>
                        </div>
                    <button type='submit' className='w-full mt-6 mb-10 bg-[#41436A] hover:bg-[#2a2b44] text-white font-bold py-2 px-4 rounded-md'>Update Member</button>
                </form>
            </div>
        ) : toast.loading("Please wait...")}</>
    )
}

export default Edit