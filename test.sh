#!/bin/bash

# Test de GET /usuarios
echo "Testeando GET /usuarios"
curl localhost:8080/usuarios
echo ""
echo "------"

# Test de POST /usuarios
echo "Testeando POST /usuarios"
curl -X POST -d '{"nombre":"test", "password":"1234"}' -H "Content-Type: application/json" localhost:8080/usuarios
echo "------"

# Test de PUT /usuarios/test
echo "Testeando PUT /usuarios/test"
curl -X PUT -d '{"password":"aaaaaaaaaaaa"}' -H "Content-Type: application/json" localhost:8080/usuarios/test
echo "------"

# Test de GET /usuarios/test
echo "Testeando GET /usuarios/test"
curl localhost:8080/usuarios/test
echo "------"

# Test de DELETE /usuarios/test
echo "Testeando DELETE /usuarios/test"
curl -X DELETE localhost:8080/usuarios/test
echo "------"
