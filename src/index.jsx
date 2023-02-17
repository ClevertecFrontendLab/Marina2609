import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from './app/layouts/app-layout';
import { BookLayout } from './app/layouts/book-layout';
import { MainLayout } from './app/layouts/main-layout';
import { BookPage } from './pages/book/book-page';
import { CategoriesPage } from './pages/categories/categories-page';
import { DocumentPage } from './pages/document/document-page';
import { MainPage } from './pages/main/main-page';
import { RulePage } from './pages/rule/rule-page';
import { store } from './redux/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route element={<MainLayout />} />
            <Route path='books' element={<MainPage />} />
            <Route path='books/:category' element={<MainPage />} />
            <Route path='category/:category' element={<CategoriesPage />} />
            <Route path='rule' element={<RulePage />} />
            <Route path='document' element={<DocumentPage />} />

            <Route path='account' element={<MainPage />} />
            <Route path='logOut' element={<MainPage />} />
          </Route>
          <Route path='/book' element={<BookLayout />}>
            <Route path=':id' element={<BookPage />} />
          </Route>
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
