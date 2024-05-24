import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import {
  IonApp,
  IonButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { home, list, construct, addCircle } from 'ionicons/icons';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import Inicio from './pages/sistema/Inicio';
import Inventario from './pages/sistema/Inventario';
import Servicios from './pages/sistema/Servicios';
import Mas from './pages/sistema/Mas';
import Agregar from './pages/sistema/Agregar';
import Atras from './components/Atras';

setupIonicReact();

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
    setLoading(false);
  }, []);


  if (loading) {
    return <IonApp>Loading...</IonApp>;
  }
  const history = useHistory();

  return (<>
      
    <IonApp>
      <Atras/>

      <IonReactRouter>
        <Switch>
          <Route exact path="/login">
            {loggedIn ? <Redirect to="/" /> : <Login onLogin={() => setLoggedIn(true)} />}
          </Route>
          <Route exact path="/register" component={Register} />
          {loggedIn ? (
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/inicio" component={Inicio} />
                <Route exact path="/inventario" component={Inventario} />
                <Route exact path="/servicios" component={Servicios} />
                <Route exact path="/mas" component={Mas} />
                <Route exact path="/agregar" component={Agregar} />
                <Route exact path="/">
                  <Redirect to="/inicio" />
                </Route>

              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="inicio" href="/inicio">
                  <IonIcon icon={home} />
                  <IonLabel>Inicio</IonLabel>
                </IonTabButton>
                <IonTabButton tab="inventario" href="/inventario">
                  <IonIcon icon={list} />
                  <IonLabel>Inventario</IonLabel>
                </IonTabButton>
                <IonTabButton tab="servicios" href="/servicios">
                  <IonIcon icon={construct} />
                  <IonLabel>Servicios</IonLabel>
                </IonTabButton>
                <IonTabButton tab="mas" href="/mas">
                  <IonIcon icon={addCircle} />
                  <IonLabel>Mas</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <Redirect to="/login" />
          )}
          <Route component={NotFound} />
        </Switch>
      </IonReactRouter>
    </IonApp>
    </>

  );
};

export default App;
