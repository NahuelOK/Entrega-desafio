import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "./src/api/products.json";
    this.products = [];
    this.currentId = 1;
  }
  
  getProducts = async () => {
    try {
      if (!fs.existsSync(this.path)) {
        return this.products;
      }

      const info = await fs.promises.readFile(this.path, "utf-8");
      
      if (!info.trim()) {
        return this.products;
      }

      this.products = JSON.parse(info);
      return this.products;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

  getProductById = (id) => {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.error(`No se encontró ningún producto con el ID ${id}.`);
      return null; 
    }
  };

  updateProduct = async (id, updatedData) => {
    try {
      const products = await this.getProducts();

      const updatedProducts = products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            ...updatedData,
            id: product.id,
          };
        }
        return product;
      });

      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
      if(id == undefined){
        console.log(`Producto con ID invalido error en la actualizacion`);
      }else{
        console.log(`Producto con ID ${id} actualizado correctamente.`);
      }

      return updatedProducts;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
  };

  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts();

      const updatedProducts = products.filter((product) => product.id !== id);

      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));

      if (id === undefined) {
        console.log("No se pudo eliminar producto ID = Undefined");
      } else {
        console.log(`Producto con ID ${id} eliminado correctamente.`);
      }

      return updatedProducts;
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  };

  isCodeUnique = (code) => {
    return this.products.every((product) => product.code !== code);
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios.");
      return null; 
    }

    if (!(await this.isCodeUnique(code))) {
      console.error("Código duplicado. No se puede agregar el producto.");
      return null; 
    }

    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.getId(),
    };

    this.products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    return "Se agregó correctamente";
  };

  getId = () => {
    return this.currentId++;
  };
}

const main = async () => {
  const productManager = new ProductManager();

  await productManager.addProduct(
    "Pan",
    "Basicamente Pan",
    100,
    "direccion de imagen",
    333,
    30
  );
  await productManager.addProduct(
    "Leche",
    "Leche fresca",
    58,
    "otra direccion de imagen",
    334,
    20
  );

  const products = await productManager.getProducts();
  if (products.length === 0) {
    console.error("No hay ni un solo producto agregado. Por favor ingrese 1");
  } else {
    console.log("Lista de productos:");
    console.log(products);
  }
  console.log(productManager.getProductById(2));
  await productManager.deleteProduct(1); 
  await productManager.updateProduct(2, { title: 'Nuevo título' });  

  const updatedProducts = await productManager.getProducts();

  console.log("Lista de productos actualizada:");
  console.log(updatedProducts);
};

main().catch((error) => console.error(error));

export  {ProductManager}