import React from "react";
import { IonButton } from "@ionic/react";
import { MdDelete } from "react-icons/md";
import swal from 'sweetalert';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase'; // Asegúrate de que esta ruta sea correcta

interface DeleteButtonProps {
  itemId: string;
  onDeleteSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ itemId, onDeleteSuccess }) => {
  const mostrarAlerta1 = () => {
    swal({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Sí, eliminarlo",
          value: true,
          visible: true,
          className: "",
          closeModal: false
        }
      }
    }).then(async (value) => {
      if (value) {
        try {
          const docRef = doc(db, "inventario", itemId);
          await deleteDoc(docRef);
          swal({
            title: "¡Eliminado!",
            text: "El producto ha sido eliminado.",
            icon: "success"
          });
          onDeleteSuccess();
        } catch (error) {
          console.error("Error eliminando documento: ", error);
          swal({
            title: "Error",
            text: "Hubo un error al eliminar el producto",
            icon: "error"
          });
        }
      }
    });
  };

  return (
    <IonButton onClick={mostrarAlerta1} className="bg-red-600 text-white">
      <MdDelete /> Eliminar
    </IonButton>
  );
};

export default DeleteButton;
