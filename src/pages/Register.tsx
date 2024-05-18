import React, { useState, FormEvent } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { IonContent, IonList, IonItem, IonLabel, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';

const Registro: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [contraseña, setContraseña] = useState<string>('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const credencialUsuario = await createUserWithEmailAndPassword(auth, email, contraseña);
            const usuario = credencialUsuario.user;
            console.log(usuario);
            history.push("/login");
        } catch (error: any) {
            const codigoError = error.code;
            const mensajeError = error.message;
            console.log(codigoError, mensajeError);
        }
    };

    return (
        <IonCardContent>
            <IonCard>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                    <IonCardTitle>Registrarse</IonCardTitle>
                    <IonCardSubtitle>Registrate para entrar al sistema</IonCardSubtitle>
                </IonCardHeader>
                <IonList>
                    <form onSubmit={onSubmit}>
                        <IonList>
                        <IonItem>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                required
                                placeholder="Dirección de correo electrónico"
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                type="password"
                                value={contraseña}
                                onIonChange={(e) => setContraseña(e.detail.value!)}
                                required
                                placeholder="Contraseña"
                            />
                        </IonItem>
                        </IonList>
                            <IonButton expand="full" type="submit">Registrarse</IonButton>
                        
                    </form>
                </IonList>
                <p>
                    ¿Ya tienes una cuenta?{' '}
                    <NavLink to="/login">Iniciar sesión</NavLink>
                </p>

            </IonCard>
        </IonCardContent>
    );
};

export default Registro;
