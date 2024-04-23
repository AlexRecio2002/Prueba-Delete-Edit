const { create } = require("domain");
const fs = require( "fs" );
const path = require("path");

const productosFilePath = path.join(__dirname, "../data/productos.json");
const productos = JSON.parse(fs.readFileSync( productosFilePath, "utf-8"));

const productosController = {
    list: (req, res) =>{
        res.render("home", {productos})
    },

    create: (req, res) =>{
        res.render("productos/creacionProd")
    },

    stock: (req, res) =>{
        const{marca, modelo, precio} = req.body || {};
        const nuevoProdu = {
            id: productos.length + 1,   //Agrega un ID pero sin pisar el ID anterior (+1)
            marca, 
            modelo, 
            precio
        };

        try {
            productos.push(nuevoProdu)
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
        res.redirect("/");
        }

        catch(err){
            console.log("Error al guardar producto");
            console.log(err);
            res.status(500).send("Error al guardar el producto")
        }
        
        
    },

    delete: (req, res) => {
		let id = req.params.id  // Lo mismo que en todas los otros metodos lo primero que capturamos aca es el id
		let finalProducts = productos.filter(producto => producto.id !== id) // Aqui lo que hacemos es filtrar los productos que no sean el id que nosotros queremos eliminar

  		fs.writeFileSync(productosFilePath, JSON.stringify(finalProducts, null, ' ')); // Aqui lo que hacemos es escribir el archivo de nuevo con los productos que no sean el id que nosotros queremos eliminar
		res.redirect('/'); 
	},


    // delete: (req, res) => {
    //     const id = parseInt(req.params.id); // Convertir el ID a número entero
    //     const index = productos.findIndex(producto => producto.id === id); // Buscar el índice del producto con el ID proporcionado

    //     if (index !== -1) { // Si se encontró el producto
    //         productos.splice(index, 1); // Eliminar el producto del array
    //         fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " ")); // Guardar los cambios en el archivo
    //         res.redirect("/"); 
    //     } else {
    //         res.status(404).send("Producto no encontrado");  
    //     }
    // },

    detalle: (req, res) => {
        let id = parseInt(req.params.id); // Convertir el ID a número entero
        let producto = productos.find(producto => producto.id === id); // Buscar el producto con el ID proporcionado

        if (producto) {
            res.render("productos/detalles", { producto });
        } else {
            res.status(404).send("Producto no encontrado");
        }
    },

    editarAutos: (req, res) => {
        let id = parseInt(req.params.id); 
        let editAuto = productos.find(producto => producto.id === id); 
        res.render("productos/editarProdu", { editAuto })
    },
    
    actualizar: (req, res) => {
        const id = parseInt(req.params.id); 
        const { marca, modelo, precio } = req.body; 
    
        const index = productos.findIndex(producto => producto.id === id); 
    
        if (index !== -1) { 
            productos[index].marca = marca;
            productos[index].modelo = modelo;
            productos[index].precio = precio;
    
            fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " ")); 
            res.redirect("/");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    }

    
}

module.exports = productosController; 