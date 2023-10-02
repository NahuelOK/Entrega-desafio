class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts = () => {
      return this.products;
    };

    getProductById = (id) => {
        const product = this.products.find(product => product.id === id);
        if(product){
          return product;
        }else{
          console.error(`No se encontró ningún producto con el ID ${id}.`);
          return "Not Found";
        }
      };
  
    isCodeUnique = (code) => {
      return this.products.every(product => product.code !== code);
    }
  
    addProduct = (title, description, price, thumbnail, code, stock) => {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios.");
        return;  
      }
  
      if (!this.isCodeUnique(code)) {
        console.error("Código duplicado. No se puede agregar el producto.");
        return;  
      }
  
      const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.getId()
      };
  
      this.products.push(product);
    };
  
    getId = () => {
      return this.products.length;
    }
  }
  
  const productManager = new ProductManager();

  //Carga de productos.
  productManager.addProduct("Pan", "Basicamente Pan", 100, "direccion de imagen", 333, 30);
  productManager.addProduct("Azúcar", "Basicamente Azúcar", 1000, "direccion de imagen", 332, 23); 
  productManager.addProduct("Sal", "Basicamente Sal", 700, "direccion de imagen", 334, 12);

  //Verificar si hay productos cargados y también mostrar lista completa.
  if(productManager.getProducts().length === 0) {
    console.error("No hay ni un solo producto agregado. Porfavor Ingrese 1");
  }else{
    console.log(productManager.getProducts());
  }

//Buscar el Id que queramos encontrar y mostrar dicho producto.
  console.log(productManager.getProductById(0));
  