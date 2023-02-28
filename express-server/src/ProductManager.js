import fs from "fs";

class ProductManager {
    constructor (path){
        this.path=path,
        this.products =[]
    }
        
    //creo esta funcion para consultar la data del archivo
    async consultarArchivo() {
        try {
          const prods = await fs.promises.readFile(this.path, "utf-8");        
          this.products=JSON.parse(prods);
        } catch (e) {
            await fs.promises.writeFile(this.path,"");
            this.products=[];
        }
    }

    //creo esta funcion para escribir la data en el archivo
    async escribirArchivo(data){
        try{
            await fs.promises.writeFile(this.path,data)
        }catch(err){
            throw err;
        }
    }
    

    async addProduct(title,description,precio,code,stock){
       
        await this.consultarArchivo();  
        if (title && description && precio &&  code && category && stock){
            const producto = this.products.find((pr)=> pr.code === code);            
            if (producto){
                console.log(`El producto con Código ${producto.code} ya existe`);
            }else{    
                const productoNuevo = {
                    id:this.products.length,
                    title,
                    description,
                    precio,
                    code,
                    category,
                    stock
                }
                this.products.push(productoNuevo);
                let prodStr = JSON.stringify(this.products);
                await this.escribirArchivo(prodStr);
            }
        }else {
            throw new Error (`Faltan datos para ingresar el producto`);
        }
    }


    async getProducts(){
        await this.consultarArchivo();  
        return this.products;
    }

    async getProductById(id){
        await this.consultarArchivo();  
        const producto = this.products.find((pr)=>pr.id ===id);

        if (!producto){
            console.log("Not found");
        }else{
            return producto;
        }
    }

    async updateProduct (obj){
        await this.consultarArchivo();  
        const producto = this.products.find((pr)=>pr.id ===obj.id);
        if (producto){
            const index = this.products.findIndex((p)=> p.id === obj.id);
            const arrObjKey = Object.keys(obj); //cargo un array con las keys del objeto que viene por parámetro
            arrObjKey.forEach((key)=>{
                switch(key){
                    case "title" :
                        producto.title = obj.title;
                        break;
                    case "description" :
                        producto.description = obj.description;
                        break;
                    case "precio":
                        producto.precio = obj.precio;
                        break;
                    case "thumbnail":
                        producto.thumbnail = obj.thumbnail;
                        break;
                    case "code" :
                        producto.code = obj.code;
                        break;
                    case "stock":
                        producto.stock = obj.stock;
                        break;
                    case "stock":
                        producto.category = obj.category;
                    break;
                    default:
                        console.log('key not found');
                }
            });
            this.products.splice(index,1,producto);
            let prodStr = JSON.stringify(this.products);
            await this.escribirArchivo(prodStr);
        }else{
            console.log('Producto no encontrado')
        }
    }

    async deleteProducto(id){
        await this.consultarArchivo();  
        const index = this.products.findIndex((p)=> p.id === id);
        if (index > -1){
            this.products.splice(index,1);
            let prodStr = JSON.stringify(this.products);
            await this.escribirArchivo(prodStr);
        }else{
            console.log(`Producto id: ${id} no encontrado`);
        }
    }
}


export default ProductManager;