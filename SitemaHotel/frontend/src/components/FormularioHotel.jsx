import { useEffect, useState } from 'react';

function FormularioHotel({ hotel, onGuardar, onCancelar }) {
    const [form, setForm] = useState({
        nombre: '',
        cedula_juridica: '',
        provincia: '',
        canton: '',
        distrito: '',
        barrio: '',
        senas_exactas: '',
        referencia_gps: '',
        telefono1: '',
        telefono2: '',
        telefono3: '',
        correo: '',
        url_sitio_web: '',
        id_establecimiento_tipo: '',
    });

    // Cargar datos en modo edición
    useEffect(() => {
        if (hotel) {
            setForm(hotel);
        } else {
            // Limpiar si es nuevo
            setForm({
                nombre: '',
                cedula_juridica: '',
                provincia: '',
                canton: '',
                distrito: '',
                barrio: '',
                senas_exactas: '',
                referencia_gps: '',
                telefono1: '',
                telefono2: '',
                telefono3: '',
                correo: '',
                url_sitio_web: '',
                id_establecimiento_tipo: 1
            });
        }
    }, [hotel]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const datosFiltrados = {
        nombre: form.nombre,
        cedula_juridica: form.cedula_juridica,
        id_establecimiento_tipo: form.id_establecimiento_tipo,
        provincia: form.provincia,
        canton: form.canton,
        distrito: form.distrito,
        barrio: form.barrio,
        senas_exactas: form.senas_exactas,
        referencia_gps: form.referencia_gps,
        telefono1: form.telefono1,
        telefono2: form.telefono2,
        telefono3: form.telefono3,
        correo: form.correo,
        url_sitio_web: form.url_sitio_web
    };

    // Si es edición, agregamos el ID
    if (hotel) {
        datosFiltrados.id_establecimiento = hotel.id_establecimiento;
    }

    try {
        await onGuardar(datosFiltrados);
        onCancelar();
    } catch (err) {
        console.error("Error al guardar:", err);
        alert("Ocurrió un error al guardar");
    }

};


    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
            <h3>{hotel ? 'Editar Hotel' : 'Agregar Nuevo Hotel'}</h3>

            <input name="nombre" value={form.nombre || ""} onChange={handleChange} placeholder="Nombre" required /><br />
            <input name="cedula_juridica" value={form.cedula_juridica || ""} onChange={handleChange} placeholder="Cédula Jurídica" required /><br />
            <input name="provincia" value={form.provincia || ""} onChange={handleChange} placeholder="Provincia" required /><br />
            <input name="canton" value={form.canton || ""} onChange={handleChange} placeholder="Cantón" required /><br />
            <input name="distrito" value={form.distrito || ""} onChange={handleChange} placeholder="Distrito" required /><br />
            <input name="barrio" value={form.barrio || ""} onChange={handleChange} placeholder="Barrio" required /><br />
            <input name="senas_exactas" value={form.senas_exactas || ""} onChange={handleChange} placeholder="Señas exactas" required /><br />
            <input name="referencia_gps" value={form.referencia_gps || ""} onChange={handleChange} placeholder="Referencia GPS" required /><br />
            <input name="telefono1" value={form.telefono1 || ""} onChange={handleChange} placeholder="Teléfono 1" required /><br />
            <input name="telefono2" value={form.telefono2 || ""} onChange={handleChange} placeholder="Teléfono 2" /><br />
            <input name="telefono3" value={form.telefono3 || ""} onChange={handleChange} placeholder="Teléfono 3" /><br />
            <input name="correo" value={form.correo || ""} onChange={handleChange} placeholder="Correo" required /><br />
            <input name="url_sitio_web" value={form.url_sitio_web || ""} onChange={handleChange} placeholder="Sitio web" /><br />
            <input name="id_establecimiento_tipo" value={form.id_establecimiento_tipo || ""} onChange={handleChange} placeholder="ID tipo" required /><br />

            <button type="submit">{hotel ? 'Actualizar' : 'Agregar'}</button>
            <button type="button" onClick={onCancelar}>Cancelar</button>
        </form>
    );
}

export default FormularioHotel;
