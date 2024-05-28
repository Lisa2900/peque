import React, { useState, useEffect } from "react";
import { IonButton, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import UserCreation from '../components/NewProduct/UserCreation';
import EditIcon from './Botones/EditIcon';
import DeleteButton from './Botones/DeleteButton'; // Importa el nuevo componente
import UpdateUser from '../components/NewProduct/UpdateUser';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { db } from '../firebase'; // Importa la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore'; // Importa las funciones necesarias de Firebase Firestore

interface InventarioItem {
    id: string;
    nombre: string;
    codigo: string;
    cantidad: number;
    categoria: string;
}

interface jsPDFWithAutoTable extends jsPDF {
    autoTable: (options: any) => jsPDF;
}

interface CreateUserFormProps {
    open: boolean;
    close: () => void;
    item?: InventarioItem; // Add the item property here
}
const App: React.FC = () => {
    const [estadoFrom, setCerraFrom] = useState<boolean>(false);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<InventarioItem | null>(null);
    const [tableLoaded, setTableLoaded] = useState<boolean>(false);
    const [inventario, setInventario] = useState<InventarioItem[]>([]);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'inventario'));
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as InventarioItem[];
        setInventario(data);
        setTableLoaded(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleExportToPDF = () => {
        if (!tableLoaded) {
            console.error("Error: Table not loaded yet");
            return;
        }

        const tempTable = document.createElement('table');
        tempTable.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre Del Producto</th>
          <th>Código del Producto</th>
          <th>Cantidad</th>
          <th>Categoría</th>
        </tr>
      </thead>
      <tbody>
        ${inventario.map(item => `
          <tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.codigo}</td>
            <td>${item.cantidad}</td>
            <td>${item.categoria}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

        const doc = new jsPDF() as jsPDFWithAutoTable;
        doc.autoTable({ html: tempTable });
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
                        {inventario.map(item => (
                            <IonItem key={item.id} className="flex flex-wrap space-x-2">
                                <IonLabel className="w-full md:w-1/6 text-center">{item.id}</IonLabel>
                                <IonLabel className="w-full md:w-1/6 text-center">{item.nombre}</IonLabel>
                                <IonLabel className="w-full md:w-1/6 text-center">{item.codigo}</IonLabel>
                                <IonLabel className="w-full md:w-1/6 text-center">{item.cantidad}</IonLabel>
                                <IonLabel className="w-full md:w-1/6 text-center">{item.categoria}</IonLabel>
                                <div className="w-full md:w-1/6 flex justify-center md:justify-end items-center space-x-2">
                                    <IonButton fill="clear" className="p-0 m-0 w-13 h-16" onClick={() => { setSelectedItem(item); setOpenForm(true); }}>
                                        <EditIcon />
                                    </IonButton>
                                    <DeleteButton itemId={item.id} onDeleteSuccess={fetchData} />
                                </div>
                            </IonItem>
                        ))}
                    </IonList>
                </div>
            </div>

            {estadoFrom && (
                <UserCreation
                    abrir={estadoFrom}
                    cerra={() => setCerraFrom(false)}
                />
            )}
            {openForm && selectedItem && (
                <UpdateUser
                    open={openForm}
                    close={() => setOpenForm(false)}
                    item={selectedItem} // Pasa el item seleccionado al formulario de actualización
                />
            )}
        </IonContent>
    );
}

export default App;
