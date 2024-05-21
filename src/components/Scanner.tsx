import React from 'react';
import { IonButton, IonContent } from '@ionic/react';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';

const Scanner: React.FC = () => {
  const scanCode = () => {
    BarcodeScanner.scan()
      .then((barcodeData: BarcodeScanResult) => {
        alert(`Barcode data: ${barcodeData.text}`);
      })
      .catch((err: any) => {
        console.error('Error', err);
      });
  };

  return (
    <IonContent className="ion-padding">
      <IonButton onClick={scanCode} expand="full" color="primary">
        Scan Barcode
      </IonButton>
    </IonContent>
  );
};

export default Scanner;
