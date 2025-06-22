-- ==============================================================
--  Proyecto      : Sistema de Gestión Hotelera
--  Script        : Vistas
--  Base de Datos : GestionHotelera
--  Autor         : Emilio F. & Ginger R.
--  Fecha         : 28/04/2025
--
--  Descripción:
--      Script para crear vistas consolidados del sistema
--      de gestión hotelera, integrando información relacional
--      de establecimientos, habitaciones, clientes, 
--      reservaciones, facturación y actividades recreativas.
-- ==============================================================

USE GestionHotelera;
GO

-- =============================================
-- Vista: Establecimientos con tipo, redes y servicios
-- =============================================

CREATE OR ALTER VIEW Vista_Establecimiento_Completo AS
SELECT 
    e.id_establecimiento,
    e.nombre AS nombre_establecimiento,
    e.cedula_juridica,
    et.nombre AS tipo_establecimiento,
    e.provincia,
    e.canton,
    e.distrito,
    e.barrio,
    e.senas_exactas,
    e.referencia_gps,
    e.telefono1,
    e.telefono2,
    e.telefono3,
    e.correo,
    e.url_sitio_web,
    rs.nombre AS nombre_red_social,
    rs.url_red_social,
    s.nombre AS nombre_servicio
FROM Establecimiento e
JOIN Establecimiento_Tipo et ON e.id_establecimiento_tipo = et.id_establecimiento_tipo
LEFT JOIN Establecimiento_Red_Social rs ON rs.id_establecimiento = e.id_establecimiento
LEFT JOIN Establecimiento_Servicio_Relacion esr ON esr.id_establecimiento = e.id_establecimiento
LEFT JOIN Establecimiento_Servicio s ON esr.id_establecimiento_servicio = s.id_establecimiento_servicio;
GO

-- =============================================
-- Vista: Habitaciones con tipo, cama, comodidades y fotos
-- =============================================

CREATE OR ALTER VIEW Vista_Habitacion_Completa AS
SELECT 
    h.id_habitacion,
    h.numero,
    h.estado,
    e.nombre AS nombre_establecimiento,
    ht.nombre AS tipo_habitacion,
    ht.descripcion AS descripcion_habitacion,
    ht.precio,
    ht.capacidad_maxima,
    hc.nombre AS tipo_cama,
    hc.descripcion AS descripcion_cama,
    c.nombre AS comodidad,
    hf.url_foto
FROM Habitacion h
JOIN Establecimiento e ON h.id_establecimiento = e.id_establecimiento
JOIN Habitacion_Tipo ht ON h.id_habitacion_tipo = ht.id_habitacion_tipo
JOIN Habitacion_Cama hc ON ht.id_habitacion_cama = hc.id_habitacion_cama
LEFT JOIN Habitacion_Comodidad_Relacion hcr ON hcr.id_habitacion_tipo = ht.id_habitacion_tipo
LEFT JOIN Habitacion_Comodidad c ON hcr.id_habitacion_comodidad = c.id_habitacion_comodidad
LEFT JOIN Habitacion_Foto hf ON hf.id_habitacion_tipo = ht.id_habitacion_tipo;
GO

-- =============================================
-- Vista: Clientes con tipo de identificación y edad
-- =============================================

CREATE OR ALTER VIEW Vista_Cliente_Completo AS
SELECT 
    c.id_cliente,
    ci.nombre AS tipo_identificacion,
    c.numero_identificacion,
    c.nombre,
    c.primer_apellido,
    c.segundo_apellido,
    c.fecha_nacimiento,
    c.pais_residencia,
    c.provincia,
    c.canton,
    c.distrito,
    c.telefono1,
    c.telefono2,
    c.telefono3,
    c.correo,
    DATEDIFF(YEAR, c.fecha_nacimiento, GETDATE()) AS edad
FROM Cliente c
JOIN Cliente_Identificacion ci ON c.id_cliente_identificacion = ci.id_cliente_identificacion;
GO

-- =============================================
-- Vista: Reservaciones con cliente, habitación y actividades
-- =============================================

CREATE OR ALTER VIEW Vista_Reservacion_Completa AS
SELECT 
    r.id_reservacion,
    c.nombre + ' ' + c.primer_apellido + ISNULL(' ' + c.segundo_apellido, '') AS nombre_cliente,
    r.fecha_ingreso,
    r.hora_ingreso,
    r.fecha_salida,
    r.hora_salida_personalizada,
    r.cantidad_personas,
    CASE WHEN r.posee_vehiculo = 1 THEN 'Sí' ELSE 'No' END AS posee_vehiculo,
    r.tipo_reservacion,
    h.numero AS numero_habitacion,
    ht.nombre AS tipo_habitacion,
    rec.nombre AS actividad_recreativa,
    rec.precio AS precio_actividad
FROM Reservacion r
JOIN Cliente c ON r.id_cliente = c.id_cliente
LEFT JOIN Habitacion_Reservacion_Relacion hrr ON hrr.id_reservacion = r.id_reservacion
LEFT JOIN Habitacion h ON hrr.id_habitacion = h.id_habitacion
LEFT JOIN Habitacion_Tipo ht ON h.id_habitacion_tipo = ht.id_habitacion_tipo
LEFT JOIN Recreacion_Reservacion_Relacion rrr ON rrr.id_reservacion = r.id_reservacion
LEFT JOIN Recreacion rec ON rrr.id_recreacion = rec.id_recreacion;
GO

-- =============================================
-- Vista: Facturación con cliente, habitaciones y actividades
-- =============================================

CREATE OR ALTER VIEW Vista_Facturacion_Completa AS
SELECT 
    f.id_facturacion,
    r.id_reservacion,
    c.nombre + ' ' + c.primer_apellido + ISNULL(' ' + c.segundo_apellido, '') AS nombre_cliente,
    f.fecha_facturacion,
    f.total,
    f.estado,
    fp.nombre AS metodo_pago,
    r.fecha_ingreso,
    r.fecha_salida,
    r.tipo_reservacion,
    h.numero AS numero_habitacion,
    ht.nombre AS tipo_habitacion,
    ht.precio AS precio_habitacion,
    rec.nombre AS actividad_recreativa,
    rec.precio AS precio_actividad
FROM Facturacion f
JOIN Reservacion r ON f.id_reservacion = r.id_reservacion
JOIN Cliente c ON r.id_cliente = c.id_cliente
JOIN Facturacion_Metodo_Pago fp ON f.id_facturacion_metodo_pago = fp.id_facturacion_metodo_pago
LEFT JOIN Habitacion_Reservacion_Relacion hrr ON hrr.id_reservacion = r.id_reservacion
LEFT JOIN Habitacion h ON hrr.id_habitacion = h.id_habitacion
LEFT JOIN Habitacion_Tipo ht ON h.id_habitacion_tipo = ht.id_habitacion_tipo
LEFT JOIN Recreacion_Reservacion_Relacion rrr ON rrr.id_reservacion = r.id_reservacion
LEFT JOIN Recreacion rec ON rrr.id_recreacion = rec.id_recreacion;
GO

-- =============================================
-- Vista: Actividades recreativas con tipos y servicios
-- =============================================

CREATE OR ALTER VIEW Vista_Recreacion_Completa AS
SELECT 
    r.id_recreacion,
    r.nombre AS nombre_actividad,
    r.descripcion,
    r.precio,
    re.nombre AS empresa,
    re.telefono1 AS telefono_empresa,
    re.correo AS correo_empresa,
    rt.nombre AS tipo_actividad,
    rs.nombre AS servicio_incluido
FROM Recreacion r
JOIN Recreacion_Empresa re ON r.id_recreacion_empresa = re.id_recreacion_empresa
LEFT JOIN Recreacion_Tipo_Relacion rtr ON rtr.id_recreacion = r.id_recreacion
LEFT JOIN Recreacion_Tipo rt ON rtr.id_recreacion_tipo = rt.id_recreacion_tipo
LEFT JOIN Recreacion_Servicio_Relacion rsr ON rsr.id_recreacion = r.id_recreacion
LEFT JOIN Recreacion_Servicio rs ON rsr.id_recreacion_servicio = rs.id_recreacion_servicio;
GO
