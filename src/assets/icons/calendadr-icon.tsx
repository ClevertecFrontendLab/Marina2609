import { Ref, SVGProps, forwardRef, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        ref={ref}
        {...props}
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.125 1.875H12.75C13.0266 1.875 13.25 2.09844 13.25 2.375V12.75C13.25 13.0266 13.0266 13.25 12.75 13.25H1.25C0.973438 13.25 0.75 13.0266 0.75 12.75V2.375C0.75 2.09844 0.973438 1.875 1.25 1.875H3.875V0.875C3.875 0.80625 3.93125 0.75 4 0.75H4.875C4.94375 0.75 5 0.80625 5 0.875V1.875H9V0.875C9 0.80625 9.05625 0.75 9.125 0.75H10C10.0688 0.75 10.125 0.80625 10.125 0.875V1.875ZM1.875 12.125H12.125V6.1875H1.875V12.125Z'
            fill='#061178'
        />
    </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export default memo(ForwardRef);
