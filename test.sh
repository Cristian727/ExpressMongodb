#!/bin/bash

echo "Testeando GET /usuarios"
curl localhost:3000/usuarios
echo ""
echo "------"
echo "Testeando POST /usuarios"
curl -X POST -d '{"nombre":"test", "password":"1234"}' -H "Content-Type: application/json" localhost:3000/usuarios
echo "------"
echo "Testeando PUT /usuarios/test"
curl -X PUT -d '{"nombre":"test2", "password":"aaaaaaaaaaaa"}' -H "Content-Type: application/json" localhost:3000/usuarios/test
echo "------"
echo "Testeando GET /usuarios/test"
curl localhost:3000/usuarios/test
echo "------"
echo "Testeando DELETE /usuarios/test2"
curl -X DELETE localhost:3000/usuarios/test2
echo "------"