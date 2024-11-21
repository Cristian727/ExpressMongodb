// client/script.js
const apiUrl = 'http://localhost:8080/usuarios';

// Obtener la lista de usuarios y mostrarla
async function obtenerUsuarios() {
  try {
    const response = await fetch(apiUrl);
    const usuarios = await response.json();
    const usuariosList = document.getElementById('usuarios');
    usuariosList.innerHTML = '';

    usuarios.forEach(usuario => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${usuario.nombre}</strong>
        <button onclick="eliminarUsuario('${usuario.nombre}')">Eliminar</button>
        <button onclick="editarUsuario('${usuario.nombre}', '${usuario.password}')">Editar</button>
      `;
      usuariosList.appendChild(li);
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

// Agregar o actualizar un usuario
document.getElementById('guardar-btn').addEventListener('click', async () => {
  const nombre = document.getElementById('nombre').value;
  const password = document.getElementById('password').value;

  const usuario = { nombre, password };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    });

    if (response.ok) {
      alert('Usuario guardado correctamente');
      obtenerUsuarios();
      document.getElementById('nombre').value = '';
      document.getElementById('password').value = '';
    } else {
      alert('Error al guardar el usuario');
    }
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
  }
});

// Eliminar un usuario
async function eliminarUsuario(nombre) {
  if (confirm(`¿Seguro que quieres eliminar al usuario ${nombre}?`)) {
    try {
      const response = await fetch(`${apiUrl}/${nombre}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Usuario eliminado');
        obtenerUsuarios();
      } else {
        alert('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }
}

// Editar un usuario
function editarUsuario(nombre, password) {
  document.getElementById('nombre').value = nombre;
  document.getElementById('password').value = password;

  document.getElementById('guardar-btn').addEventListener('click', async () => {
    const nuevoNombre = document.getElementById('nombre').value;
    const nuevaContraseña = document.getElementById('password').value;

    const usuario = { nombre: nuevoNombre, password: nuevaContraseña };

    try {
      const response = await fetch(`${apiUrl}/${nombre}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        alert('Usuario actualizado correctamente');
        obtenerUsuarios();
        document.getElementById('nombre').value = '';
        document.getElementById('password').value = '';
      } else {
        alert('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  });
}

// Llamar a obtenerUsuarios para cargar la lista inicial
obtenerUsuarios();
