//PARTE COMENTADA PORQUE SE REEMPLAZO TODO ESTO POR LA FUNCION QUE ESTA ABAJO QUE TRABAJA CON LOS DATA PROPERTIES 
//const inputNacimiento = document.querySelector("#birth");//Llamamos al tag Birth

//inputNacimiento.addEventListener("blur", (evento) => {
    //validarNacimiento(evento.target);
//});//Con blur indicamos que se active cuando el cursor deje de estar en el input

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;//dataset llama la propiedad data y tipo es el nombre del data en el archivo HTML
    if(validadores[tipoDeInput]){//Verifica si tipoDeInput existe dentro de validadores
        validadores[tipoDeInput](input);//Le da un valor de validadores a input
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid")
    }//valid es el valor que la consola nos muestra donde se verifica si contiene un valor que corresponde al input. Si lo contiene y es valido, quitara la clase indicada, caso contrario la aplicara
    input.parentElement.querySelector(".input-message-error").innerHTML = mostratMensajeDeError(tipoDeInput, input)
}

const tipoDeErrores = [
    "valueMissing", 
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo password no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayucula, un numero y no puede contener espacios ni caracteres especiales"
    },
    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacio", 
        customError: "Debes tener mas de 18 anos de edad"
    },
    numero: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
    },
    direccion: {
        valueMissing: "El campo direccion no puede estar vacio",
        patternMismatch: "La direccion debe contener de 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener de 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "El estado debe contener de 10 a 40 caracteres"
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostratMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}//Aqui se unen todas las funciones y arrays colocadas anteriormente. Primero se crea la funcion mostratMensajeDeError con parametros tipoDeInput (que jala los data-tipos del html) e input. Se genera un mensaje que sera llenado con la funcion tipoDeErrores donde se crea el arrow function error. Para cada uno de esos posibles errores se tiene que checkear en caso de que alguno cumpla con los parametros y sea true, entonces se mostrara en mensaje el que corresponda de la lista de tipos de errores compilados en los array previamente armados.

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 anos de edad"
    }//El ! al principio indica a la funcion que si es false debe retornar ese mensaje

    input.setCustomValidity(mensaje)//Es una funcion que se encarga de recibir un mensaje que estara vacio ya que el valor sea true
}; //con la const fechaCliente buscamos que nos retorne el valor ingresado en la edad

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
    ); 
    return diferenciaFechas <= fechaActual;
}//Mediante esta funcion determinamos si la diferencia de fechas entre hoy y la fecha ingresada es de minimo 18 anos, por esto se suma 18 al valor de UTCFullYear