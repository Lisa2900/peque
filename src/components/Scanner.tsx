import React, { useState } from 'react';
import { IonButton, IonContent, IonText } from '@ionic/react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const Scanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);

  const scanCode = async () => {
    try {
      await BarcodeScanner.checkPermission({ force: true });
      await BarcodeScanner.hideBackground(); // Make background of WebView transparent
      const result = await BarcodeScanner.startScan(); // Start scanning and wait for a result

      if (result.hasContent) {
        setScanResult(result.content);
      } else {
        setScanResult('No content found');
      }

      await BarcodeScanner.showBackground(); // Reset background when done
    } catch (err) {
      console.error('Error', err);
      setScanResult('Error scanning code');
    }
  };

  return (
    <IonContent className="ion-padding">
      <IonButton onClick={scanCode} expand="full" color="primary">
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
