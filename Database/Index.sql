-- ==============================================================
--  Proyecto      : Sistema de Gestión Hotelera
--  Script        : Creación de Índices
--  Base de Datos : GestionHotelera
--  Autor         : Emilio F. & Ginger R.
--  Fecha         : 24/06/25
--
--  Descripción:
--      Este scrit crea índices adicionales para optimizar
--      las consultas más frecuentes del sistema, tales como
--      búsquedas por fechas, relaciones entre entidades
--      y reportes por cliente, reservación y establecimiento.
-- ==============================================================

USE GestionHotelera;

-- =============================
-- Índices sobre Reservación
-- =============================
CREATE INDEX idx_reservacion_fecha_ingreso
ON Reservacion(fecha_ingreso);

CREATE INDEX idx_reservacion_fecha_salida
ON Reservacion(fecha_salida);

CREATE INDEX idx_reservacion_cliente
ON Reservacion(id_cliente);

CREATE INDEX idx_reservacion_estado
ON Reservacion(estado);

-- =============================
-- Índices sobre Facturación
-- =============================
CREATE INDEX idx_facturacion_reservacion
ON Facturacion(id_reservacion);

CREATE INDEX idx_facturacion_estado
ON Facturacion(estado);

CREATE INDEX idx_facturacion_fecha
ON Facturacion(fecha_facturacion);

-- =============================
-- Índices sobre Habitaciones
-- =============================
CREATE INDEX idx_habitacion_establecimiento
ON Habitacion(id_establecimiento);

CREATE INDEX idx_habitacion_tipo
ON Habitacion(id_habitacion_tipo);

CREATE INDEX idx_habitacion_estado
ON Habitacion(estado);

-- =============================
-- Índices sobre Cliente
-- =============================
CREATE INDEX idx_cliente_identificacion
ON Cliente(numero_identificacion);

CREATE INDEX idx_cliente_nombre
ON Cliente(nombre, primer_apellido, segundo_apellido);

-- =============================
-- Índices sobre Recreación
-- =============================
CREATE INDEX idx_recreacion_empresa
ON Recreacion(id_recreacion_empresa);

-- =============================
-- Índices sobre Relaciones
-- =============================
CREATE INDEX idx_habitacion_reservacion
ON Habitacion_Reservacion_Relacion(id_reservacion, id_habitacion);

CREATE INDEX idx_recreacion_reservacion
ON Recreacion_Reservacion_Relacion(id_reservacion, id_recreacion);

CREATE INDEX idx_establecimiento_servicio
ON Establecimiento_Servicio_Relacion(id_establecimiento, id_establecimiento_servicio);

CREATE INDEX idx_habitacion_comodidad
ON Habitacion_Comodidad_Relacion(id_habitacion_tipo, id_habitacion_comodidad);

CREATE INDEX idx_recreacion_tipo
ON Recreacion_Tipo_Relacion(id_recreacion, id_recreacion_tipo);

CREATE INDEX idx_recreacion_servicio
ON Recreacion_Servicio_Relacion(id_recreacion, id_recreacion_servicio);
