import mongoose from "mongoose";
const recordSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:[true,"Amount is required"]
    },
    type:{
        type:String,
        enum:["income","expense"],
        required:true
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    date:{
        type:Date,
        required:[true,"Date is required"]
    },
    notes:{
        type:String,
        trim:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
});

const Record = mongoose.model("Record",recordSchema);

export default Record;