import { Ref, SVGProps, forwardRef, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        ref={ref}
        {...props}
        width='14'
        height='12'
        viewBox='0 0 14 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M5.375 4.90674H12.875C12.9438 4.90674 13 4.85049 13 4.78174V3.90674C13 3.83799 12.9438 3.78174 12.875 3.78174H5.375C5.30625 3.78174 5.25 3.83799 5.25 3.90674V4.78174C5.25 4.85049 5.30625 4.90674 5.375 4.90674ZM5.25 8.09424C5.25 8.16299 5.30625 8.21924 5.375 8.21924H12.875C12.9438 8.21924 13 8.16299 13 8.09424V7.21924C13 7.15049 12.9438 7.09424 12.875 7.09424H5.375C5.30625 7.09424 5.25 7.15049 5.25 7.21924V8.09424ZM13.125 0.500488H0.875C0.80625 0.500488 0.75 0.556738 0.75 0.625488V1.50049C0.75 1.56924 0.80625 1.62549 0.875 1.62549H13.125C13.1938 1.62549 13.25 1.56924 13.25 1.50049V0.625488C13.25 0.556738 13.1938 0.500488 13.125 0.500488ZM13.125 10.3755H0.875C0.80625 10.3755 0.75 10.4317 0.75 10.5005V11.3755C0.75 11.4442 0.80625 11.5005 0.875 11.5005H13.125C13.1938 11.5005 13.25 11.4442 13.25 11.3755V10.5005C13.25 10.4317 13.1938 10.3755 13.125 10.3755ZM1.225 8.0333L3.66719 6.10986C3.68363 6.09694 3.69692 6.08045 3.70606 6.06164C3.71521 6.04283 3.71996 6.02218 3.71996 6.00127C3.71996 5.98036 3.71521 5.95971 3.70606 5.9409C3.69692 5.92209 3.68363 5.9056 3.66719 5.89268L1.225 3.96768C1.13437 3.8958 1 3.95986 1 4.07549V7.92393C0.999992 7.95002 1.00733 7.9756 1.02117 7.99772C1.03501 8.01985 1.05479 8.03763 1.07827 8.04904C1.10174 8.06045 1.12794 8.06502 1.15389 8.06224C1.17984 8.05946 1.20448 8.04943 1.225 8.0333Z'
            fill='#8C8C8C'
        />
    </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export default memo(ForwardRef);