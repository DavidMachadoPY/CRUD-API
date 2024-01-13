
// Contenedor Principal
var root = document.getElementById("root");
root.classList.add("p-4", 'container-fluid',)
root.style.fontFamily = "Space Grotesk, sans-serif";

// Information del body
let modalBody = document.querySelector('.modal-body')

// Primera row para el boton y la barra de busqueda
let rowone = document.querySelector('.rowone')
rowone.classList.add('d-flex', 'justify-content-center', 'p-3')

// Segunda row para la tabla
let rowtwo = document.createElement('div')
rowtwo.classList.add("row")
root.appendChild(rowtwo)

// Columna del boton crear para en la primera row
let columBtn = document.createElement('div')
columBtn.classList.add("col-md-2", 'd-flex', 'justify-content-center');
rowone.appendChild(columBtn);

// Creacion del boton crear
let btCrear = document.createElement("button");
btCrear.classList.add("btn", "btn-primary");
btCrear.setAttribute("data-bs-toggle", "modal");
btCrear.setAttribute("data-bs-target", "#exampleModal");
btCrear.addEventListener("click", function () {
  activarCrear = true;
});
btCrear.innerHTML = "CREAR NUEVO USUARIO";
columBtn.appendChild(btCrear);

// Columna para la la barra de busqueda en la primera columna
let columSearch = document.createElement("div");
columSearch.classList.add("col-md-4");
rowone.appendChild(columSearch);

// Creacion de la barra de busqueda
let formSearch = document.createElement("form");
formSearch.classList.add("d-flex");
formSearch.setAttribute("role", "search");
columSearch.appendChild(formSearch)

let inputSearch = document.createElement("input");
inputSearch.classList.add('form-control', 'me-2')
inputSearch.setAttribute("type", "search");
inputSearch.setAttribute("placeholder", "Search");
inputSearch.setAttribute("aria-label", "Search");
formSearch.appendChild(inputSearch);

// Formulario
let form = document.createElement('form');
form.classList.add("p-3");
modalBody.appendChild(form);

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

let modalFooter = document.querySelector('.modal-footer')
let btnCrear = document.createElement('button');
btnCrear.classList.add("btn", "btn-success");
btnCrear.setAttribute('type', 'button');
btnCrear.setAttribute('onclick', 'update()');
btnCrear.innerText = "CREAR O ACTUALIZAR";
modalFooter.appendChild(btnCrear);

// Columna para la tabla
let col = document.createElement('div');
col.classList.add("col-md-12", "table-responsive");
rowtwo.appendChild(col);

let tabla = document.createElement('table');
tabla.classList.add("table", "table-striped", "table-hover", "table-bordered");
col.appendChild(tabla);

let thead = document.createElement('thead');
let trheader = document.createElement('tr');
["ID", "Nombre", "Email", "Password", "Acciones"].forEach(headerText => {
    let header = document.createElement('th');
    header.setAttribute('scope', 'col')
    header.classList.add("text-center")
    header.innerText = headerText;
    trheader.appendChild(header);
});
thead.appendChild(trheader);
thead.classList.add("table-dark")
tabla.appendChild(thead);

fetch("https://memin.io/public/api/users")
    .then(response => response.json(), )
    .then(data => {
        console.log(data)
        let tbody = document.createElement('tbody');
        tbody.classList.add("text-center", "table-group-divider")
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
            tdPassword.innerText = element.password; 
            trbody.appendChild(tdPassword);

            let tdAcciones = document.createElement('td');

            let btnEliminar = document.createElement('button');
            btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
            btnEliminar.innerText = "Eliminar";
            btnEliminar.addEventListener('click', function() {
                Eliminar(element.id); // Llamada a la función Eliminar con el ID del usuario.
            });
            tdAcciones.appendChild(btnEliminar);
            tdAcciones.classList.add("d-flex", "justify-content-around")

            let btnActualizar = document.createElement('button');
            btnActualizar.classList.add("btn", "btn-warning", "btn-sm")
            btnActualizar.setAttribute('data-bs-toggle', 'modal')
            btnActualizar.setAttribute('data-bs-target', '#exampleModal')
            btnActualizar.setAttribute("onclick", "GetDateRow()")
            btnActualizar.innerText = "Actualizar";
            btnActualizar.addEventListener('click', function () {
                GetDateRow(element.id, element.name, element.email, element.password)
                activarCrear = false;
            })
            tdAcciones.appendChild(btnActualizar);

            let btnDetalles = document.createElement('button');
            btnDetalles.classList.add("btn", "btn-info", "btn-sm");
            btnDetalles.setAttribute("data-bs-toggle", "modal");
            btnDetalles.setAttribute("data-bs-target", "#exampleModal2");
            btnDetalles.innerText = "Ver detalles";
            tdAcciones.appendChild(btnDetalles);
            trbody.appendChild(tdAcciones);
            btnDetalles.addEventListener("click", function () {
              showdates(element.id, element.name, element.email, element.password );
              activarCrear = false;
            });
            
            
            tbody.appendChild(trbody);

        });
        
        tabla.appendChild(tbody);
    })
    .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
    });


function Eliminar(Id) {
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
    let inputName = document.getElementById('name').value = name;
    let inputEmail = document.getElementById('email').value = email;
    let inputPassword = document.getElementById('password').value = password;
    sessionStorage.setItem('ID', id)
}

function update() {

    
    let inputNameA = document.getElementById("name").value;
    let inputEmailA = document.getElementById("email").value;
    let inputPasswordA = document.getElementById("password").value;

    if (activarCrear) {
      nawDate = {
        name: inputNameA,
        email: inputEmailA,
        password: inputPasswordA,
      };

      fetch("https://memin.io/public/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nawDate),
      }).then((data) => {
        console.log(data);
      });
    } else {
      let idCHange = sessionStorage.getItem("ID");
  
      console.log("OFF");
      updateUser = {
        name: inputNameA,
        email: inputEmailA,
        password: inputPasswordA,
      };

      fetch("https://memin.io/public/api/users/" + idCHange, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      }).then((data) => {
        console.log(data);
      });
    }
}

function closeLimpiar() {
    let inputNameA = document.getElementById('name').value = '';
    let inputEmailA = document.getElementById('email').value = '';
    let inputPasswordA = document.getElementById('password').value = '';
}

function showdates(id, name, email, password) {
  let showDetails = document.querySelector('.modal-body2')
  

}