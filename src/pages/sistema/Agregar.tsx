import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList
} from '@ionic/react';

const Agregar: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Artículo agregado:", { title, content, author });
    // Aquí puedes agregar la lógica para enviar los datos del artículo a tu backend o manejarlos como necesites.
  };

  return (
   
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Título</IonLabel>
              <IonInput
                value={title}
                onIonChange={(e) => setTitle(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contenido</IonLabel>
              <IonInput
                value={content}
                onIonChange={(e) => setContent(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Autor</IonLabel>
              <IonInput
                value={author}
                onIonChange={(e) => setAuthor(e.detail.value!)}
                required
              />
            </IonItem>
            <IonButton expand="full" type="submit" style={{ marginTop: '20px' }}>
              Agregar Artículo
            </IonButton>
          </IonList>
        </form>
      </IonContent>
  );
}

export default Agregar;
