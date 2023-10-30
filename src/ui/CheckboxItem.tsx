import React from 'react';
import { Tick } from '../assets/tick';

type LabelProps = {
    children: React.ReactNode;
    value: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxItem = ({ children, onChange, value }: LabelProps) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(value);

    const handleChange = (event: any) => {
        setIsChecked(event.target.checked);
        onChange(event);
    }

    return <div className='checkbox-container'>
        <span className='label'>{children}</span>
        <label className='checkbox-item-container'>
            <input type="checkbox" className='checkbox-item' checked={value} onChange={handleChange} />
            <span className={`checkmark ${value ? 'checkmark-filled' : ''}`}>
                {isChecked && <Tick />}
            </span>

        </label>
    </div>;
};

export default CheckboxItem;