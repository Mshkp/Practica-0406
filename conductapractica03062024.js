var carro = [];
var spTotal = document.getElementById("total");
var listaCarro = document.getElementById("carrito");
var carroSinRepetidos = JSON.parse(productos);
var productosXML = document.getElementById("productos");
mostrarProductos();


function mostrarProductos()
{
    for(var pro of carroSinRepetidos)
    {
        var unNodo = document.createElement('div');
        unNodo.classList.add('card','col-sm-4');

        var unNodoCardBody = document.createElement('div');
        unNodoCardBody.classList.add('card-body');

        var unNodoTitle = document.createElement('h5');
        unNodoTitle.classList.add('card-title');
        unNodoTitle.textContent = pro.nombre;

        var unNodoImagen = document.createElement('img');
        unNodoImagen.classList.add('img-fluid');
        unNodoImagen.setAttribute('src', pro.imagen);

        var unNodoPrecio = document.createElement('p');
        unNodoPrecio.classList.add('card-text');
        unNodoPrecio.textContent = '$' + pro.precio;

        var unNodoBoton = document.createElement('button');
        unNodoBoton.classList.add('btn','btn-primary');
        unNodoBoton.textContent = '+';
        unNodoBoton.setAttribute('marcador', pro.id);
        unNodoBoton.addEventListener('click', agregarCarro);

        unNodoCardBody.appendChild(unNodoImagen);
        unNodoCardBody.appendChild(unNodoTitle);
        unNodoCardBody.appendChild(unNodoPrecio);
        unNodoCardBody.appendChild(unNodoBoton);
        unNodo.appendChild(unNodoCardBody);
        productosXML.appendChild(unNodo);
    }
}


function agregarCarro()
{
    carroSinRepetidos[(this.getAttribute("marcador")-1)].cantidad++;
    calcularTotal();
    mostrarEnCarro();
}


function eliminarProducto(index) 
{
    carroSinRepetidos[index].cantidad = 0;
    calcularTotal();
    mostrarEnCarro();
}


function calcularTotal()
{
    var elTotal = 0;
    for(var p of carroSinRepetidos)
    {
        elTotal+= (p.precio*p.cantidad);
    }
    spTotal.textContent = elTotal;
}


function mostrarEnCarro() 
{
    listaCarro.textContent = "";
    for (var i = 0; i < carroSinRepetidos.length; i++) {
        var objP = carroSinRepetidos[i];
        if(objP.cantidad > 0){
            var nodoProductoEnCarro = document.createElement("li");
            nodoProductoEnCarro.classList.add("list-group-item", "d-flex", 
            "justify-content-between","text-right", "mx-2");
            nodoProductoEnCarro.textContent = objP.nombre + " - $" + objP.precio;
            

            nodoProductoEnCarro.textContent = objP.nombre + " - $" + objP.precio + " x " + objP.cantidad;

            var botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "mx-2");
            botonEliminar.onclick = (function(index) 
            {
                return function() 
                {
                    eliminarProducto(index);
                }
            })(i);


            var elboton = document.createElement('button');
            elboton.classList.add('btn', 'btn-danger', "mx-5");
            elboton.textContent = '-';
            elboton.setAttribute ('item', objP.id);
            elboton.addEventListener('click', borrarProductoenCarro);
            nodoProductoEnCarro.appendChild(elboton);
            nodoProductoEnCarro.appendChild(botonEliminar);

            listaCarro.appendChild(nodoProductoEnCarro);
        }
    }
}


function borrarProductoenCarro()
{
    carroSinRepetidos[(this.getAttribute("item")-1)].cantidad--;

    calcularTotal();
    
    mostrarEnCarro();
}


function limpiarCarrito() 
{
    // Reinicia la cantidad de cada producto en el carrito a 0
    for (var i = 0; i < carroSinRepetidos.length; i++) 
    {
        carroSinRepetidos[i].cantidad = 0;
    }
    
    // Calcula y muestra el total actualizado
    calcularTotal();
    
    // Muestra el carrito actualizado
    mostrarEnCarro();
}