import React from 'react';

type BlankButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

const BlankButton = ({ children, onClick }: BlankButtonProps) => {
    return (
        <button className="blank-button" onClick={onClick}>
            {children}
        </button>
    );
};
export default BlankButton;