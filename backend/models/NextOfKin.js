import mongoose, { Schema } from 'mongoose'

const NextOfKinSchema = new mongoose.Schema({
    memberId:{type: Schema.Types.ObjectId, ref:"Member", required: true},
    nextkinName:{type: String, required: true},
    nextKinEmail: {type: String },
    nextOfKinAddress: {type: String},
    nextKinGender: {type: String},
    nextKinRelation: {type: String, required: true},
    nextKinPhone:{type: Number},
    createAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const NextOfKin = mongoose.model("NextOfKin",NextOfKinSchema )
export default NextOfKin;