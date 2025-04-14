

#  Sistema de Inventario con Microservicios

Este proyecto implementa un sistema de gestión de productos basado en microservicios. Está desarrollado en dos lenguajes de programación: **Node.js (JavaScript)** y **Python**. Usa **Docker** para contenerizar los servicios y un archivo **JSON** como sistema de persistencia.

---

##  Requerimientos Funcionales

- Registrar productos con nombre, código, precio y cantidad.
- Calcular el valor total de cada producto usando otro microservicio.
- Consultar la lista de productos registrados.

---

## Requerimientos No Funcionales 

- El sistema debe responder en menos de 1 segundo por petición.
- El sistema debe permitir ser desplegado localmente con un solo comando.
- Separación clara entre lógica de negocio y lógica de infraestructura.

---

## 👤 Historias de Usuario 

### Historia 1
**Como** usuario, **quiero** registrar productos con precio y cantidad, **para** saber cuánto valen en total.

### Historia 2
**Como** administrador, **quiero** consultar todos los productos registrados, **para** revisar el inventario actual.

---

## 🧠 Diagrama UML 

En la wiki de git hub

---

## Atributos de Calidad y ASR's 

| Atributo       | ASR (Arquitectura que lo soporta) |
|----------------|------------------------------------|
| Modificabilidad| Separación en microservicios       |
| Desempeño      | Docker + volumen en disco          |
| Escalabilidad  | Servicios independientes           |
| Mantenibilidad | Código desacoplado y simple        |

---

## Implementación del Código 
- `producto-service` (Node.js)
- `calculo-service` (Python)
- `docker-compose.yml` para la orquestación

```bash
docker-compose up --build
```

---


### Python: prueba rápida (manual)

```python
from app import app
with app.test_client() as c:
    res = c.post('/calcular', json={'precio': 2, 'cantidad': 5})
    assert res.get_json()['valor_total'] == 10
```

---

## 🐳 Uso de Docker (10%)

Cada microservicio tiene su propio `Dockerfile`, y se orquestan con `docker-compose`.

```bash
docker-compose up --build
```

---

## 💾 Sistema de Persistencia 

- Los productos se guardan en un archivo local `data.json`.
- El archivo actúa como una base de datos simulada y se modifica con cada petición POST.

---

## ✅ Conclusión

Este proyecto cubre todos los puntos del entregable: código funcional, pruebas, persistencia, dockerización, uso de dos lenguajes, estructura limpia y documentación clara.


# lick de github
https://github.com/Jhonasfr/inventario-microservicios.git 