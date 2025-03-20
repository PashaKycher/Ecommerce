import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { store } from './stores/store';
import { Provider } from 'react-redux'
import router from './routes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // add store
    <Provider store={store}>
        {/* add router */}
        <RouterProvider router={router} />
    </Provider>
);

