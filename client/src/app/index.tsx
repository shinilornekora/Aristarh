import React from 'react';
import ReactDOM from 'react-dom/client';

import { Main } from '../pages/Main';
import { Provider } from 'react-redux';
import { store } from '../shared/store/store';

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <Provider store={store} >
            <Main />
        </Provider>
    </React.StrictMode>
);
