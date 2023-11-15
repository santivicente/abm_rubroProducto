import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";

import useRubrosProductos from "./hooks/useRubrosProductos"; // Cambié la importación del hook

const RubrosProductosTable = React.lazy(() => import('./components/RubrosProductosTable')); // Cambié la importación del componente

const Admin: React.FC = () => {
    // Utils
    const {data, error, loading} = useRubrosProductos(); // Cambié la llamada al hook

    // Render
    if (error){
        return (
            <Alert variant="danger">
                {error?.message || 'Algo salió mal buscando rubros productos'} {/* Cambié el mensaje */}
            </Alert>
        );
    }

    return loading
        ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
                <Spinner animation="border" />
            </div>
        )
        : (
            <React.Suspense fallback={<Spinner animation="border" />}>
                <RubrosProductosTable rubrosProductos={data} /> {/* Cambié el nombre del prop y la referencia al componente */}
            </React.Suspense>
        )
};

export default Admin;
