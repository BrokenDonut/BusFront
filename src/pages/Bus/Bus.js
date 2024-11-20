import React, { useState, useEffect } from 'react';

export default function Bus() {
    const [buses, setBuses] = useState([]);
    const [searchId, setSearchId] = useState('');
    const apiUrlBus = 'http://localhost:8080/bus';

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await fetch(apiUrlBus);
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                const data = await response.json();
                setBuses(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchBuses();
    }, []);

    const handleSearch = async () => {
        if (!searchId) {
            alert('Por favor, ingrese un ID');
            return;
        }

        try {
            const response = await fetch(`${apiUrlBus}/${searchId}`);
            if (!response.ok) {
                throw new Error('Bus no encontrado');
            }
            const bus = await response.json();
            alert(`
                ID: ${bus.id}
                Número de Bus: ${bus.numeroBus}
                Placa: ${bus.placa}
                Fecha de Creación: ${new Date(bus.fechaCreacion).toLocaleDateString()}
                Características: ${bus.caracteristicas || 'N/A'}
                Estado: ${bus.estado}
                Marca: ${bus.marcaBus?.nombre || 'Sin Marca'}
            `);
        } catch (error) {
            alert('Error: No se encontró el bus con el ID proporcionado');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Listado de Buses</h1>

            <div className="input-group mb-4">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Buscar por ID de Bus"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Buscar
                </button>
            </div>

            {buses.length > 0 ? (
                <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Número de Bus</th>
                        <th>Placa</th>
                        <th>Fecha de Creación</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {buses.map((bus) => (
                        <tr key={bus.id}>
                            <td>{bus.numeroBus}</td>
                            <td>{bus.placa}</td>
                            <td>{new Date(bus.fechaCreacion).toLocaleDateString()}</td>
                            <td>{bus.estado}</td>
                            <td>
                                <a href={`/bus/${bus.id}`} className="btn btn-success">
                                    Ver Más
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            ) : (
                <div className="alert alert-info text-center" role="alert">
                    No hay buses para mostrar.
                </div>
            )}
        </div>
    );
}
