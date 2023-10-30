import React from 'react';

type TabsHeadlineProps = {
    children: React.ReactNode;
    type: 'regular' | 'active' | 'underlined';
}

const TabsHeadline = ({ children, type }: TabsHeadlineProps) => {
    const styles = {
        regular: 'tabs-headline-regular',
        active: 'tabs-headline-active',
        underlined: 'tabs-headline-underlined'
    }
    return (<span className={styles[type]}>{children}</span>);
}

export default TabsHeadline;
