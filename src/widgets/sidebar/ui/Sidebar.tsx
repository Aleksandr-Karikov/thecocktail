import { NavLink } from 'react-router-dom';
import { sidebarItems } from '../lib';
import { clsx } from 'clsx';
import cls from '../styles.module.scss';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={clsx(cls.sidebar, className)}>
            {sidebarItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => {
                        return clsx(cls.sidebarItem, {
                            [cls.active]: isActive,
                        });
                    }}
                >
                    {item.title}
                </NavLink>
            ))}
        </div>
    );
}
