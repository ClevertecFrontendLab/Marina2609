import { LogoProps } from '../../../types';
import './logo.css';

export const Logo = ({ icon, ...restProps }: LogoProps) => {
    return <div {...restProps}>{icon}</div>;
};
