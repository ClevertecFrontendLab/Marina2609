import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { store } from '@redux/configure-store';
import { AppLayout } from './app/layouts/app-layout';
import { MainPage } from './pages';

import 'normalize.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<AppLayout />}>
                        <Route index={true} element={<MainPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
);
