
const Producto= require('./productos');
const Categoria= require('./categorias');
const Usuario= require('./users');

module.exports={
    ...Categoria,
    ...Producto,
    ...Usuario
}