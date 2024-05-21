import React, { useState } from 'react';
import { IonButton, IonContent, IonText } from '@ionic/react';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { isPlatform } from '@ionic/react';

const Scanner: React.FC = () => {
  const [barcodeData, setBarcodeData] = useState<string | null>(null);

  const scanCode = () => {
    if (isPlatform('cordova')) {
      BarcodeScanner.scan()
        .then((result: BarcodeScanResult) => {
          setBarcodeData(result.text);
        })
        .catch((err: any) => {
          console.error('Error', err);
        });
    } else {
      alert('Cordova no está disponible. Ejecuta en un dispositivo o simulador.');
      console.warn('Cordova no está disponible - ejecuta en un dispositivo o simulador.');
    }
  };

  return (
    <IonContent className="ion-padding">
      <IonButton onClick={scanCode} expand="full" color="primary">
        Escanear Código de Barras
      </IonButton>
      {barcodeData && (
        <IonText color="primary">
          <h2>Datos del código de barras: {barcodeData}</h2>
        </IonText>
      )}
    </IonContent>
  );
};

export default Scanner;
