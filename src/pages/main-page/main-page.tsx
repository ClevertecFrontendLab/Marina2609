import React from 'react';
import './main-page.css';
import { InfoContent, FooterContent } from '../../app/components';

export const MainPage: React.FC = () => {
    return (
        <div className='page-wrapper'>
            <div className='main-page'>
                <InfoContent />
            </div>
            <FooterContent />
        </div>
    );
};
