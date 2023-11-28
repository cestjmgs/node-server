const http = require("http")

/*const { prependListener } = require('process');*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const users = []

function agregarTarea (id, descripcion) { 
    return new Promise ((resolve, reject) => {
        setTimeout(()=>{ 
     users.push ({
        identidad: id, 
        descripcion: descripcion, 
        estado: false, 
    });
    resolve(users);
    },2000);
    });  
} 

function eliminarTarea (indice) { 
    return new Promise ((resolve, reject) => { 
        setTimeout(()=> {
   const tareaEncontrada = users.findIndex((tarea) => tarea.identidad == indice);
    if (tareaEncontrada !== -1) {
        users.splice(tareaEncontrada,1)
    }
    resolve(users);
    }, 2000);
}); 
}

function completarTarea (indice) { 
    return new Promise ((resolve, reject) => {
        setTimeout(()=> {
    const tareaEncontrada = users.findIndex ((tarea) => tarea.identidad == indice);
    if (tareaEncontrada !== -1) {
        users[tareaEncontrada].estado = true; 
    };
    resolve(users);
    },2000);
    });
}

function pregunta () {
    return new Promise ((resolve) => { 
        rl.question("¿Qué acción desea realizar?: agregar, eliminar o completar: ", async (accion) => 
        {
            if (accion === "agregar") {
                const descripcion = await preguntaAsync ("Ingrese la descripción de la tarea: ");
                const id = await preguntaAsync("Ingrese el ID de la tarea: ");
                await agregarTarea(id,descripcion);
                console.log(users);
                await pregunta ();
            } else if (accion === "eliminar") {
                const id = await preguntaAsync("Ingrese el ID de la tarea: ");
                await eliminarTarea(id);
                console.log(users);
                await pregunta ();
            } else if (accion === "completar") {
                const id = await preguntaAsync("Ingrese el ID de la tarea: ");
                await completarTarea(id);
                console.log(users);
                await pregunta ();
            }
            resolve();
            
            
        });
    });
}

function preguntaAsync(prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer)=> {
            resolve(answer);
        })
    })
}

async function main () {
    await pregunta(); 
}
main ();

/*
function pregunta () {
    rl.question ("¿Qué acción desea realizar?: agregar, eliminar o completar: ", (accion) => {
        if (accion === "agregar") { 
            rl.question ("Ingrese la descripción de la tarea: ", (descripcion) => {
                rl.question ("Ingrese el ID: ", (id) => {
                    agregarTarea (id, descripcion)
                    .then ((updatedUsers) => {
                        console.log (updatedUsers);
                        pregunta ();
                    })
                    .catch((error) => {
                        console.error(error);
                        pregunta();
                    });
                });
            }); 
        } 
        else if (accion === "eliminar") {
             rl.question ("Ingrese el ID: ", (id) => {
                    eliminarTarea (id)
                    .then((updatedUsers) => {
                    console.log (updatedUsers);
                    pregunta ();
                    })
                    .catch((error) => {
                        console.error(error);
                        pregunta();
                    });
                });
        }
        else if (accion === "completar") {
         rl.question ("Ingrese el ID: ", (id) => {
                    completarTarea(id)
                    .then((updatedUsers)=> {
                        console.log (users);
                        pregunta ();
                    })
                    .catch((error)=> {
                        console.error(error);
                        pregunta();
                    });
                });   
        };
    });   
};
 
pregunta ();
*/

// Servidor
const host = 'localhost';
const port = 3000

const requestListener = (req, res) => {
    res.writeHead(200)
    res.write(JSON.stringify(users))
    res.end()
}

const server = http.createServer(requestListener)

server.listen(port, () => {
    console.log(`Servidor funcionando en el puerto: ${port}`)
})



