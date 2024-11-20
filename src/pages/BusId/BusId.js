import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook para acceder a los parámetros de la ruta

export default function BusId() {
    const { id } = useParams(); // Extrae el parámetro `id` de la URL
    const [bus, setBus] = useState(null);
    const [error, setError] = useState(null);
    const apiUrlBus = `http://localhost:8080/bus/${id}`;

    useEffect(() => {
        const fetchBusById = async () => {
            try {
                const response = await fetch(apiUrlBus);
                if (!response.ok) {
                    throw new Error('No se encontró el bus');
                }
                const data = await response.json();
                setBus(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBusById();
    }, [apiUrlBus]);

    return (
        <div className="container mt-5">
            {error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : bus ? (
                <div>
                    <h1 className="mb-4">Detalles del Bus</h1>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>ID:</strong> {bus.id}
                        </li>
                        <li className="list-group-item">
                            <strong>Número de Bus:</strong> {bus.numeroBus}
                        </li>
                        <li className="list-group-item">
                            <strong>Placa:</strong> {bus.placa}
                        </li>
                        <li className="list-group-item">
                            <strong>Fecha de Creación:</strong> {new Date(bus.fechaCreacion).toLocaleDateString()}
                        </li>
                        <li className="list-group-item">
                            <strong>Características:</strong> {bus.caracteristicas || 'N/A'}
                        </li>
                        <li className="list-group-item">
                            <strong>Estado:</strong> {bus.estado}
                        </li>
                        <li className="list-group-item">
                            <strong>Marca:</strong> {bus.marcaBus?.nombre || 'Sin Marca'}
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
            )}
            <a href='/bus' className='btn btn-primary mt-2'>Regresar</a>
        </div>
    );
}
