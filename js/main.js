const arrayProductos =[];

const producto1 = new Producto (1, "Pomada Mr Blonde", 1000);
const producto2 = new Producto (2, "Balsamo para barba Mr Blonde", 700);
const producto3 = new Producto (3, "AfterShave Mr Blonde", 1000);
const producto4 = new Producto (4, "Shampoo Mr Blonde", 1200);

arrayProductos.push(producto1, producto2, producto3, producto4);

//Ordenar por menor precio
const ordMenorPrecio = () => {
    arrayProductos.sort((a,b) => a.precio - b.precio);
    mostrarArrayOrd();
}

//Ordenar por mayor precio

const ordMayorPrecio = () => {
    arrayProductos.sort((a,b)=> b.precio - a.precio);
    mostrarArrayOrd();
}

const mostrarArrayOrd = () => {
    let arrayOrdenado=[];
    arrayProductos.forEach(producto => arrayOrdenado.push(producto.id+". "+producto.nombre+" $"+producto.precio))
    alert("Lista de precios:"+"\n"+arrayOrdenado.join("\n"));
}


function comprarProducto(){

    let idProducto =0;
    let cantidadProducto = 0;
    let totalCompra = 0;
    let seguiCompra = false;


    do{
        
    
        idProducto = parseInt(prompt ("¿Que producto quieres comprar?"+"\n"+"1.Pomada Mr Blonde"+"\n"+"2. Balsamo para barba Mr Blonde"+"\n"+"3. AfterShave Mr Blonde"+"\n"+"4. Shampoo Mr Blonde","Ej: 1"))
        cantidadProducto = parseInt(prompt("¿Cuantos te gustaria comprar?"));
        const productoSelec = arrayProductos.find( producto => producto.id == idProducto);
        
        if(productoSelec){
            totalCompra += productoSelec.precio * cantidadProducto;
        }else{
            alert("No se encuentra el producto, ingrese un numero de producto valido")
        }

        seguiCompra = confirm("¿Queres agregar otro producto?");
    }while (seguiCompra);

    const totalConDescuento = aplicarDescuento(totalCompra);
    const totalConEnvio = calcularEnvio(totalConDescuento);
    const cuotas = calcularCantDeCuotas();
    const intereses = calcularIntereses(cuotas);
    totalAPagar(totalConEnvio, cuotas,intereses);1
}




function validarCantidad(cantidadProducto){
    while(Number.isNaN(cantidadProducto) || cantidadProducto === 0) {
        if(cantidadProducto !==0){
            alert("Debe ingresar un número")
        }else{
            alert("Debe ingresar un numero distinto de cero")
        }
        cantidadProducto = parseInt(prompt("¿Cuantos te gustaria comprar?"));
    }

    return cantidadProducto;
}

function aplicarDescuento (totalCompra){
    
    let totalConDescuento = 0;

    if ( totalCompra >= 4000 ) {
        totalConDescuento = totalCompra * 0.85;
        alert("Tenes 15% de descuento")
        return totalConDescuento
    }else {
        totalConDescuento = totalCompra
        return totalConDescuento
    }
        
}

function calcularEnvio (totalConDescuento){
    let tieneEnvio = false;
    let totalConEnvio = 0;

    tieneEnvio = confirm("¿Queres envio a domicilio");
    if(tieneEnvio && totalConDescuento >=2000){
        alert("Tienes envio gratuito. El valor de la compra es "+totalConDescuento)
        totalConEnvio= totalConDescuento
        return totalConEnvio
    }else if(tieneEnvio && totalConDescuento <2000 && totalConDescuento!==0 ){
        totalConEnvio = totalConDescuento + 500;
        alert("El envio cuesta $500. El valor de tu compra es: " +(totalConDescuento+500))
        return totalConEnvio
    }else {
        alert("El valor de la compra es: "+totalConDescuento)
        totalConEnvio = totalConDescuento
        return totalConEnvio
    }

}

function calcularCantDeCuotas(){
    let cuotas= 0;
    let tieneCuotas= false; 

    tieneCuotas= confirm("¿Quiere pagar en cuotas?")
    if(tieneCuotas){
        cuotas= parseInt(prompt("¿En cuantas cuotas queres pagar? 1, 3, 6 o 12","Ej:3"))
        if(cuotas===0){
            cuotas=1;
        }else if(Number.isNaN(cuotas)){
            alert("Debe ingresar un número valido");
            calcularCantDeCuotas();
        }
    
    }else {
        cuotas = 1;
    }
    return cuotas
}

function calcularIntereses(cuotas){
    let tasa = 10.4;
    let sinIntereses = 0;
    let tasaTotal = 0;
    let interesTotal = 0;

    if(cuotas===1){
        return sinIntereses
    }else{
        tasaTotal= tasa + cuotas * 0.2;
        interesTotal= tasaTotal * cuotas;
        return interesTotal
    }
}

function totalAPagar(totalConEnvio, cuotas, interesTotal){
    let totalCompra = 0;
    let valorCuota= 0;
    totalCompra = totalConEnvio + interesTotal;
    valorCuota = totalCompra / cuotas;
    alert ("El total de la compra es: $"+totalCompra+" en "+cuotas+" cuotas de: $"+valorCuota)
}
function ordLista(){
    const ordenar = confirm("¿Quieres ordenar la lista de mas barato a mas caro?")
    if(ordenar){
        ordMenorPrecio();
    }else{
        ordMayorPrecio();
    }

    comprarProducto();
}

ordLista();
