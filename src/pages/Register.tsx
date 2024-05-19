import React, { useState, FormEvent } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { 
    IonContent, 
    IonList, 
    IonItem, 
    IonButton, 
    IonInput, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonSpinner, 
    IonAlert 
} from '@ionic/react';

const Registro: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [contraseña, setContraseña] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const credencialUsuario = await createUserWithEmailAndPassword(auth, email, contraseña);
            const usuario = credencialUsuario.user;
            console.log(usuario);
            setShowAlert(true);
        } catch (error: any) {
            const codigoError = error.code;
            const mensajeError = error.message;
            console.log(codigoError, mensajeError);
            setErrorMessage(mensajeError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonContent>
            <IonCard>
                <img alt="Silueta de montañas" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                    <IonCardTitle>Registrarse</IonCardTitle>
                    <IonCardSubtitle>Registrate para entrar al sistema</IonCardSubtitle>
                </IonCardHeader>
                <IonList>
                    <form onSubmit={onSubmit}>
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
                                value={contraseña}
                                onIonChange={(e) => setContraseña(e.detail.value!)}
                                required
                                placeholder="Contraseña"
                                aria-label="Contraseña"
                            />
                        </IonItem>
                        <IonButton expand="full" type="submit" disabled={loading}>
                            {loading ? <IonSpinner /> : 'Registrarse'}
                        </IonButton>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </IonList>
                <p>
                    ¿Ya tienes una cuenta?{' '}
                    <NavLink to="/login">Iniciar sesión</NavLink>
                </p>
            </IonCard>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => {
                    setShowAlert(false);
                    history.push("/login");
                }}
                header={'Registro Exitoso'}
                message={'¡Te has registrado correctamente!'}
                buttons={['OK']}
            />
        </IonContent>
    );
};

export default Registro;
