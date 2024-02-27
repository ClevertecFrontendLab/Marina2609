import { LogoProps } from '../../types';
import './Logo.css';

export const Logo = ({ icon, ...restProps }: LogoProps) => {
    return <div {...restProps}>{icon}</div>;
};
