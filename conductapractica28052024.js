var spTotal = document.getElementById("total");
var listaCarro = document.getElementById("carrito");
var carrosSinRepetidos= [];
productos();

function agregarCarro1()
{
    carrosSinRepetidos[0].cantidad++;
    calcularTotal();
    mostrarEnCarro();
}


function agregarCarro2()
{
    carrosSinRepetidos[1].cantidad++;
    calcularTotal();
    mostrarEnCarro();
}


function agregarCarro3()
{
    carrosSinRepetidos[2].cantidad++;
    calcularTotal();
    mostrarEnCarro();
}


function calcularTotal()
{
    var elTotal = 0;
    for(var p of carrosSinRepetidos)
    {
        elTotal+= (p.precio*p.cantidad);
    }
    spTotal.textContent = elTotal;
}


function mostrarEnCarro()
{
    listaCarro.textContent="";
    for(var i = 0; i < carrosSinRepetidos.length; i++) {
        var objP = carrosSinRepetidos[i];
        if (objP.cantidad > 0) {
            var nodoProductoEnCarro=document.createElement("li");
            nodoProductoEnCarro.classList.add("list-group-item","text-right","mx-2");
            
            // Crear el botón
            var botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("btn", "btn-danger", "mr-2"); 
            // Clases de Bootstrap, ajusta según tu estilo

            // Crear el texto del producto con subtotal
            var textoProducto = document.createTextNode(objP.cantidad + "- " + objP.nombre + " - $ " 
            + objP.precio + " sub total -" + (objP.cantidad * objP.precio)+"                    ");

            // Añadir un atributo personalizado para almacenar el índice del elemento en el array
            botonEliminar.setAttribute("data-indice", i);

            // Agregar el botón y el texto del producto al elemento de lista
            nodoProductoEnCarro.appendChild(textoProducto);
            nodoProductoEnCarro.appendChild(botonEliminar);

            listaCarro.appendChild(nodoProductoEnCarro);


            // Agregar el controlador de evento para el clic en el botón Eliminar
            botonEliminar.addEventListener("click", function(event) 
            {
                // Obtener el índice del elemento a eliminar del atributo personalizado
                var indice = parseInt(event.target.getAttribute("data-indice"));

                // Establecer la cantidad del producto en cero en lugar de eliminarlo del arreglo
                carrosSinRepetidos[indice].cantidad = 0;

                // Volver a mostrar el carrito
                mostrarEnCarro();
                calcularTotal();
            });
        }
    }
}


function productos()
{
    var objProducto=
    {
        id: 1,
        nombre: "Producto 1",
        precio: 375 ,
        cantidad: 0
    };
    carrosSinRepetidos.push(objProducto);

    var objProducto=
    {
        id:2,
        nombre:"Producto 2",
        precio:475,
        cantidad:0
    };
    carrosSinRepetidos.push(objProducto);

    var objProducto=
    {
        id: 3,
        nombre:"Producto 3",
        precio:575,
        cantidad:0
    };
    carrosSinRepetidos.push(objProducto);
}


function Limpiar()
{
    // Reiniciar las cantidades de todos los productos a cero
    for(var i = 0; i < carrosSinRepetidos.length; i++) 
    {
        carrosSinRepetidos[i].cantidad = 0;
    }
    
    // Calcular el total y mostrar el carrito vacío
    calcularTotal();
    mostrarEnCarro();
}