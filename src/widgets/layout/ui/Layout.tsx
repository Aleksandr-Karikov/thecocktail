import { Outlet } from 'react-router-dom';
import { Sidebar } from 'src/widgets/sidebar';
import cls from '../styles.module.scss';
export function Layout() {
    return (
        <div className={cls.layout}>
            <Sidebar className={cls.sidebar} />
            <div className={cls.content}>
                <Outlet />
            </div>
        </div>
    );
}
