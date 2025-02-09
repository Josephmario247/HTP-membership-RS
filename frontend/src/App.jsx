import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
// import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoute from './utils/RoleBaseRoute'
import AdminSummary from './components/dashboard/AdminSummary'
// import DepartmentList from './components/department/DepartmentList'
// import AddDepartment from './components/department/AddDepartment'
// import EditDepartment from './components/department/EditDepartment'
import List from './components/member/List'
// import Add from './components/member/Add'
import View from './components/member/View'
import Edit from './components/member/Edit'
// import ViewSalary from './components/salary/ViewSalary'
import AdminDashboard from './pages/AdminDashboard'
import SummaryCard from './components/EmployeeDashboard/Summary'
// import LeaveList from './components/leave/List'
// import AddLeave from './components/leave/Add'
import Setting from './components/EmployeeDashboard/Setting'
import {Toaster} from 'react-hot-toast'
import Add2 from './components/member/Add2'



function App() {

  return (
    <div>
      <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='/admin-dashboard' />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoute requiredRole={["Admin"]}>
              <AdminDashboard />
            </RoleBaseRoute>
          </PrivateRoutes>

        }>
          <Route index element={<AdminSummary />}></Route>

          {/*admin Department Dashboard */}
          {/* <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />}></Route> */}

          {/* admin member Dashboard */}
          <Route path='/admin-dashboard/members' element={<List />}></Route>
          <Route path='/admin-dashboard/register-member' element={<Add2 />}></Route>
          <Route path='/admin-dashboard/members/:id' element={<View />}></Route>
          <Route path='/admin-dashboard/members/modify/:id' element={<Edit />}></Route>
          {/* <Route path='/admin-dashboard/member/modify/regNo' element={<Edit />}></Route> */}
          <Route path='/admin-dashboard/setting' element={<Setting />}></Route>

        </Route>

        {/* employee Dashboard  */}
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoute requiredRole={['admin', 'employee']}>
              {/* <EmployeeDashboard /> */}
            </RoleBaseRoute>
          </PrivateRoutes>}>
          <Route index element={<SummaryCard />}></Route>
          {/* <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/employee-dashboard/setting' element={<Setting/>}></Route> */}
       
          </Route>
      </Routes>
    </BrowserRouter>
    </div>

  )
}

export default App
