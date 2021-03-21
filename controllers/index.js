
const Producto= require('./productos');
const Categoria= require('./categorias');
const Usuario= require('./users');
const Buscar= require('./buscar');

module.exports={
    ...Categoria,
    ...Producto,
    ...Usuario,
    ...Buscar
}