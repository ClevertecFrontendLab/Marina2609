import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book/book-page';
import { DocumentPage } from './pages/document/document-page';
import { MainPage } from './pages/main/main-page';
import { Recovery } from './pages/recovery/recovery';
import { RulePage } from './pages/rule/rule-page';
import { SingIn } from './pages/singin/singin';
import { SingUp } from './pages/singup/singup';
import { store } from './store/store';
import { PrivateRoute } from './utils/require-auth';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/auth' element={<SingIn />} />
        <Route path='/registration' element={<SingUp />} />
        <Route path='/forgot-pass' element={<Recovery />} />

        <Route path='/' element={<PrivateRoute />}>
          <Route path='books/:category' element={<MainPage />} />
          <Route path='books/:category/:id' element={<BookPage />} />

          <Route path='rule' element={<RulePage />} />
          <Route path='document' element={<DocumentPage />} />
        </Route>

        <Route path='/account' element={<MainPage />} />

        {/* <Route path='*' element={<Error />} /> */}
      </Routes>
    </Provider>
  </HashRouter>
);
