import { SidebarToggleProps } from '../../../types';
import { CollapsedCloseIcon, CollapsedOpenIcon } from '../../../assets/icons';
import './sidebar-toggle.css';

export const SidebarToggle = ({
    collapsed,
    mobileVersion,
    toggleCollapsed,
}: SidebarToggleProps) => {
    const handleToggleCollapsed = () => {
        toggleCollapsed();
    };

    return (
        <button
            className='toggle'
            data-test-id={mobileVersion ? 'sider-switch-mobile' : 'sider-switch'}
            onClick={handleToggleCollapsed}
        >
            {collapsed ? <CollapsedOpenIcon /> : <CollapsedCloseIcon />}
        </button>
    );
};
