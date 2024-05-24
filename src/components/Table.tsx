import React, { useState, useEffect } from "react";
import { IonButton, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import UserCreation from '../components/NewProduct/UserCreation';
import EditIcon from './Botones/EditIcon';
import DeleteIcon from './Botones/DeleteIcon';
import UpdateUser from '../components/NewProduct/UpdateUser';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function App() {
    const [estadoFrom, setCerraFrom] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [tableLoaded, setTableLoaded] = useState(false);

    useEffect(() => {
        setTableLoaded(true);
    }, []);

    const handleExportToPDF = () => {
        if (!tableLoaded) {
            console.error("Error: Table not loaded yet");
            return;
        }

        const doc = new jsPDF();
        doc.autoTable({ html: '#table-to-export ion-list' });

        doc.save('tabla.pdf');
    };

    return (
        <IonContent>
            <div className="container mt-4 px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex flex-row space-x-2">
                        <IonButton color="primary" onClick={() => setCerraFrom(!estadoFrom)}>
                            Agregar nuevo producto
                        </IonButton>
                        <IonButton onClick={handleExportToPDF}>
                            Exportar a PDF
                        </IonButton>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <IonList id="table-to-export" className="min-w-full divide-y divide-gray-200">
                        <IonItem className="bg-gray-100">
                            <IonLabel className="w-full md:w-1/6 text-center font-medium">ID</IonLabel>
                            <IonLabel className="w-full md:w-1/6 text-center font-medium">Nombre Del Producto</IonLabel>
                            <IonLabel className="w-full md:w-1/6 text-center font-medium">Código del Producto</IonLabel>
                            <IonLabel className="w-full md:w-1/6 text-center font-medium">Cantidad</IonLabel>
                            <IonLabel className="w-full md:w-1/6 text-center font-medium">Categoría</IonLabel>
                            <IonLabel className="w-full md:w-1/6 text-center font-medium">Acciones</IonLabel>
                        </IonItem>
                        <IonItem className="flex flex-wrap space-x-2">
                            <IonLabel className="w-full md:w-1/6 text-center">1</IonLabel>
                            <IonLabel className="w-full md:w-1/6 text-center">Samsung</IonLabel>
                            <IonLabel className="w-full md:w-1/6 text-center">32442</IonLabel>
                            <IonLabel className="w-full md:w-1/6 text-center">3</IonLabel>
                            <IonLabel className="w-full md:w-1/6 text-center">Teléfono</IonLabel>
                            <div className="w-full md:w-1/6 flex justify-center md:justify-end items-center space-x-2">
                                <IonButton fill="clear" className="p-0 m-0 w-13 h-16" onClick={() => setOpenForm(!openForm)}>
                                    <EditIcon />
                                </IonButton>
                                <IonButton fill="clear" className="p-0 m-0 w-15 h-12" onClick={() => alert('Delete action')}>
                                    <DeleteIcon />
                                </IonButton>
                            </div>
                        </IonItem>
                    </IonList>
                </div>
            </div>

            {estadoFrom && (
                <UserCreation
                    abrir={estadoFrom}
                    cerra={() => setCerraFrom(false)}
                />
            )}
            {openForm && (
                <UpdateUser
                    open={openForm}
                    close={() => setOpenForm(false)}
                />
            )}
        </IonContent>
    );
}
