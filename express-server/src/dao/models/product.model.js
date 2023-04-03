import { mongoose } from "mongoose";

const productSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true,
    },
    description: {
        type:String,
        require:true,
    },
    price:{
        type: Number,
        require:true
    },
    thumbnail:{
        type:String,
        require:true
    },
    code:{
        type: String,
        require: true,
        unique:true,
    },
    stock:{
        type:Number,
        require:true
    }
});

const productModel = mongoose.model("products", productSchema);

export default productModel;