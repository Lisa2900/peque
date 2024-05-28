import React, { ReactNode, useState } from 'react';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonModal } from '@ionic/react';
import swal from 'sweetalert';
import { db } from '../../firebase'; // Importa la configuración de Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importa las funciones necesarias de Firebase Firestore

interface CreateUserFormProps {
  abrir: boolean;
  cerra: (value: boolean) => void;
  children?: ReactNode;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ abrir, cerra }) => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');

  const mostrarAlerta = () => {
    swal({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    })
  };

  const agregarProducto = async () => {
    try {
      const docRef = await addDoc(collection(db, 'inventario'), {
        nombre: nombre,
        codigo: codigo,
        cantidad: parseInt(cantidad),
        categoria: categoria
      });
      console.log("Document written with ID: ", docRef.id);
      mostrarAlerta(); // Muestra la alerta de éxito
      cerra(false); // Cierra el modal después de agregar el producto
    } catch (error) {
      console.error("Error adding document: ", error);
      swal({
        title: "Error!",
        text: "There was an error adding the product.",
        icon: "error"
      });
    }
  };

  return (
    <IonModal isOpen={abrir} onDidDismiss={() => cerra(false)}>
      <IonContent>
        <div className="bg-zinc-800 text-white p-6 max-w-sm mx-auto rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Create New Product</h2>
          <form>
            <IonItem>
              <IonLabel position="floating">Nombre del Producto *</IonLabel>
              <IonInput value={nombre} onIonChange={(e) => setNombre(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Codigo Producto *</IonLabel>
              <IonInput value={codigo} onIonChange={(e) => setCodigo(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Cantidad *</IonLabel>
              <IonInput type="number" value={cantidad} onIonChange={(e) => setCantidad(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>State *</IonLabel>
              <IonSelect value={categoria} onIonChange={(e) => setCategoria(e.detail.value)}>
                <IonSelectOption value="">Seleccione una categoría</IonSelectOption>
                <IonSelectOption value="celulares">Celulares</IonSelectOption>
                <IonSelectOption value="audifonos">Audífonos</IonSelectOption>
                <IonSelectOption value="fundas">Fundas</IonSelectOption>
                <IonSelectOption value="cargadores">Cargadores</IonSelectOption>
              </IonSelect>
            </IonItem>
            <div className="flex justify-end space-x-4">
              <IonButton onClick={() => cerra(false)} className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded">Cancel</IonButton>
              <IonButton onClick={agregarProducto} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add</IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default CreateUserForm;
