import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!)

setInterval(() => console.log(root), 1000);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);