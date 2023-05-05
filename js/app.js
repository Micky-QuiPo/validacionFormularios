import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");//Toma en cuenta todos los elementos con clase input

inputs.forEach( input => {
    input.addEventListener('blur', (input) => {
        valida(input.target);
    });
});//mediante una arrow function hace que la accion de blur se ejecute para cada input