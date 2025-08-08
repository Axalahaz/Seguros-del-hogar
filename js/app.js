const xPropiedad = document.querySelector("select#propiedad")
const xUbicacion = document.querySelector("select#ubicacion")

// generacion de menu propiedad
function cargarComboPropiedad(){
    let listaPropiedad = "<option selected disabled>...</option>"
    for (let propiedad of datosPropiedad){
        let tag = `<option value= "${propiedad.factor}">${propiedad.tipo}</option>`
        listaPropiedad += tag
    }
    xPropiedad.innerHTML = listaPropiedad
}

// generacion de menu ubicacion
function cargarComboUbicacion(){
    let listaUbicacion = "<option selected disabled>...</option>"
    for (let ubicacion of datosUbicacion){
        let tag = `<option value= "${ubicacion.factor}">${ubicacion.tipo}</option>`
        listaUbicacion += tag
    }
    xUbicacion.innerHTML = listaUbicacion
}

// generacion de input metros cuadrados
const metros2 = document.querySelector("input#metros2")

// carga de datos de los menus dinamicos
let fmPropiedad, fmUbicacion

function cargarDatosPropiedad(){
    if (xPropiedad.value !== ""){
        for (let propiedad of datosPropiedad){ 
            if (xPropiedad.value === propiedad.factor){
                fmPropiedad = propiedad.factor
                return fmPropiedad
            }
        }
    }
}

function cargarDatosUbicacion(){
    if (xUbicacion.value !== ""){
        for (let ubicacion of datosUbicacion){
            if (xUbicacion.value === ubicacion.factor){
                fmUbicacion = ubicacion.factor
                return fmUbicacion
            }
        }
    }
}

// bloqueo de interfaz para usuario mientras se realiza el calculo
const divCuadro = document.querySelector("div.div-quote")

function bloquearInteraccionUsuario(acceso){
    const bloqueado = divCuadro.classList.toggle("div-blocked")
    console.log(bloqueado? "Div-quote bloqueado" : "Div-quote desbloqueado")
}  

// generacion de evento click en cotizar y carga del pensadorBusqueda
const costoBase = 1.16
let costoTotal

const cotizar = document.querySelector("button.button-outline")
const precio = document.querySelector("span#valorPoliza")
const gifPensador = document.querySelector("span.gifPensador")

cotizar.addEventListener("click", ()=>{
    bloquearInteraccionUsuario(true) // bloqueo elementos
    cotizar.innerHTML = '<img src="./images/animation.gif">'
    setTimeout(()=>{
        if(Number(metros2.value) && cargarDatosPropiedad() && cargarDatosUbicacion()){
            costoTotal = (costoBase * metros2.value * Number(fmPropiedad) * Number(fmUbicacion)).toFixed(2)
            console.log("Monto total de la póliza: " + costoTotal)
            // visualizacion de poliza
            precio.textContent = costoTotal
        } else { console.warn("Error de validacion")}
        cotizar.textContent = 'Cotizar'
        bloquearInteraccionUsuario(false) 
        }, 3000) // reemplaza a los 3 segundos
    })


cargarComboPropiedad()
cargarComboUbicacion()
