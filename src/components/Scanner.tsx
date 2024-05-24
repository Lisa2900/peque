import React, { useState } from 'react';
import { IonButton, IonContent, IonText } from '@ionic/react';

const Scanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);


  return (
   
      <IonButton expand="full" color="primary">
        Scan Barcode
      </IonButton>
     
   
  );
};

export default Scanner;
