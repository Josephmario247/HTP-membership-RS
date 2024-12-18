import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GrClose } from "react-icons/gr";
import toast from 'react-hot-toast'
const VITE_API_URL = import.meta.env.VITE_API_URL


// Reusable input component
const FormInput = ({ label, name, type, value, onChange, options, required, min }) => {
    if (type === 'select') {
        return (
            <div>
                <label htmlFor={name} className='block text-sm font-medium text-gray-700'>{label}</label>
                <select name={name} onChange={onChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required={required}>
                    <option value="">Select {label}</option>
                    {options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            </div>
        )
    }
    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700'>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} min={min} placeholder={`Enter ${label}`} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required={required} />
        </div>
    )
}

// Personal Information Component
const PersonalInfo = ({ formData, handleChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="Full Name" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required />
        <FormInput label="Title" name="title" type="select" onChange={handleChange} options={['Mr', 'Mrs', 'Miss', 'Dr', 'Engr', 'Prof']} required />
        <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange}/>
        <FormInput label="Reg No" name="regNo" type="number" value={formData.regNo} onChange={handleChange} min={1} required />
        <FormInput label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
        <FormInput label="Gender" name="gender" type="select" onChange={handleChange} options={['male', 'female']} required />
    </div>
)

// Contact Information Component
const ContactInfo = ({ formData, handleChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="Residential Address" name="residential" type="text" value={formData.residential} onChange={handleChange} required />
        <FormInput label="Home Parish" name="homeParish" type="text" value={formData.homeParish} onChange={handleChange} required />
        <FormInput label="Home Address" name="homeAdd" type="text" value={formData.homeAdd} onChange={handleChange} required />
        <FormInput label="Telephone Number" name="phoneNo" type="tel" value={formData.phoneNo} onChange={handleChange} required />
        <FormInput label="Office Address" name="officeAddress" type="text" value={formData.officeAddress} onChange={handleChange} />
        <FormInput label="Office Telephone Number" name="officePhoneNo" type="tel" value={formData.officePhoneNo} onChange={handleChange} />
        <FormInput label="Catholic Community/Society" name="cathCommunity" type="text" value={formData.CathCommunity} onChange={handleChange} />
    </div>
)

// Additional Information Component
const AdditionalInfo = ({ formData, handleChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="Occupation" name="occupation" type="text" value={formData.occupation} onChange={handleChange} />
        <FormInput label="State Of Origin" name="stateOrigin" type="select" onChange={handleChange} options={["Abia", "Adamawa", "Akwa-Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross-River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kebbi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]} className="mt-10" required />
        <FormInput label="Marital Status" name="maritalStatus" type="select" onChange={handleChange} options={["single", "married", "widowed", "Widower", "divorced"]} required />
        <FormInput label="Passport" name="image" type="file" onChange={handleChange} />
    </div>
)
const Sacraments = ({ handleChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
        <div className="flex items-center space-x-1 md:space-x-2">

            <label className="text-gray-700"><input type="checkbox" name="baptism" onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Baptism</label>
            <label className="text-gray-700"><input type="checkbox" name="holyEucharist" onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Holy Eucharist</label>
            <label className="text-gray-700"><input type="checkbox" name="confirmation" onChange={handleChange} className="mr-1 border-gray-300 rounded" /> Confirmation</label>
        </div>
    </div>
)
const NextOfKin = ({ formData, handleChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="Full Name" name="fullName" type="text" value={formData?.nextOfKin.fullName} onChange={handleChange} required />
        <FormInput label="Email" name="email" type="email" value={formData?.nextOfKin?.email} onChange={handleChange} />
        <FormInput label="Telephone Number" name="phoneNo" type="tel" value={formData?.nextOfKin?.phoneNo} onChange={handleChange} required />
        <FormInput label="Relationship" name="relationship" type="text" value={formData?.nextOfKin?.relationship} onChange={handleChange} required />
        <FormInput label="Address" name="address" type="text" value={formData?.nextOfKin?.address} onChange={handleChange} required />
        <FormInput label="Gender" name="gender" type="select" onChange={handleChange} options={['male', 'female']} required />
    </div>
)

const Add2 = () => {
    const [formData, setFormData] = useState({
        personalInfo: {},
        contactInfo: {},
        additionalInfo: {},
        sacraments: {},
        nextOfKin: {}
    })
    // ... other state variables ...
    const [showNextOfKinPopup, setShowNextOfKinPopup] = useState(false);
    const [nextOfKinError, setNextOfKinError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }))
    }

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

        console.log(formData)
        setIsDisabled(formData.nextOfKin === "")

        try {
            const response = await axios.post(`${VITE_API_URL}/api/member/add`, formDataObj, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                toast.success(response.data.message, { id: 123 })
                navigate("/admin-dashboard/members");


            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                toast.error(error.response.data.error, { id: 123 })
            }
        }
    }

    // Toggle popup visibility
    const toggleNextOfKinPopup = () => setShowNextOfKinPopup(!showNextOfKinPopup);
    // Handle next of kin input changes
    const handleNextOfKinChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, nextOfKin: { ...prevData.nextOfKin, [name]: value } }));

    };
    // console.log(formData)
    const validateNextOfKin = () => {
        const { fullName, email, address, gender, relationship, phoneNo } = formData.nextOfKin;
        if (!fullName || !email || !address || !gender || !relationship || !phoneNo) {
            setNextOfKinError('All Next of Kin fields are required.');
            toast.error('All Next of Kin fields are required.', { id: 'All Next of Kin' })
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
    const handleSubmitClick = (e) => {
        if (isDisabled) {
            e.preventDefault()// Prevent form submission
            return toast.error("Please fill all required fields, including Next of Kin information.", { id: 'nextOfKin' });
        }
    };

    return (
        <div className='max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md mt-10 md:mt-20 mb-10'>
            <h2 className=" text-xl md:text-2xl font-bold mb-6 text-center ">Membership Registration Form</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h3 className="text-lg md:text-xl  font-semibold mb-4">Personal Information</h3>
                <PersonalInfo formData={formData} handleChange={handleChange} />

                <h3 className="text-lg md:text-xl font-semibold mb-4 mt-6">Contact Information</h3>
                <ContactInfo formData={formData} handleChange={handleChange} />

                <h3 className="text-lg md:text-xl  font-semibold mb-4 mt-6">Additional Information</h3>
                <AdditionalInfo formData={formData} handleChange={handleChange} />

                <h3 className="text-lg md:text-xl  font-semibold mb-4 mt-6"> Sacraments Received</h3>
                <Sacraments handleChange={handleChange} />
                <button type="button" className='w-40 mt-6 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md' onClick={toggleNextOfKinPopup} >
                    Add Next of Kin
                </button>
                {/* ... rest of your form ... */}
                <button type='submit' onClick={handleSubmitClick} className='w-full mt-6 bg-[#5e416a] hover:bg-[#382446] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md'>Submit Form</button>
            </form>
            {/* ... Next of Kin popup ... */}
            {/* Next of Kin Form */}
            {showNextOfKinPopup && (
                <div className="popup fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="popup-inner bg-white p-10 rounded-md w-50 max-w-[300]">
                        <h2 className="text-lg md:text-xl  font-bold">Next of Kin Details</h2>
                        <form onSubmit={handleNextOfKinSubmit} >
                            <button type="button" onClick={toggleNextOfKinPopup} className=' relative -top-[70px] left-full -right-20 hover:text-slate-500 text-xl border-4 rounded-md hover:border-red-500 '><GrClose /></button>
                                <NextOfKin handleChange={handleNextOfKinChange}/>
                                <button type="submit" className='w-36 bg-slate-500 hover:bg-slate-700 text-white mt-2 font-bold p-2 rounded-md'>Save Next of Kin</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Add2