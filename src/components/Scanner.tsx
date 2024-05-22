import React, { useState } from 'react';
import { IonButton, IonContent, IonText } from '@ionic/react';

const Scanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);


  return (
    <IonContent className="ion-padding">
      <IonButton expand="full" color="primary">
        Scan Barcode
      </IonButton>
      {scanResult && (
        <IonText color="primary">
          <h2>Scanned Code:</h2>
          <p>{scanResult}</p>
        </IonText>
      )}
    </IonContent>
  );
};

export default Scanner;
