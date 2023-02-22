import React from 'react';

export const HightLight = (props) => {
  const { title, filter } = props;

  if (!filter) {
    return title;
  }

  const regexp = new RegExp(filter, 'ig');

  const value = title.match(regexp);

  if (value) {
    return title.split(regexp).map((el, index, arr) => {
      const element = value.shift();

      if (index < arr.length - 1) {
        return (
          <React.Fragment>
            {el}
            <span className='highlight' key={el} data-test-id='highlight-matches'>
              {element}
            </span>
          </React.Fragment>
        );
      }

      return el;
    });
  }

  return title;
};
