import React from 'react';

type HeadlineProps = {
    children: React.ReactNode | React.ReactNode[]; 
}

const Headline = ({children}: HeadlineProps) => {
    return ( <h1 className="headline">{children}</h1> );
}
 
export default Headline;
