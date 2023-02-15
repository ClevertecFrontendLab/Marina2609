import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from './app/layouts/app-layout';
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
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index={true} element={<MainPage />} />\
            <Route path='category/:categories' element={<CategoriesPage />} />
            <Route path='rule' element={<RulePage />} />
            <Route path='document' element={<DocumentPage />} />
            <Route path='book/:id' element={<BookPage />} />
            <Route path='account' element={<MainPage />} />
            <Route path='logOut' element={<MainPage />} />
          </Route>
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
