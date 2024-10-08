import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Routers } from './Routers.tsx';
import { UserProvider } from './context/UserContext.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Routers>
        <App />
      </Routers>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
