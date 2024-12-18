import multer from "multer";
import path from "path";
import Member from "../models/Member.js";
import fs from "fs"


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");// Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));// Append timestamp to the original file name
  },
});
const upload = multer({ storage: storage });

const AddMember = async (req, res) => {
  const {
    fullName,
    title,
    email,
    regNo,
    dob,
    gender,
    residential,
    maritalStatus,
    stateOrigin,
    occupation,
    phoneNo,
    officeAddress,
    officePhoneNo,
    homeAdd,
    homeParish,
    cathCommunity,
    baptism,
    confirmation,
    holyEucharist,
    nextOfKin,

  } = req.body;
  try {
    //To check if the member exists in the database
    const member = await Member.findOne({ email});
    if (member) {
      return res
        .status(400)
        .json({ success: false, error: "Oops! Member already registered with this email." });
    }
  const IsRegNo = await Member.findOne({regNo});
  if (IsRegNo) {
      return res
       .status(400)
       .json({ success: false, error: "Oops! registration number already exists." });
    }
    //Create a new member
    const newMember = new Member({
      fullName: fullName.toUpperCase(),
      title,
      email: email.toLowerCase(),
      regNo,
      dob,
      gender,
      residential: residential.toLowerCase(),
      maritalStatus,
      stateOrigin,
      occupation,
      phoneNo,
      officeAddress,
      officePhoneNo,
      homeAdd: homeAdd.toLowerCase(),
      homeParish,
      cathCommunity,
      baptism,
      confirmation,
      holyEucharist,
      image: req.file ? req.file.filename : "",
      nextOfKin:{
        fullName: nextOfKin.fullName.toUpperCase(),
        email: nextOfKin.email,
        address: nextOfKin.address,
        gender: nextOfKin.gender,
        relationship: nextOfKin.relationship,
        phoneNo: nextOfKin.phoneNo
      }
    });
    // console.log(newMember);
    const savedMember = await newMember.save();
   
    return res
      .status(200)
      .json({ success: true, message: `${savedMember.fullName} registered successfully`});
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error:"Server error in saving member" });
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await Member.find()
    return res.status(200).json({ success: true, members: members });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get members server error" });
  }
};
const getMember = async (req, res) => {
  const { id } = req.params;
  try {
    let member

    //find member base on member _Id 
    member = await Member.findById({ _id: id })
    return res.status(200).json({ success: true, member});
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get member server error" });
  }
};
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      title,
      maritalStatus,
      occupation,
      phoneNo,
      regNo,
      residential,
      baptism,
      holyEucharist,
      confirmation,
      image, } = req.body;
    //To check if the members exists in the database
    const member = await Member.findById({ _id: id });
    if (!member && !member.regNo) {
      return res
        .status(404)
        .json({ success: false, error: "member not found" });
    }
    //To check if the user exist in the database
    // const user = await User.findById({ _id: employee.userId });
    // if (!user) {
    //   return res.status(404).json({ success: false, error: "User not found" });
    // }
    // const updateUser = await User.findByIdAndUpdate(
    //   { _id: employee.userId },
    //   { name }
    // );
    const updateMember = await Member.findByIdAndUpdate(
      { _id: id },
      {
        name,
        title,
        maritalStatus,
        occupation,
        phoneNo,
        regNo,
        residential,
        baptism,
        holyEucharist,
        confirmation,
        image
      }
    );
    if (!updateMember) {
      return res
        .status(400)
        .json({ success: false, error: " Failed to Update Member information" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Member updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update member server error" });
  }
};
const fetchMembersByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.find({ _id: id })
    if (!member) return res.status(404).json({ success: false, error: "Member not found" });

    return res.status(200).json({ success: true, member });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error in fetching member from server" });
  }
};
const DeletMember = async (req, res) => {
  try {
      const {id} = req.params;
      const deletMemb = await Member.findById({_id:id})// find member to delete by id 
      await deletMemb.deleteOne() // delete the member by calling the deleteOne middleware specify in member model along with Nextofkin with the same id for the member 
      fs.unlink(`public/uploads/${deletMemb.image}`, () => {})
      return res.status(200).json({success: true, message: "Member deleted successfully"})
  } catch (error) {
      return res.status(500).json({success: false, error: "Deleting Member server error"})
      
  }
}
export { AddMember, upload, getMembers, getMember, updateMember, fetchMembersByDepId, DeletMember};
