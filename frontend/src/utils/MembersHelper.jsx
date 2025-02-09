import axios from "axios"
import { useEffect } from "react";
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
// const { id } = useParams();
export const columns = [
  {
    name: "S/N",
    selector: (row) => row.sno,
    width: '80px'
  },
  {
    name: "Image",
    selector: (row) => row.image,
    width:"80px"

  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width:'200px'
  },

  
  {
    name: "DOB",
    selector: (row) => row.dob,
    // sortable: true,
    width:"80px"
    
  },
  {
    name: "RegNo",
    selector: (row) => row.regNo,
    sortable: true,
    width:"80px"
    
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    // sortable: true,
     width:"80px"
   
  },
  {
    name: "Status",
    selector: (row) => row.maritalStatus,
    // sortable: true,
     width:"80px"
    
  },
  {
    name: "State_Origin",
    selector: (row) => row.stateOrigin,
    // sortable: true,
     width:"100px"
    
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true
  },
]
// export const fetchDepartments = async () => {
//   let departments
//   try {
//     const response = await axios.get("http://localhost:5000/api/department", {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     if (response.data.success) {
//       departments = response.data.departments
//     }
//   } catch (error) {
//     if (error.response && !error.response.data.success) {
//       alert(error.response.data.error)
//     }
//   }
//   return departments
// }

// Api call to get employee field for salary form
// export const getEmployees = async (id) => {
//   let employees
//   try {
//     const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     if (response.data.success) {
//       employees = response.data.employees
//     }
//   } catch (error) {
//     if (error.response && !error.response.data.success) {
//       alert(error.response.data.error)
//     }
//   }
//   return employees
// }

// const fetchMember = async () => {
//   let member
//   try {
//       const response = await axios.get(
//           `http://localhost:5000/api/member/${id}`,
//           {
//               headers: {
//                   Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//           }
//       );
//       if (response.data.success) {
//           member = response.data.member;
//           // console.log(response.data.nextOfkin)
//       }
      
//   } catch (error) {
//       if (error.response && !error.response.data.success) {
//           toast.error(error.response.data.error);
//       }
//   }
//   return member
// };



export const MemberButtons = ({ id ,onDeletMember }) => {
  const navigate = useNavigate()
  
// useEffect(() => {
//   fetchMember()
// },[])

  const handleDelete = async (id) => {
       
    if(window.confirm('Are you sure you want to delete this member?')) {
        try {
            const response = await axios.delete(`http://localhost:5000/api/member/remove/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
              onDeletMember()
              toast.success(response.data.message)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
              toast.error(error.response.data.error)
            }
        }
    }
  
  }
  return (
    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-teal-600 text-white rounded" onClick={() => navigate(`/admin-dashboard/members/${id}`)}>View</button>
      <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => navigate(`/admin-dashboard/members/modify/${id}`)} >Modify</button>
      {/* <button className="px-3 py-1 bg-yellow-600 text-white rounded" onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}>Salary</button> */}
      <button className="px-3 py-1 bg-red-600 text-white rounded"onClick={() =>handleDelete(id) } >Remove</button>
    </div>
  )
}