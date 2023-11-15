import * as React from 'react';

import DataLayer from '../lib/data-layer';
import RubroProducto from '../Types/rubroProducto';

type UseRubrosProductosState = { 
    data: RubroProducto[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    loading: boolean;
};

const initialState: UseRubrosProductosState = { // Cambié el nombre del estado
    data: [],
    error: null,
    loading: true,
};

const useRubrosProductos = () => { // Cambié el nombre del hook
    // State
    const [state, setState] = React.useState<UseRubrosProductosState>(initialState); // Cambié el nombre del estado

    // Effects
    React.useEffect(() => {
        function fetchRubrosProductos() { // Cambié el nombre de la función
            DataLayer.fetch.rubrosProductos() // Cambié el nombre del método de fetch
                .then((data: RubroProducto[]) => setState({ data, error: null, loading: false }))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => setState({ data: [], error, loading: false }));
        }

        fetchRubrosProductos();
    }, [setState]);

    return state;
};

export default useRubrosProductos; 
