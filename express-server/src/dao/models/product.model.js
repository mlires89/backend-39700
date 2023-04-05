import { mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({

    title:{
        type:String,
        index:true,
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

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model("products", productSchema);

export default productModel;