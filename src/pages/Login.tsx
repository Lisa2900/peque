import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonInput, IonItem } from '@ionic/react';

const Login: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            localStorage.setItem('loggedIn', 'true');
            history.push("/tab1");
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setErrorMessage('Error en las credenciales'); // Mostrar mensaje de error
        }
    };
    return (
        <IonCardContent>
            <IonCard>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                    <IonCardTitle>Iniciar Sesión</IonCardTitle>
                    <IonCardSubtitle>Inicia sesión para entrar al sistema</IonCardSubtitle>
                </IonCardHeader>

                <form onSubmit={handleLogin}>
                    <IonList>
                        <IonItem>
                            <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required placeholder="Dirección de correo electrónico" />
                        </IonItem>
                        <IonItem>
                            <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required placeholder="Contraseña" />
                        </IonItem>
                    </IonList>
                    <IonButton expand="full" type="submit">Iniciar sesión</IonButton>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mostrar mensaje de error si hay */}
                <p>
                    ¿No tienes una cuenta?{' '}
                    <NavLink to="/register">Regístrate</NavLink>
                </p>

            </IonCard>
        </IonCardContent>
    );
};

export default Login;
