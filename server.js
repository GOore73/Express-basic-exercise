/*
Un API REST no es mas que un server que tiene una url para procesar datos. 

El server va a guardar los datos en un arreglo.

rutas del servidor:
GET /products
POST / products
GET /products/:id
PUT /products/:id
DELETE /products/:id

Estas rutas tienen una recomendación de REPRESENTATION ESTATE TRANSFER REST

el SERVER es un intermediario entre el front y los datos. Este concepto de intermedia
APPLICATION PROGRAMING INTERFACE, API.

De ahí que el modelo completo es un API REST
*/

import express from 'express';
import morgan from 'morgan';

//iniciar server
const app = express();

// es el arreglo de los datos
let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000
  }
];  


//middlewares
app.use(morgan('dev')); //morgan para monitorear los reqs
app.use(express.json());    //para interpretar json

app.get('/products', (req,res)=>{
  res.json(products);
});

app.get('/products/:id', (req,res)=>{
  const productFound = products.find(product=>product.id === parseInt(req.params.id));

  //la versión mas clásica para este find:
  // const productFound = products.find((product)=>{
  //   return products.id === parseInt(req.params.id)
  // })

  if (!productFound) return res.status(404).send({
    message: 'Product not found'
  }) //si es undefined, no encontró una coincidencia devuelve un error

  //si encontró:
  console.log(productFound);
  res.json(productFound);
});

app.post('/products', (req,res)=>{
  const newProduct = {id: products.length +1,...req.body};
  //push método del arreglo para agregar un elemento; genera un nuevo objeto que es copia de otro ...req.body y le agrega un nuevo dato id que es la longitud + 1
  products.push(newProduct);
  res.send(newProduct);
});

app.put('/products/:id', (req,res)=>{
  const newData = req.body;
  const productFound = products.find(product=>product.id === parseInt(req.params.id));

  if (!productFound) return res.status(404).send({
    message: 'Product not found'
  }) //si es undefined, no encontró una coincidencia devuelve un error

  //si encontró:
  products =  products.map (p=> p.id===parseInt(req.params.id) ? {...p,...newData}: p);
  //map, recorre un arreglo y genera un nuevo arreglo del mismo tamaño
  // {...p, ...newData} lo que hace, es al elemento p, si encuentra alguna diferencia en newData lo reemplaza, tanto el objeto completo, como algun parámetro en particular. Pueden venir solo el price, o solo la denominacion o ambos
  
  res.json({
    message: "Product updated successfully"
  });
});

app.delete('/products/:id', (req,res)=>{
  const productFound = products.find(product=>product.id === parseInt(req.params.id));

  if (!productFound) return res.status(404).send({
    message: 'Product not found'
  }) //si es undefined, no encontró una coincidencia devuelve un error

  //si encontró:
  products = products.filter(p=> p.id !== parseInt(req.params.id));
  res.sendStatus(204);

});



app.listen(3000);
console.log(`server on port ${3000}`);

