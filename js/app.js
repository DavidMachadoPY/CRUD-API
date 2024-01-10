var root = document.getElementById("root");
root.classList.add("p-4")

// Columna para el formulario
let col0 = document.createElement('div');
col0.classList.add("col-md-4");
root.appendChild(col0);

let form = document.createElement('form');
form.classList.add("p-5");
col0.appendChild(form);

let spaceinput = document.createElement('div');
spaceinput.classList.add("mb-3");
form.appendChild(spaceinput);

let labelName = document.createElement('label');
labelName.classList.add("form-label");
labelName.textContent = "NOMBRE";
spaceinput.appendChild(labelName);

let inputName = document.createElement('input');
inputName.classList.add("form-control");
inputName.setAttribute('type', 'text');
spaceinput.appendChild(inputName);

let labelEmail = document.createElement('label');
labelEmail.classList.add("form-label");
labelEmail.textContent = "EMAIL";
spaceinput.appendChild(labelEmail);

let inputEmail = document.createElement('input');
inputEmail.classList.add("form-control");
inputEmail.setAttribute('type', 'email');
spaceinput.appendChild(inputEmail);

let btnCrear = document.createElement('button');
btnCrear.classList.add("btn", "btn-success");
btnCrear.innerText = "CREAR O ACTUALIZAR";
form.appendChild(btnCrear);

// Columna para la tabla
let col = document.createElement('div');
col.classList.add("col-md-8");
root.appendChild(col);

let tabla = document.createElement('table');
tabla.classList.add("table", "table-striped");
col.appendChild(tabla);

let thead = document.createElement('thead');
let trheader = document.createElement('tr');
["ID", "Nombre", "Email", "Password", "Acciones"].forEach(headerText => {
    let header = document.createElement('th');
    header.innerText = headerText;
    trheader.appendChild(header);
});
thead.appendChild(trheader);
tabla.appendChild(thead);

fetch("https://memin.io/public/api/users")
    .then(response => response.json())
    .then(data => {
        let tbody = document.createElement('tbody');
        data.forEach((element) => {
            let trbody = document.createElement('tr');
            
            let tdId = document.createElement('td');
            tdId.innerText = element.id;
            trbody.appendChild(tdId);

            let tdNombre = document.createElement('td');
            tdNombre.innerText = element.name;
            trbody.appendChild(tdNombre);

            let tdEmail = document.createElement('td');
            tdEmail.innerText = element.email;
            trbody.appendChild(tdEmail);

            let tdPassword = document.createElement('td');
            tdPassword.innerText = '******'; // Aquí puedes personalizar cómo se muestra la contraseña.
            trbody.appendChild(tdPassword);

            let tdAcciones = document.createElement('td');

            let btnEliminar = document.createElement('button');
            btnEliminar.classList.add("btn", "btn-danger");
            btnEliminar.innerText = "Eliminar";
            btnEliminar.addEventListener('click', function() {
                Eliminar(element.id, element.name, element.password); // Llamada a la función Eliminar con el ID del usuario.
            });
            tdAcciones.appendChild(btnEliminar);

            let btnActualizar = document.createElement('button');
            btnActualizar.classList.add("btn", "btn-warning");
            btnActualizar.innerText = "Actualizar";
            tdAcciones.appendChild(btnActualizar);

            let btnDetalles = document.createElement('button');
            btnDetalles.classList.add("btn", "btn-info");
            btnDetalles.innerText = "Ver detalles";
            tdAcciones.appendChild(btnDetalles);

            trbody.appendChild(tdAcciones);
            tbody.appendChild(trbody);
        });
        tabla.appendChild(tbody);
    })
    .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
    });


function Eliminar(Id, name, pass) {
    console.log("Eliminar usuario con ID:", Id);
    console.log("Eliminar usuario con NOMBRE:", name);
    console.log("Eliminar usuario con PASSWORD:", pass);
}

