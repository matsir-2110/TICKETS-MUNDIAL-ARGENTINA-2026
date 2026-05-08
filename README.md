# Tickets Mundial Argentina 2026

Sistema web para comprar entradas de los partidos del Mundial de Fútbol 2026 en Argentina. Los usuarios pueden registrarse, ver los partidos disponibles y comprar sus entradas eligiendo sector y cantidad.

---

## Estructura del proyecto

```
TICKETS-MUNDIAL-ARGENTINA-2026/
├── client/   → Frontend (Next.js)
└── server/   → Backend (NestJS + Supabase)
```

---

## Objetivo del sistema

Que cualquier persona pueda comprar entradas para los partidos del Mundial desde una app web, de forma segura y sin que el stock se rompa si dos personas compran al mismo tiempo.

## Objetivo SMART

Desarrollar una aplicación web funcional de venta de entradas para el Mundial Argentina 2026, que permita registro de usuarios, listado de partidos y procesamiento de compras con control de stock, utilizando NestJS y Supabase, para ser entregada antes del cierre del cuatrimestre 2026.

---

## Requisitos funcionales

- El usuario puede registrarse, iniciar sesión y recuperar su contraseña
- Se pueden ver todos los partidos disponibles con fecha, equipos y precio
- El usuario autenticado puede comprar entre 1 y 6 entradas por pedido
- Al comprar se valida el stock, se crea el pedido y se descuentan las entradas
- Si el usuario no está logueado y quiere comprar, se lo redirige al login

## Requisitos no funcionales

- Las contraseñas nunca se guardan en texto plano (lo maneja Supabase Auth)
- Las credenciales van en variables de entorno, nunca en el código
- El sistema tiene que funcionar en desktop y mobile
- Si algo falla al generar tickets, el pedido no queda a medias

---

## Roles

| Rol | Qué puede hacer |
|---|---|
| Usuario no registrado | Ver partidos y precios |
| Usuario registrado | Ver partidos y comprar entradas |

---

## Stakeholders

**Internos:** equipo de desarrollo, docente de la materia  
**Externos:** hinchas que quieran comprar entradas, organizadores del evento (FIFA/AFA)

---

## Casos de uso

| CU | Actor | Descripción |
|---|---|---|
| Registrarse | Usuario | Crear cuenta con email y contraseña |
| Iniciar sesión | Usuario | Acceder al sistema con sus credenciales |
| Ver partidos | Cualquiera | Ver la lista de partidos con fecha y precio |
| Comprar entradas | Usuario autenticado | Elegir sector, cantidad y confirmar compra |
| Recuperar contraseña | Usuario | Recibir link de recuperación por email |

## Historias de usuario

- Como hincha, quiero registrarme para poder comprar entradas
- Como usuario, quiero ver todos los partidos disponibles para elegir cuál ver
- Como usuario autenticado, quiero elegir el sector y la cantidad de entradas que compro
- Como usuario, quiero que me avisen si no hay stock antes de intentar comprar
- Como usuario, quiero recuperar mi contraseña si la olvido

---

## Herramientas utilizadas

**Backend:** NestJS (TypeScript), @nestjs/config, Supabase JS  
**Frontend:** Next.js, TypeScript, Supabase JS  
**Base de datos:** Supabase (PostgreSQL en la nube + Auth integrado)  
**Otras:** Git/GitHub para versiones, Postman para probar los endpoints

---

## Esquema de la base de datos

**Partidos** — `id`, `equipo_a`, `equipo_b`, `fecha`, `precio_base`, `stock_disponible`

**Pedidos** — `id`, `usuario_id` (FK → auth.users), `monto_total`, `fecha_compra`, `estado_pago`, `referencia_pago`

**Tickets** — `id`, `pedido_id` (FK → Pedidos), `partido_id` (FK → Partidos), `sector`

Los usuarios son manejados directamente por Supabase Auth (tabla `auth.users`).

---

## Diagrama de clases

```
Usuario                   Partido
--------                  --------
- id (UUID)               - id
- email                   - equipo_a
- nombre                  - equipo_b
                          - fecha
+ login()                 - precio_base
+ register()              - stock_disponible
                          + actualizarStock()

     1                         1
     |                         |
     * crea                    * pertenece a
     |                         |
   Pedido --------*--------- Ticket
   ------                   ------
   - id                     - id
   - usuario_id             - pedido_id
   - monto_total            - partido_id
   - estado_pago            - sector
```

---

## Modelo y metodología

**Modelo:** incremental — se fue construyendo por módulos (primero partidos, luego tickets/pedidos, luego usuarios y frontend).

**Metodología:** ágil informal — sprints cortos por funcionalidad, commits frecuentes y revisión de código entre los integrantes. No son lo mismo: el modelo define *cómo se estructura el ciclo de vida* del software, la metodología define *cómo trabaja el equipo*.

---

## Riesgos

**En el proceso de desarrollo:**
- Mala elicitación de requerimientos → mitigación: validar con el docente en cada etapa
- No llegar a los tiempos de entrega → mitigación: commits incrementales para ver el avance real
- Conflictos en Git por trabajar todos en la misma rama → mitigación: usar ramas por funcionalidad

**En el producto final:**
- El login no funciona correctamente → mitigación: pruebas manuales antes de la entrega
- El stock se descuenta mal → mitigación: la validación está centralizada en `TicketsService`
- Credenciales expuestas en el repo → mitigación: `.env` en el `.gitignore`

---

## Cómo correr el proyecto

### Backend
```bash
cd server
npm install
# Crear .env con SUPABASE_URL y SUPABASE_KEY
npm run start:dev
# Disponible en http://localhost:3000
```

### Frontend
```bash
cd client
npm install
# Crear .env.local con NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
# Disponible en http://localhost:3001
```

---

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/partidos` | Lista todos los partidos |
| GET | `/partidos/:id` | Trae un partido por ID |
| POST | `/tickets/comprar` | Procesa una compra |

**Body para POST /tickets/comprar:**
```json
{
  "partidoId": 1,
  "usuarioId": "uuid-del-usuario",
  "cantidad": 2
}
```

---

## Integrantes

| Nombre | Rol |
|---|---|
| _(completar)_ | Backend |
| _(completar)_ | Frontend |
| _(completar)_ | Base de datos |

---

*Materia: Ingeniería de Software — 2026*