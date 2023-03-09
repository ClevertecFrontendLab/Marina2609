import React, { useCallback } from 'react';

import { HightLight } from '../hightlight/hightlight';

export const BookTitle = (props) => {
  const { title, filter } = props;

  const light = useCallback((title) => <HightLight filter={filter} title={title} />, [filter]);

  return <div className=''>{light(title)}</div>;
};
