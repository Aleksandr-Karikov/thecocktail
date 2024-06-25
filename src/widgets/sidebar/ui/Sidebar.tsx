import { Link, useLocation } from 'react-router-dom';
import { sidebarItems } from '../lib';
import { clsx } from 'clsx';
import cls from '../styles.module.scss';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className={clsx(cls.sidebar, className)}>
            {sidebarItems.map((item) => (
                <Link
                    className={clsx(cls.sidebarItem, {
                        [cls.active]: pathname === item.path,
                    })}
                    key={item.path}
                    to={item.path}
                >
                    {item.title}
                </Link>
            ))}
        </div>
    );
}
