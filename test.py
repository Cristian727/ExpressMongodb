import requests

def test_get_usuarios():
    response = requests.get('http://localhost:3000/usuarios')
    assert response.status_code == 200

def test_post_usuarios(nombre, password):
    response = requests.post('http://localhost:3000/usuarios', json={'nombre': nombre, 'password': password})
    assert response.status_code == 201

def test_get_usuario(name):
    response = requests.get(f'http://localhost:3000/usuarios/{name}')
    assert response.status_code == 200

def test_put_usuario(nombre_actual, nombre_nuevo, contraseña_nuevo):
    response = requests.put(f'http://localhost:3000/usuarios/{nombre_actual}', json={'nombre': nombre_nuevo, 'password': contraseña_nuevo})
    assert response.status_code == 200

def test_delete_usuario(name):
    response = requests.delete(f'http://localhost:3000/usuarios/{name}')
    assert response.status_code == 204

test_get_usuarios();
test_post_usuarios('test', 'test');
test_get_usuario(1);
test_put_usuario('test', 'test2', 'test2');
test_delete_usuario("test2");
