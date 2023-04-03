import productModel from "../models/product.model.js";
class ProductManager {

            
    async addProduct(data){
        await productModel.create(data);
    }


    async getProducts(){
      const products = await productModel.find().lean();
      return products;
    }

    async getProductById(id){
     const result = await productModel.findById(id);
     return result;
    }

    async updateProduct (obj){
        await productModel.updateOne(obj);
    }

    async deleteProducto(id){
        await productModel.findByIdAndDelete(id);
    }
    
};


export default ProductManager;
