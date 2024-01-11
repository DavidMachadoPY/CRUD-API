var root = document.getElementById("root");
root.classList.add("p-4")

// Columna para el formulario
let col0 = document.createElement('div');
col0.classList.add("col-md-3");
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
inputName.setAttribute('id', 'name');
spaceinput.appendChild(inputName);

let labelEmail = document.createElement('label');
labelEmail.classList.add("form-label");
labelEmail.textContent = "EMAIL";
spaceinput.appendChild(labelEmail);

let inputEmail = document.createElement('input');
inputEmail.classList.add("form-control");
inputEmail.setAttribute('type', 'email');
inputEmail.setAttribute('id', 'email');
spaceinput.appendChild(inputEmail);

let labelPassword = document.createElement('label');
labelPassword.classList.add("form-label");
labelPassword.textContent = "PASSWORD";
spaceinput.appendChild(labelPassword);

let inputPassword = document.createElement('input');
inputPassword.classList.add("form-control");
inputPassword.setAttribute('type', 'text');
inputPassword.setAttribute('id', 'password');
spaceinput.appendChild(inputPassword);

let btnCrear = document.createElement('button');
btnCrear.classList.add("btn", "btn-success");
btnCrear.setAttribute('type', 'button');
btnCrear.setAttribute('onclick', 'update()');
btnCrear.innerText = "CREAR O ACTUALIZAR";
form.appendChild(btnCrear);

// Columna para la tabla
let col = document.createElement('div');
col.classList.add("col-md-9", "table-responsive");
root.appendChild(col);

let tabla = document.createElement('table');
tabla.classList.add("table", "table-striped");
col.appendChild(tabla);

let thead = document.createElement('thead');
let trheader = document.createElement('tr');
["ID", "Nombre", "Email", "Password", "Acciones"].forEach(headerText => {
    let header = document.createElement('th');
    header.setAttribute('scope', 'col')
    header.innerText = headerText;
    trheader.appendChild(header);
});
thead.appendChild(trheader);
tabla.appendChild(thead);

fetch("https://memin.io/public/api/users")
    .then(response => response.json(), )
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
            tdPassword.innerText = '********'; 
            trbody.appendChild(tdPassword);

            let tdAcciones = document.createElement('td');

            let btnEliminar = document.createElement('button');
            btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
            btnEliminar.innerText = "Eliminar";
            btnEliminar.addEventListener('click', function() {
                Eliminar(element.id); // Llamada a la función Eliminar con el ID del usuario.
            });
            tdAcciones.appendChild(btnEliminar);

            let btnActualizar = document.createElement('button');
            btnActualizar.classList.add("btn", "btn-warning", "btn-sm");
            btnActualizar.setAttribute("onclick", "GetDateRow()")
            btnActualizar.innerText = "Actualizar";
            casa = element.id
            btnActualizar.addEventListener('click', function () {
                GetDateRow(element.id, element.name, element.email, element.password)
            })
            tdAcciones.appendChild(btnActualizar);

            let btnDetalles = document.createElement('button');
            btnDetalles.classList.add("btn", "btn-info", "btn-sm");
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
    console.log(`id: , ${Id}`);
    fetch("https://memin.io/public/api/users/" + Id, {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
    });

    
    console.log("Eliminar usuario con ID:", Id);
}

function GetDateRow(id, name, email, password) {
    let inputName = document.getElementById('name');
    inputName.value = name;
    let inputEmail = document.getElementById('email');
    inputEmail.value = email;
    let inputPassword = document.getElementById('password')
    inputPassword.value = password;
    console.log("LISTO PARA MODIFICAR", name, "/n", email, "/n", password);
    sessionStorage.setItem('ID', id)
    
}

function cojeID(id) {
    console.log(id)
}

function update() {
    let idCHange = sessionStorage.getItem('ID')
    
    let inputNameA = document.getElementById('name').value;
    let inputEmailA = document.getElementById('email').value;
    let inputPasswordA = document.getElementById('password').value;
    
    nawDate = {
        "name": inputNameA,
        "email": inputEmailA,
        "password": inputPasswordA
    }
    
    fetch("https://memin.io/public/api/users/" + idCHange, {
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(nawDate)
    })
   .then(data => {
       console.log(data.ok);
   })

}
