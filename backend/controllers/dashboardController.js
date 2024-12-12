
import User from '../models/User.js';
import Member from './../models/Member.js';


const getSummary = async (req, res) => {
    try {
        const totalMembers = await Member.countDocuments(); // to get the of members from the database 

        const totalUsers = await User.countDocuments(); // to get the of Departments from the database 

        // const totalSalaries = await Employee.aggregate([
        //     { $group: { _id: null, totalSalary: { $sum: "$salary" } } } // find the total salaries from employee collection using the aggregate method with the fields of salary 
        // ])

        // const employeeAppliedForLeave = await Leave.distinct('employeeId'); // to get the number of employees who have applied for leave

        // const leaveStatus = await Leave.aggregate([
        //     { $group: {_id: "$status", count: { $sum: 1 } } } // group the document by status and increment individual status by 1 
        // ])

        // const leaveSummary = {
        //     appliedForLeave: employeeAppliedForLeave.length,
        //     approved: leaveStatus.find(item => item._id === 'Approved')?.count || 0,
        //     rejected: leaveStatus.find(item => item._id === 'Rejected')?.count || 0,
        //     pending: leaveStatus.find(item => item._id === 'Pending')?.count || 0,
        // }
        return res.status(200).json({ success: true, totalMembers,totalUsers  })

    } catch (error) {
        return res.status(500).json({ success: false, error: "dashboard summary error "})
    }
}
export { getSummary }