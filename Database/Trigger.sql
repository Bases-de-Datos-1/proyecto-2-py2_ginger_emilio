-- ==============================================================
--  Proyecto      : Sistema de Gestión Hotelera - PY2
--  Script        : Triggers
--  Base de Datos : GestionHotelera
--  Autor         : Emilio F. & Ginger R.
--  Fecha         : 19/06/2025
--  Descripción:
--      Triggers que gestionan la lógica
--      de negocio como generación de facturas
-- ==============================================================

USE GestionHotelera;

-- =============================================
-- Trigger: Crear factura cuando una reservación se cierra
-- =============================================

CREATE TRIGGER trg_GenerarFacturaAlCerrarReservacion
ON Reservacion
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Inserta facturación solo si el estado cambió a 'CERRADA'
    INSERT INTO Facturacion (id_reservacion, id_facturacion_metodo_pago, fecha_facturacion, total, estado)
    SELECT 
        r.id_reservacion,
        1,                            -- Método de pago por defecto
        GETDATE(),
        0,                            -- Monto por defecto
        'PENDIENTE'
    FROM 
        inserted r
    JOIN 
        deleted d ON r.id_reservacion = d.id_reservacion
    WHERE 
        r.estado = 'CERRADA' AND d.estado <> 'CERRADA'
        AND NOT EXISTS (
            SELECT 1 
            FROM Facturacion f 
            WHERE f.id_reservacion = r.id_reservacion
        );
END;

-- =============================================
-- Trigger: Impedir eliminación de Reservaciones
-- =============================================

CREATE TRIGGER trg_PreventDelete_Reservacion
ON Reservacion
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('Oops!! No se permite eliminar una reservación...', 16, 1);
END;

-- =============================================
-- Trigger: Impedir eliminación de Facturación
-- =============================================

CREATE TRIGGER trg_PreventDelete_Facturacion
ON Facturacion
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('Oops!! No se permite eliminar una factura...', 16, 1);
END;

-- =============================================
-- Trigger: Impedir eliminación de Cliente
-- =============================================

CREATE TRIGGER trg_PreventDelete_Cliente
ON Cliente
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('Oops!! No se permite eliminar un cliente...', 16, 1);
END;
  