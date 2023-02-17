import './rating.css';

export const Rating = ({ rating, listType }: IBooks) => {
  const starsArr = [];

  // for (let i = 0; i < 5; i++) {
  //   if (i < rating!) {
  //     starsArr.push(<StarFull key={i} listType={listType} />);
  //   } else {
  //     starsArr.push(<StarEmpty key={i} listType={listType} />);
  //   }
  // }

  return <div className='rating'>{starsArr}</div>;
};
