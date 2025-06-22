-- ==============================================================
--  Proyecto      : Sistema de Gestión Hotelera
--  Script        : Creación y permisos de usuarios
--  Base de Datos : GestionHotelera
--  Autor         : Emilio F. & Ginger R.
--  Fecha         : 21/06/25
--
--  Descripción:
--      Este script crea dos roles de usuario:
--      1. Administrador
--      2. Usuario
-- ==============================================================

USE GestionHotelera;

-- =============================
-- Crear roles
-- =============================

CREATE ROLE Administrador;
CREATE ROLE Usuario;

-- =============================
-- Otorga permisos al rol Administrador
-- =============================

GRANT SELECT, INSERT, UPDATE, DELETE ON DATABASE::GestionHotelera TO Administrador;

-- =============================
-- Otorga permisos al usuario de tipo Usuario
-- =============================

-- Consulta vistas relevantes
GRANT SELECT ON OBJECT::Vista_Habitacion_Completa TO Usuario;
GRANT SELECT ON OBJECT::Habitacion TO Usuario;
GRANT SELECT ON OBJECT::Habitacion_Tipo TO Usuario;
GRANT SELECT ON OBJECT::Habitacion_Cama TO Usuario;
GRANT SELECT ON OBJECT::Habitacion_Comodidad TO Usuario;
GRANT SELECT ON OBJECT::Habitacion_Comodidad_Relacion TO Usuario;

-- Agrega reservaciones
GRANT EXECUTE ON OBJECT::sp_AgregarReservacion TO Usuario;
GRANT EXECUTE ON OBJECT::sp_AgregarHabitacionAReservacion TO Usuario;
GRANT EXECUTE ON OBJECT::sp_AgregarRecreacionAReservacion TO Usuario;

-- Consulta vistas generales
GRANT SELECT ON OBJECT::Vista_Establecimiento_Completo TO Usuario;
GRANT SELECT ON OBJECT::Vista_Recreacion_Completa TO Usuario;

-- =============================
-- Crea inicio de sesión
-- =============================

CREATE LOGIN loginAdministrador WITH PASSWORD = 'admin';
CREATE LOGIN loginUsuario WITH PASSWORD = 'user';

-- =============================
-- Crear usuarios en la base de datos
-- =============================

CREATE USER UsuarioAdministrador FOR LOGIN loginAdministrador;
CREATE USER UsuarioUsuario FOR LOGIN loginUsuario;

ALTER ROLE Administrador ADD MEMBER UsuarioAdministrador;
ALTER ROLE Usuario ADD MEMBER UsuarioUsuario;