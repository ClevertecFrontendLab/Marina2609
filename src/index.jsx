import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from './app/layouts/app-layout';
import { BookLayout } from './app/layouts/book-layout';
import { BookPage } from './pages/book/book-page';
import { DocumentPage } from './pages/document/document-page';
import { MainPage } from './pages/main/main-page';
import { RulePage } from './pages/rule/rule-page';
import { store } from './redux/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route path='/' element={<Navigate to='books/all' />} />
          <Route path='books/:category' element={<MainPage />} />
          <Route path='rule' element={<RulePage />} />
          <Route path='document' element={<DocumentPage />} />

          <Route path='account' element={<MainPage />} />
          <Route path='logOut' element={<MainPage />} />
        </Route>
        <Route path='/books' element={<BookLayout />}>
          <Route path='all/:id' element={<BookPage />} />
        </Route>
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </Provider>
  </HashRouter>
);
