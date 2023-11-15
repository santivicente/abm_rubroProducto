import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import './Table.css';

import RubroProducto from '../../../Types/rubroProducto';
import DataLayer from '../../../lib/data-layer';

const DeleteRubroProductoModal = React.lazy(() => import('./DeleteRubroProductoModal'));
const SaveRubroProductoModal = React.lazy(() => import('./SaveRubroProductoModal'));

type RubrosProductosTableProps = {
    rubrosProductos: RubroProducto[];
};

const emptyRubroProducto: RubroProducto = {
    denominacion: '',
    // Otros campos aquí...
};

const RubrosProductosTable: React.FC<RubrosProductosTableProps> = ({ rubrosProductos }) => {
    const [error, setError] = React.useState<any>(null);
    const [listedRubrosProductos, setListedRubrosProductos] = React.useState<RubroProducto[]>(rubrosProductos);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedRubroProducto, setSelectedRubroProducto] = React.useState<RubroProducto | null>(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
    const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

    const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
    const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
    
    const onDelete = React.useCallback(() => {
        if (selectedRubroProducto) {
            setShowDeleteModal(false);
            setLoading(true);
            DataLayer.delete.rubroProducto(selectedRubroProducto.id!)
                .then(() => setListedRubrosProductos((prevState: RubroProducto[]) => prevState.filter((item: RubroProducto) => item.id !== selectedRubroProducto.id)))
                .catch((error: any) => setError(error))
                .finally(() => setLoading(false));
        }
    }, [selectedRubroProducto, setShowDeleteModal, setListedRubrosProductos, setLoading]);

    const onSave = React.useCallback((i: RubroProducto) => {
        if (selectedRubroProducto) {
            setShowSaveModal(false);
            setLoading(true);
            if (i.id) {
                DataLayer.update.rubroProducto(i)
                    .then((editedRubroProducto: RubroProducto) => setListedRubrosProductos((prevState: RubroProducto[]) => prevState.map((item: RubroProducto) => item.id === editedRubroProducto.id ? editedRubroProducto : item)))
                    .catch((error: any) => setError(error))
                    .finally(() => setLoading(false));
            } else {
                delete i.id;

                DataLayer.create.rubroProducto(i)
                    .then((createdRubroProducto: RubroProducto) => {
                        setListedRubrosProductos((prevState: RubroProducto[]) => [...prevState, createdRubroProducto]);
                    })
                    .catch((error: any) => setError(error))
                    .finally(() => setLoading(false));
            }
        }
    }, [selectedRubroProducto, setShowSaveModal, setListedRubrosProductos, setLoading]);

    const onShowDeleteModal = React.useCallback((i: RubroProducto) => {
        setSelectedRubroProducto(i);
        setShowDeleteModal(true);
    }, [setSelectedRubroProducto, setShowDeleteModal]);

    const onShowSaveModal = React.useCallback((i?: RubroProducto) => {
        setSelectedRubroProducto(i ?? emptyRubroProducto);
        setShowSaveModal(true);
    }, [setSelectedRubroProducto, setShowSaveModal]);

    if (error) {
        return (
            <Alert variant="danger">
                {error?.message || 'Algo fue mal mientras buscaba productos'}
            </Alert>
        );
    }

    return (
        <React.Suspense fallback={<Spinner animation="border" />}>
            {loading
                ? (
                    <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
                        <Spinner animation="border" />
                    </div>
                )
                : (
                    <div className="cuerpote">
                        <Button onClick={() => onShowSaveModal()} style={{ float: 'right', margin: 10 }} variant="primary">Crear RubroProducto</Button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Denomiacion</th>
                                    {/* Otros encabezados aquí... */}
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listedRubrosProductos.map((i: RubroProducto) => (
                                    <tr key={i.id}>
                                        <td width='2%'>{i.id}</td>
                                        <td width='23%'>{i.denominacion}</td>
                                        {/* Otros campos aquí... */}
                                        <td width='10%' justify-content='space-around'>
                                            <Button onClick={() => onShowSaveModal(i)} variant="secondary">Editar</Button>
                                            <Button onClick={() => onShowDeleteModal(i)} variant="secondary">Borrar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            <DeleteRubroProductoModal
                onDelete={onDelete}
                onHide={onCloseDeleteModal}
                rubroProducto={selectedRubroProducto}
                show={showDeleteModal}
            />
            <SaveRubroProductoModal
                onSave={onSave}
                onHide={onCloseSaveModal}
                rubroProducto={selectedRubroProducto}
                show={showSaveModal}
            />
        </React.Suspense>
    );
};

export default RubrosProductosTable;
