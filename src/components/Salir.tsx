import { IonButton } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';

const Salir: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Eliminar la marca de autenticación en localStorage
    localStorage.removeItem('loggedIn');
    // Redirigir al usuario a la página de inicio de sesión
    history.push("/login");
  };

  return (
    <IonButton onClick={handleLogout} color="danger">
      Cerrar sesión
    </IonButton>
  );
};

export default Salir;
