-- ==============================================================
--  Proyecto      : Sistema de Gesti�n Hotelera - PY2
--  Script        : Triggers
--  Base de Datos : GestionHotelera
--  Autor         : Emilio F. & Ginger R.
--  Fecha         : 19/06/2025
--  Descripci�n:
--      Triggers que gestionan la l�gica
--      de negocio como generaci�n de facturas
-- ==============================================================

USE GestionHotelera;

-- =============================================
-- Trigger: Crear factura cuando una reservaci�n se cierra
-- =============================================

CREATE TRIGGER trg_GenerarFacturaAlCerrarReservacion
ON Reservacion
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Inserta facturaci�n solo si el estado cambi� a 'CERRADA'
    INSERT INTO Facturacion (id_reservacion, id_facturacion_metodo_pago, fecha_facturacion, total, estado)
    SELECT 
        r.id_reservacion,
        1,                            -- M�todo de pago por defecto
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
-- Trigger: Impedir eliminaci�n de Reservaciones
-- =============================================

CREATE TRIGGER trg_PreventDelete_Reservacion
ON Reservacion
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('Oops!! No se permite eliminar una reservaci�n...', 16, 1);
END;

-- =============================================
-- Trigger: Impedir eliminaci�n de Facturaci�n
-- =============================================

CREATE TRIGGER trg_PreventDelete_Facturacion
ON Facturacion
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('Oops!! No se permite eliminar una factura...', 16, 1);
END;

-- =============================================
-- Trigger: Impedir eliminaci�n de Cliente
-- =============================================

CREATE TRIGGER trg_PreventDelete_Cliente
ON Cliente
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('Oops!! No se permite eliminar un cliente...', 16, 1);
END;
  