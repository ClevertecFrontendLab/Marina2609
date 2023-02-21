import { StarChecked } from './star-checked';
import { StarUnchecked } from './star-unchecked';

import './rating.css';

export const Rating = (props) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < props.rating) {
      stars.push(<StarChecked />);
    } else {
      stars.push(<StarUnchecked />);
    }
  }

  return <div className='stars'>{stars}</div>;
};
