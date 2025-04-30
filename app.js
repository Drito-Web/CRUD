const form = document.getElementById('formUsuario');
const cuerpoTabla = document.getElementById('cuerpoTabla');
let indiceEditando = null;


let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function renderUsuarios() {
  cuerpoTabla.innerHTML = '';
  usuarios.forEach((usuario, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.telefono}</td>
      <td>${usuario.cargo}</td>
    <td>
        <button onclick="editarUsuario(${index})"><i class="fas fa-edit"></i></button>
        <button onclick="eliminarUsuario(${index})"><i class="fas fa-trash-alt"></i></button>
        <button onclick="mostrarQR(${index})"><i class="fas fa-qrcode"></i></button>
    </td>

    `;
    cuerpoTabla.appendChild(fila);
  });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const cargo = document.getElementById('cargo').value;
  
    const nuevoUsuario = { nombre, correo, telefono, cargo };
  
    if (indiceEditando !== null) {
      usuarios[indiceEditando] = nuevoUsuario;
      indiceEditando = null;
    } else {
      usuarios.push(nuevoUsuario);
    }
  
    guardarUsuarios();
    renderUsuarios();
    form.reset();
  });
  

function eliminarUsuario(index) {
  usuarios.splice(index, 1);
  guardarUsuarios();
  renderUsuarios();
}

function editarUsuario(index) {
  const usuario = usuarios[index];
  document.getElementById('nombre').value = usuario.nombre;
  document.getElementById('correo').value = usuario.correo;
  document.getElementById('telefono').value = usuario.telefono;
  document.getElementById('cargo').value = usuario.cargo;

  indiceEditando = index;
}

renderUsuarios();

// Inicializar el QR vacío  
function mostrarQR(index) {
  const usuario = usuarios[index];
  const contenido = `Nombre:${usuario.nombre}, Correo:${usuario.correo}, Tel:${usuario.telefono}, Cargo:${usuario.cargo}`;

  const qrBox = document.getElementById('qr-box');
  qrBox.innerHTML = ''; // Limpia QR anterior

  new QRCode(qrBox, {
    text: contenido,
    width: 200,
    height: 200,
    correctLevel: QRCode.CorrectLevel.L
  });

  document.getElementById('contenedorQR').style.display = 'flex';
}


function inicializarModalQR() {
  const contenedorQR = document.getElementById('contenedorQR');
  const qrBox = document.getElementById('qr-box');

  // Ocultar modal al cargar
  contenedorQR.style.display = 'none';
  qrBox.innerHTML = '';

  // Cierre del modal al hacer clic afuera o sobre el contenido
  contenedorQR.addEventListener('click', function(e) {
    if (e.target.id === 'contenedorQR' || e.target.classList.contains('modal-contenido')) {
      contenedorQR.style.display = 'none';
      qrBox.innerHTML = ''; // Opcional: limpia el código QR al cerrar
    }
  });
}

window.addEventListener('DOMContentLoaded', inicializarModalQR);
