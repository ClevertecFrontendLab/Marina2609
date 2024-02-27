import Lottie from 'lottie-react';
import loaderAnimation from './Loader.json';
import './Loader.css';

export const Loader = () => {
    return (
        <div data-test-id='loader' className='loader-wrapper'>
            <Lottie
                className='loader'
                loop={true}
                // style={{ transform: 'unset' }}
                animationData={loaderAnimation}
            />
        </div>
    );
};
