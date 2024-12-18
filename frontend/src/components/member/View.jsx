import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";
import { FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import images from '../../assets/images.jpeg';
const VITE_API_URL = import.meta.env.VITE_API_URL
const View = () => {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    // const printableRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`${VITE_API_URL}/api/member/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    setMember(response.data.member);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    toast.error(error.response.data.error);
                }
            }
        };
        fetchMember();
    }, []);

    // const handlePrint = () => {
    //     const printContent = printableRef.current;
    //     const windowPrint = window.open(
    //         "",
    //         "",
    //         "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    //     );
    //     windowPrint.document.write(printContent.innerHTML);
    //     windowPrint.document.write(
    //         "<style>@media print { body { font-size: 12pt; }}</style>"
    //     );
    //     windowPrint.document.close();
    //     windowPrint.focus();
    //     windowPrint.print();
    //     windowPrint.close();
    // };

    const handlePrint = (contentRef) => {
        const printContent = contentRef.current;
        const windowPrint = window.open(
            "",
            "",
            "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
        );
        windowPrint.document.write('<html><head><title>Print</title>');
        windowPrint.document.write('<style>');
        windowPrint.document.write(`
            @media print {
                body { font-size: 12pt; }
                .no-print { display: none; }
            }
        `);
        windowPrint.document.write('</style></head><body>');
        windowPrint.document.write(printContent.innerHTML);
        windowPrint.document.write('</body></html>');
        windowPrint.document.close();
        windowPrint.focus();
        windowPrint.print();
        windowPrint.close();
    };
    return (
        <>

            <div className="m-2 mt-10 hidden md:block fixed">
                <button
                    onClick={() => handlePrint(cardRef)}
                    className="bg-slate-400 hover:bg-slate-700 text-center p-2 text-white font-medium rounded mt-4"
                >
                    Print Card
                </button>
            </div>

            {member? (
                <div
                    ref={cardRef}
                    className="md:max-w-2xl mx-auto mt-5 text-sm md:mt-20 bg-[#fdfbcb] p-10 rounded-md shadow-md mb-20"
                >
                    <div className="flex items-center mb-10">
                        <img src={images} alt="HT-img"className=" rounded-md border-2 w-16 h-16" />
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-[#004d85] font-bold text-sm md:text-2xl">CATHOLIC ARCHDIOCESE OF ABUJA</p>
                            <p className="text-[#ed1b09] font-bold text-sm md:text-xl">HOLY TRINITY PARISH, MAITAMA </p>
                            <p className="text-[#2b291d] font-medium ml-20 text-sm leading-3 md:text-sm">Plot 3795, Aguiyi Ironsi Street, Maitama-Abuja. Box 8244, Wuse GPO </p>
                        </div>

                    </div>
                    <h2 className="text-lg font-bold text-center underline">Member Details</h2>
                    <div className="text-gray-400 text-sm">Date Registered:{new Date(member?.createdAt).toLocaleDateString()}</div>
                    <hr className="border border-slate-500 mt-3" />
                    <div className="flex items-center gap-6 m-6">
                        <div>
                            <img
                                className="rounded-md border-2 w-10 h-10 md:w-20 md:h-20 border-[#41436a]"
                                src={`${VITE_API_URL}/${member?.image}`}
                                alt="member img"
                            />
                        </div>

                        <div className="flex flex-col gap-1 ml-6 text-lg font-medium">
                            <p className="font-sans font-bold text-sm">
                                {(member?.title)}
                            </p>
                            <p className="font-sans font-bold text-sm leading-3">{member?.fullName}</p>
                            <p className="text-sm text-gray-500 font-medium">
                                Registration Number: <span className="text-sm text-[#974063]"> {member?.regNo}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 m-5 gap-2">
                        <div className="flex flex-col placeholder:mb-3">
                            <p className="text-sm font-bold">Marital Status</p>
                            <p className="font-serif">{member?.maritalStatus}</p>
                        </div>
                        <div className="flex  flex-col mb-3">
                            <p className="text-sm font-bold">Gender:</p>
                            <p className="font-serif">{member?.gender}</p>
                        </div>

                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-bold">Date of Birth:</p>
                            <p className="font-sans">
                                {new Date(member?.dob).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-semibold">Email:</p>
                            <p className="font-serif">{member?.email}</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-semibold">Phone No:</p>
                            <p className="font-sans">{member?.phoneNo}</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-bold">State Of Origin:</p>
                            <p className="font-serif">{member?.stateOrigin}</p>
                        </div>

                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-bold">Occupation:</p>
                            <p className="font-serif">{member?.occupation}</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-bold">Office Phone:</p>
                            <p className="font-sans">{member?.officePhoneNo}</p>
                        </div>

                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-bold">Address:</p>
                            <p className="font-serif leading-4">{member?.residential}</p>
                        </div>

                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-bold">Home Parish:</p>
                            <p className="font-serif leading-4">{member?.homeParish}</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-bold">Home Address:</p>
                            <p className="font-serif leading-4">{member?.homeAdd}</p>
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-bold">Sacrament:</p>
                            <div className="flex-col leading-4">
                                <p className="font-medium text-[#ca35eb] flex gap-2 items-center">

                                    Baptism:
                                    {member?.baptism !== true ? <FaXmark className="text-red-500" /> : <ImCheckmark className="text-green-500" />}
                                </p>
                                <p className="font-medium text-[#ab2a64] flex gap-2 items-center">

                                    Holy Eucharist:
                                    {member?.holyEucharist !== true ? (
                                        <FaXmark className="text-red-500" />
                                    ) : (
                                        <ImCheckmark className="text-green-500" />
                                    )}
                                </p>
                                <p className="font-medium text-[#3c87f0] flex gap-2 items-center">

                                    Confirmation:
                                    {member?.confirmation !== true ? (
                                        <FaXmark className="text-red-500" />
                                    ) : (
                                        <ImCheckmark className="text-green-500" />
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="text-sm font-bold">Community/Societies:</p>
                            <p className="font-serif leading-4">{member?.cathCommunity || "None"}</p>
                        </div>
                    </div>
                    <hr className="border border-slate-500" />
                    <p className="text-lg font-bold text-center m-5 underline">
                        Next of Kin Details
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 font-sans">
                        <p className="flex flex-col text-sm">

                            <span className="font-bold">Name:</span> {member?.nextOfKin?.fullName}
                        </p>
                        <p className="flex flex-col text-sm">

                            <span className="font-bold">Gender:</span>
                            {member?.nextOfKin?.gender}
                        </p>
                        <p className="flex flex-col text-sm">

                            <span className="font-bold">Relationship:</span>
                            {member?.nextOfKin?.relationship}
                        </p>
                        <p className="flex flex-col text-sm">

                            <span className="font-bold">Phone No:</span>
                            {member?.nextOfKin?.phoneNo}
                        </p>
                        <p className="flex flex-col text-sm">

                            <span className="font-bold">Email:</span>
                            {member?.nextOfKin?.email}
                        </p>
                        <p className="flex flex-col text-sm">
                            <span className="font-bold">Address:</span>
                            <p className="leading-4 font-serif">{member?.nextOfKin?.address}</p>
                        </p>

                    </div>


                </div>


            ) : (
                //Loading Indicators:
                <div class="flex items-center justify-center h-screen bg-gray-100">
                    <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
            )}

        </>
    );
};

export default View;
