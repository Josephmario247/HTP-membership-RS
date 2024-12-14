import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GrClose } from "react-icons/gr";
import toast from 'react-hot-toast'

const Add = () => {
    const [formData, setFormData] = useState({})
    const [showNextOfKinPopup, setShowNextOfKinPopup] = useState(false);
    const [nextOfKinError, setNextOfKinError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate()
  
    const handleChange = async (e) => {
        const { name, value, files } = e.target
        if (name === 'image') {
            setFormData((prevData) => ({ ...prevData, [name]: files[0]}))
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))

        }
    }
    // const {nextOfKin} = formData
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            if (key === 'nextOfKin') {
                Object.keys(formData[key]).forEach((nextOfKinKey) => {
                    formDataObj.append(`nextOfKin[${nextOfKinKey}]`, formData[key][nextOfKinKey]);
                });
            } else {
                formDataObj.append(key, formData[key]);
            }
            // formDataObj.append(key, formData[key])
        })
        
        // console.log(formData)
        setIsDisabled(formData.nextOfKin === '')

        try {
            const response = await axios.post(`${VITE_API_URL}/api/member/add`,formDataObj,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
             toast.success(response.data.message)
                // navigate("/admin-dashboard")

            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                toast.error(error.response.data.error)
            }
        }
    }
    // Toggle popup visibility
    const toggleNextOfKinPopup = () => setShowNextOfKinPopup(!showNextOfKinPopup);
    // Handle next of kin input changes
    const handleNextOfKinChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, nextOfKin: { ...prevData.nextOfKin, [name]: value}
        }));
    
    };
    // console.log(formData)
    const validateNextOfKin = () => {
        const { nextkinName, nextKinEmail, nextOfKinAddress,nextKinGender,nextKinRelation, nextKinPhone } = formData.nextOfKin;
        if (!nextkinName || !nextKinRelation || !nextKinPhone || !nextKinPhone || !nextKinEmail || !nextKinGender || !nextOfKinAddress) {
            setNextOfKinError('All Next of Kin fields are required.');
            setIsDisabled(true);
            return false;
        }
        setNextOfKinError('');
        setIsDisabled(false); // Enable the submit button if all Next of Kin fields are filled
        return true;
    };
    // Handle popup submission
    const handleNextOfKinSubmit = (e) => {
        e.preventDefault();
        if (validateNextOfKin()) {
            toggleNextOfKinPopup(); // Close the popup if validation passes
        }
    };
    return (
        <div className='max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md mt-20 mb-10'>
            <h2 className="text-2xl font-bold mb-6">Membership Registration Form</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full-Name  */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Full Name</label>
                        <input type="text" name='fullName' min={2} onChange={handleChange} placeholder='Enter full-Name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/* title */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Title</label>
                        <select name="title" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option>Select Title</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="Dr">Dr</option>
                            <option value="Engr">Engr</option>
                            <option value="Prof">Prof.</option>
                        </select>
                    </div>
                    
                    {/* Email */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Email</label>
                        <input type="email" name='email' onChange={handleChange} placeholder='Insert Email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>

                    {/* REG NO*/}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Reg No</label>
                        <input type="number" name='regNo' onChange={handleChange} placeholder='Registration No' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Date of Birth</label>
                        <input type="date" name='dob' onChange={handleChange} placeholder='DOB' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>

                    {/* Gender */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Gender</label>
                        <select name="gender" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            
                        </select>
                    </div>
                    {/*Resisdential Address*/}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Resisdential Address</label>
                        <input type="text" name='residential' onChange={handleChange} placeholder='Resisdential Address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Occupation*/}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Occupation</label>
                        <input type="text" name='occupation' onChange={handleChange} placeholder='Occupation' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Office Address*/}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Office Address</label>
                        <input type="text" name='officeAddress' onChange={handleChange} placeholder='Office Address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*State Origin*/}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>State Of Origin</label>
                        <select name="stateOrigin" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select State</option>
                            <option value="Abia">Abia</option>
                            <option value="Adamawa">Adamawa</option>
                            <option value="Akwa-Ibom">Akwa-Ibom</option>
                            <option value="Anambra">Anambra</option>
                            <option value="Bauchi">Bauchi</option>
                            <option value="Bayelsa">Bayelsa</option>
                            <option value="Benue">Benue</option>
                            <option value="Borno">Borno</option>
                            <option value="Cross-River">Cross-River</option>
                            <option value="Delta">Delta</option>
                            <option value="Ebonyi">Ebonyi</option>
                            <option value="Edo">Edo</option>
                            <option value="Ekiti">Ekiti</option>
                            <option value="Enugu">Enugu</option>
                            <option value="FCT">FCT</option>
                            <option value="Gombe">Gombe</option>
                            <option value="Imo">Imo</option>
                            <option value="Jigawa">Jigawa</option>
                            <option value="Kaduna">Kaduna</option>
                            <option value="Kano">Kano</option>
                            <option value="Katsina">Katsina</option>
                            <option value="Kebbi">Kebbi</option>
                            <option value="Kogi">Kogi</option>
                            <option value="Kwara">Kwara</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Nasarawa">Nasarawa</option>
                            <option value="Niger">Niger</option>
                            <option value="Ogun">Ogun</option>
                            <option value="Ondo">Ondo</option>
                            <option value="Osun">Osun</option>
                            <option value="Oyo">Oyo</option>
                            <option value="Plateau">Plateau</option>
                            <option value="Rivers">Rivers</option>
                            <option value="Sokoto">Sokoto</option>
                            <option value="Taraba">Taraba</option>
                            <option value="Yobe">Yobe</option>
                            <option value="Zamfara">Zamfara</option>
                            </select>
                    </div>

                    {/*Home Address*/}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Home Address</label>
                        <input type="text" name='homeAdd' onChange={handleChange} placeholder='Home Address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Telephone*/}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Telephone Number</label>
                        <input type="tel" name='phoneNo' onChange={handleChange} placeholder='Telephone' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Office Telephone*/}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Office Telephone Number</label>
                        <input type="tel" name='officePhoneNo' onChange={handleChange} placeholder='Office Telephone Number' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
                    </div>
                    {/* Marital Status */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Marital Status</label>
                        <select name="maritalStatus" onChange={handleChange} placeholder='Marital Status' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Widower">Widower</option>
                            <option value="divorced">Divorced</option>
                        </select>
                    </div>

                    {/* Home Parish */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Home Parish</label>
                        <input type='text' name="homeParish" onChange={handleChange} placeholder='Enter your home Parish' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/* Sacrament recieved */}
                    <div className="flex flex-col space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Sacrament Received?</label>
                        <div className="flex items-center space-x-4">
                            <label className="text-gray-700"><input type="checkbox" name="baptism" onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Baptism</label>
                            <label className="text-gray-700"><input type="checkbox" name="holyEucharist" onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Holy Eucharist</label>
                            <label className="text-gray-700"><input type="checkbox" name="confirmation" onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Confirmation</label>
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Passport Photo</label>
                        <input type='file' name="image" onChange={handleChange} placeholder='Upload your Passport' accept='images/' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    <button type="button" className='w-50 mt-6 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md' onClick={toggleNextOfKinPopup} >
                    Add Next of Kin
                </button>
                </div>
                <button type='submit' disabled={isDisabled} className='w-full mt-6 bg-[#974063] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md'>Submit Form</button>
            </form>
                 {/* Next of Kin Form */}
                 {showNextOfKinPopup && (
                    <div className="popup fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
                        <div  className="popup-inner bg-white p-10 rounded-md w-50 max-w-[300] ">
                            <h2 className="text-2xl font-bold mb-6">Next of Kin Details</h2>
                            <form onSubmit={handleNextOfKinSubmit} >
                            <button type="button" onClick={toggleNextOfKinPopup} className=' relative -top-[50px] left-full hover:text-slate-500 text-xl border-4 rounded-md hover:border-red-600 '><GrClose/></button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

                                    <label className='block text-sm font-medium text-gray-700'>
                                        Name
                                        <input type="text" name="nextkinName" placeholder='Insert Name' value={formData.nextOfKin?.nextkinName} onChange={handleNextOfKinChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                                    </label>
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Email</label>
                                        <input type="email" name='nextKinEmail' onChange={handleNextOfKinChange} placeholder='Insert Email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
                                    </div>
                                    {/*Resisdential Address*/}
                                    <div>
                                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Address</label>
                                        <input type="text" name='nextOfKinAddress' onChange={handleNextOfKinChange} placeholder=' Next Of Kin Address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                                    </div>
                                    {/* Gender */}
                                    <div>
                                        <label htmlFor="" className='block text-sm font-medium text-gray-700'>Gender</label>
                                        <select name="nextKinGender" onChange={handleNextOfKinChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                                            <option>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>

                                        </select>
                                    </div>

                                    <label className='block text-sm font-medium text-gray-700 grid-cols-2'>
                                        Relationship
                                        <input type="text" name="nextKinRelation" placeholder='relationship' value={formData.nextOfKin?.nextKinRelation} onChange={handleNextOfKinChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                                    </label>

                                    <label className='block text-sm font-medium text-gray-700'>
                                        Phone
                                        <input type="tel" name="nextKinPhone" placeholder='Enter Phone' value={formData.nextOfKin?.nextKinPhone} onChange={handleNextOfKinChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                                    </label>
                                    
                                    {nextOfKinError && <p className="error text-red-500 font-sm " >{nextOfKinError}</p>}
                                    <button type="submit" className='w-full mt-6 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md'>Save Next of Kin</button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                
        </div>
    )
}

export default Add