import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useHistory } from 'react-router';
import Salir from '../components/Salir';

const Tab1: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">inicio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Salir />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
