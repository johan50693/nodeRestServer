
const Producto= require('./productos');
const Categoria= require('./categorias');
const Usuario= require('./users');
const Buscar= require('./buscar');
const Cargar= require('./uploads');

module.exports={
    ...Categoria,
    ...Producto,
    ...Usuario,
    ...Buscar,
    ...Cargar
}