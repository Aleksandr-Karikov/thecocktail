import { ReactNode, isValidElement, Children, ReactElement } from 'react';
import cls from './styles.module.scss';
import clsx from 'clsx';

interface TabsProps {
    children: ReactNode;
    onChangeTab: (label: string) => void;
    selectedTab?: string;
}

export const Tabs = ({ children, onChangeTab, selectedTab }: TabsProps) => {
    return (
        <div className={cls.tabs}>
            <div className={cls.tabList}>
                {Children.map(children, (child) => {
                    if (!isValidElement(child)) return null;
                    const element = child as ReactElement<TabProps>;
                    const { value, label } = element.props;
                    return (
                        <button
                            className={clsx(cls.tab, {
                                [cls.active]: selectedTab === value,
                            })}
                            onClick={() => onChangeTab(value)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return null;
                const element = child as ReactElement<TabProps>;
                const { value } = element.props;
                return selectedTab === value ? child : null;
            })}
        </div>
    );
};

interface TabProps {
    label: string;
    value: string;
    children: ReactNode;
}

export const Tab = ({ children }: TabProps) => {
    return <div>{children}</div>;
};
