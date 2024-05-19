import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonInput,
  IonItem,
  IonContent,
  IonSpinner
} from '@ionic/react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const history = useHistory();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem('loggedIn', 'true');
      onLogin(); // Llamamos a la función onLogin
      history.push("/inicio");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setErrorMessage('Error en las credenciales'); // Mostrar mensaje de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonContent>
      <IonCard>
        <img alt="Silueta de montañas" src="https://ionicframework.com/docs/img/demos/card-media.png" />
        <IonCardHeader>
          <IonCardTitle>Iniciar Sesión</IonCardTitle>
          <IonCardSubtitle>Inicia sesión para entrar al sistema</IonCardSubtitle>
        </IonCardHeader>

        <form onSubmit={handleLogin}>
          <IonList>
            <IonItem>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
                placeholder="Dirección de correo electrónico"
                aria-label="Dirección de correo electrónico"
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
                placeholder="Contraseña"
                aria-label="Contraseña"
              />
            </IonItem>
          </IonList>
          <IonButton expand="full" type="submit" disabled={loading}>
            {loading ? <IonSpinner /> : 'Iniciar sesión'}
          </IonButton>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <p>
          ¿No tienes una cuenta?{' '}
          <NavLink to="/register">Regístrate</NavLink>
        </p>
      </IonCard>
    </IonContent>
  );
};

export default Login;
