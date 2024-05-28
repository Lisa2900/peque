import React, { ReactNode, useState, useEffect } from 'react';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonModal } from '@ionic/react';
import swal from 'sweetalert';
import { db } from '../../firebase'; // Importa la configuración de Firebase
import { doc, updateDoc } from 'firebase/firestore'; // Importa las funciones necesarias de Firebase Firestore

interface UpdateUserProps {
  open: boolean;
  close: () => void;
  item: {
    id: string;
    nombre: string;
    codigo: string;
    cantidad: string;
    categoria: string;
  };
}

const UpdateUser: React.FC<UpdateUserProps> = ({ open, close, item }) => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    // Llena los campos del formulario con los datos del producto seleccionado
    setNombre(item.nombre);
    setCodigo(item.codigo);
    setCantidad(item.cantidad);
    setCategoria(item.categoria);
  }, [item]);

  const mostrarAlerta = () => {
    swal({
      title: '¡Bien hecho!',
      text: '¡Has actualizado el producto exitosamente!',
      icon: 'success'
    });
  };

  const actualizarProducto = async () => {
    try {
      await updateDoc(doc(db, 'inventario', item.id), {
        nombre: nombre,
        codigo: codigo,
        cantidad: parseInt(cantidad),
        categoria: categoria
      });
      mostrarAlerta(); // Muestra la alerta de éxito
      close(); // Cierra el modal después de actualizar el producto
    } catch (error) {
      console.error('Error updating document: ', error);
      swal({
        title: 'Error!',
        text: 'Hubo un error al actualizar el producto.',
        icon: 'error'
      });
    }
  };

  return (
    <IonModal isOpen={open} onDidDismiss={close}>
      <IonContent>
        <div className="bg-zinc-800 text-white p-6 max-w-sm mx-auto rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Actualizar Producto</h2>
          <form>
            <IonItem>
              <IonLabel position="floating">Nombre del Producto *</IonLabel>
              <IonInput value={nombre} onIonChange={(e) => setNombre(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Código Producto *</IonLabel>
              <IonInput value={codigo} onIonChange={(e) => setCodigo(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Cantidad *</IonLabel>
              <IonInput type="number" value={cantidad} onIonChange={(e) => setCantidad(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Categoría *</IonLabel>
              <IonSelect value={categoria} onIonChange={(e) => setCategoria(e.detail.value)}>
                <IonSelectOption value="">Seleccione una categoría</IonSelectOption>
                <IonSelectOption value="celulares">Celulares</IonSelectOption>
                <IonSelectOption value="audifonos">Audífonos</IonSelectOption>
                <IonSelectOption value="fundas">Fundas</IonSelectOption>
                <IonSelectOption value="cargadores">Cargadores</IonSelectOption>
              </IonSelect>
            </IonItem>
            <div className="flex justify-end space-x-4">
              <IonButton onClick={close} className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded">Cancelar</IonButton>
              <IonButton onClick={actualizarProducto} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Actualizar</IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default UpdateUser;
