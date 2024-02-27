import { Ref, SVGProps, forwardRef, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        ref={ref}
        {...props}
        width='14'
        height='14'
        viewBox='0 0 36 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <circle cx='13' cy='16' r='2.5' fill='#F0F5FF' />
        <path
            d='M30.9375 3.9375H5.0625C4.44023 3.9375 3.9375 4.44023 3.9375 5.0625V30.9375C3.9375 31.5598 4.44023 32.0625 5.0625 32.0625H30.9375C31.5598 32.0625 32.0625 31.5598 32.0625 30.9375V5.0625C32.0625 4.44023 31.5598 3.9375 30.9375 3.9375ZM29.5312 29.5312H6.46875V6.46875H29.5312V29.5312Z'
            fill='#061178'
        />
        <path
            d='M21.4558 16.7344H25.794C25.8397 16.7344 25.8749 16.6078 25.8749 16.4531V14.7656C25.8749 14.6109 25.8397 14.4844 25.794 14.4844H21.4558C21.4101 14.4844 21.3749 14.6109 21.3749 14.7656V16.4531C21.3749 16.6078 21.4101 16.7344 21.4558 16.7344ZM21.6245 21.7969H28.153C28.2901 21.7969 28.4026 21.6703 28.4026 21.5156V19.8281C28.4026 19.6734 28.2901 19.5469 28.153 19.5469H21.6245C21.4874 19.5469 21.3749 19.6734 21.3749 19.8281V21.5156C21.3749 21.6703 21.4874 21.7969 21.6245 21.7969ZM7.8749 23.6602H9.41826C9.56591 23.6602 9.68544 23.5441 9.69599 23.3965C9.82958 21.6211 11.3132 20.2148 13.1132 20.2148C14.9132 20.2148 16.3968 21.6211 16.5304 23.3965C16.5409 23.5441 16.6604 23.6602 16.8081 23.6602H18.3515C18.3896 23.6602 18.4274 23.6525 18.4624 23.6375C18.4975 23.6225 18.5292 23.6005 18.5555 23.5729C18.5818 23.5452 18.6022 23.5126 18.6155 23.4768C18.6288 23.441 18.6346 23.4029 18.6327 23.3648C18.5343 21.491 17.5077 19.8598 16.0101 18.9316C16.6705 18.2056 17.0354 17.2588 17.0331 16.2773C17.0331 14.1012 15.2788 12.3398 13.1167 12.3398C10.9546 12.3398 9.20029 14.1012 9.20029 16.2773C9.20029 17.3004 9.58701 18.2285 10.2233 18.9316C9.4609 19.4041 8.82414 20.0541 8.36743 20.8261C7.91073 21.5981 7.64766 22.4691 7.60068 23.3648C7.58662 23.5266 7.71318 23.6602 7.8749 23.6602ZM13.1132 14.4492C14.1151 14.4492 14.9308 15.2684 14.9308 16.2773C14.9308 17.2863 14.1151 18.1055 13.1132 18.1055C12.1112 18.1055 11.2956 17.2863 11.2956 16.2773C11.2956 15.2684 12.1112 14.4492 13.1132 14.4492Z'
            fill='#061178'
        />
    </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export default memo(ForwardRef);
