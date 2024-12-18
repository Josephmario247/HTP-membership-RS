import mongoose, { Schema } from 'mongoose';


const memberSchema = new Schema({
    // userId:{type: Schema.Types.ObjectId, ref: "User", required: true},
    fullName:{type:String, required: true},
    title:{type:String},
    email:{type:String, defaultValue:null, unique: true},
    regNo:{type:Number, required: true,unique:true},
    dob:{type:Date, required: true},
    gender:{type:String, required: true},
    residential:{type:String, required: true},
    maritalStatus:{type:String },
    stateOrigin:{type:String, required: true},
    occupation:{type:String, defaultValue:null},
    phoneNo:{type:Number,defaultValue:null},
    officeAddress:{type:String},
    officePhoneNo:{type:Number},
    homeAdd:{type:String, required: true},
    homeParish:{type:String},
    cathCommunity:{type:String, defaultValue:null},
    baptism:{type:Boolean, default:false},
    confirmation:{type:Boolean, default:false},
    holyEucharist:{type:Boolean, default: false},
    image:{type:String, defaultValue:null },
    nextOfKin:{
        fullName:{type: String, required: true},
        email: {type: String, defaultValue:null},
        address: {type: String},
        gender: {type: String},
        relationship: {type: String, required: true},
        phoneNo:{type: Number, defaultValue:null},
    },
    createdAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
})

// memberSchema.pre("deleteOne", {document: true, query:false}, async function(next){
//     try { 
//         await memberSchema.deleteMany(this._id)
//         next()
//     } catch (error) {
//         next(error)
//     }
// })
const Member = mongoose.model("Member", memberSchema)
export default Member;