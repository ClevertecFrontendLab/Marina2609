import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Cards } from '../../app/components/cards/cards';
import { Filter } from '../../app/components/filter/filter';
import { Search } from '../../app/components/search/search';
import { obj } from '../../app/layouts/app-layout';
import { fetchBooks } from '../../redux/books/books-actions';

import './main-page.css';

export const MainPage = () => {
  const [mainState, setMainState] = useState('grid');
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  console.log(books);

  const toggle = (e) => {
    e.preventDefault();

    if (mainState === 'grid') {
      setMainState('list');
    } else setMainState('grid');
  };

  useEffect(() => {
    const menu = document.getElementById('aside-container');

    menu.style.display = 'block';
    document.querySelector('.article').parentNode.classList.remove('wrapper-book');
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return books.loading ? (
    <h2>Loading</h2>
  ) : books.error ? (
    <h2>{books.error}</h2>
  ) : (
    <div>
      <div>{books.books}</div>
    </div>
  );

  // return (
  //   <article className='article'>
  //     {/* {loading ? <div className=''>load...</div> : <div className=''>books</div>} */}
  //     <section className='main-page'>
  //       <div className='menu'>
  //         <div className='menu-container'>
  //           <Search />
  //           <Filter />
  //         </div>
  //         {mainState === 'grid' ? (
  //           <div className='main-btns'>
  //             <button
  //               type='button'
  //               className='btn-grid btn-grid-active'
  //               onClick={toggle}
  //               aria-label='grid'
  //               data-test-id='button-menu-view-window'
  //             />
  //             <button
  //               type='button'
  //               className='btn-list'
  //               onClick={toggle}
  //               aria-label='list'
  //               data-test-id='button-menu-view-list'
  //             />
  //           </div>
  //         ) : (
  //           <div className='main-btns'>
  //             <button
  //               type='button'
  //               className='btn-grid'
  //               onClick={toggle}
  //               aria-label='grid'
  //               data-test-id='button-menu-view-window'
  //             />
  //             <button
  //               type='button'
  //               className='btn-list btn-list-active'
  //               onClick={toggle}
  //               aria-label='list'
  //               data-test-id='button-menu-view-list'
  //             />
  //           </div>
  //         )}
  //       </div>
  //       <Cards cards={obj} state={mainState} />
  //     </section>
  //   </article>
  // );
};
