const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const array = []

function agregarTarea (id, descripcion) {
    array.push ({
        identidad: id, 
        descripcion: descripcion, 
        estado: false, 
    })
}

function eliminarTarea (indice) { 
   const tareaEncontrada = array.findIndex((tarea) => tarea.identidad == indice);
    array.splice(tareaEncontrada,1)
    console.log(array)
    console.log(tareaEncontrada)
}

function completarTarea (indice) { 
    const tareaEncontrada = array.findIndex ((tarea) => tarea.identidad == indice);
    array[tareaEncontrada].estado = true; 
    console.log (array);
}

function pregunta () {
    rl.question ("¿Qué acción desea realizar?: agregar, eliminar o completar: ", (accion) => {
        if (accion === "agregar") { 
            rl.question ("Ingrese la descripción de la tarea: ", (descripcion) => {
                rl.question ("ingrese el ID: ", (id) => {
                    agregarTarea (id, descripcion);
                    console.log (array);
                    pregunta ();
                })
            } ) 
        } 
        else if (accion === "eliminar") {
             rl.question ("Ingrese el ID: ", (id) => {
                    eliminarTarea (id);
                    console.log (array);
                    pregunta ();
                })
        }
        else if (accion === "completar") {
         rl.question ("ingrese el ID: ", (id) => {
                    completarTarea(id);
                    console.log (array);
                    pregunta ();
                })   
        }
    })   
}
 
pregunta (); 