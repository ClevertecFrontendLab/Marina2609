import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from './app/layouts/app-layout';
import { BookPage } from './pages/book/book-page';
import { DocumentPage } from './pages/document/document-page';
import { MainPage } from './pages/main/main-page';
import { Recovery } from './pages/recovery/recovery';
import { ResetPassword } from './pages/reset-password/reset-password';
import { RulePage } from './pages/rule/rule-page';
import { SingIn } from './pages/singin/singin';
import { SingUp } from './pages/singup/singup';
import { store } from './store/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index={true} element={<Navigate to='/books/all' />} />
            <Route path='/books/:category' element={<MainPage />} />
            <Route path='/books/:category/:id' element={<BookPage />} />

            <Route path='/rule' element={<RulePage />} />
            <Route path='/document' element={<DocumentPage />} />
          </Route>

          <Route path='/auth' element={<SingIn />} />
          <Route path='/registration' element={<SingUp />} />
          <Route path='/forgot-pass' element={<Recovery />} />
          <Route path='/reset-pass' element={<ResetPassword />} />

          <Route path='/account' element={<MainPage />} />

          {/* <Route path='*' element={<Error />} /> */}
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
