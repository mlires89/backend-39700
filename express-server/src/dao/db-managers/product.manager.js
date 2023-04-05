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
     const result = await productModel.find({ _id: id});
     return result;
    }

    async updateProduct (prodId, data){
        await productModel.findOneAndUpdate({_id:prodId},data);
    }

    async deleteProduct(prodid){
        const result = await productModel.deleteOne({ _id: prodid});
        return result;
    }
    
};


export default ProductManager;
