import * as React from 'react';
import { Search } from '../assets/search';
import TabsHeadline from './Headlines/TabsHeadline';
import CheckboxItem from './CheckboxItem';
import { DropDownData, DropDownListProps } from '../types';
import { Close } from '../assets/close';
import BlankButton from './BlankButton';

const DropDownList: React.FC<DropDownListProps> = ({ data, isMultiselect, callback }) => {
    const isArrayData = Array.isArray(data);
    const initialData = isArrayData ? data[0] : data;
    const initialTabNames = isArrayData ? data.map(item => item.name) : [];

    const [currentData, setCurrentData] = React.useState<DropDownData | DropDownData[]>(data);
    const [isExpand, setIsExpand] = React.useState<boolean>(false);
    const [currentTab, setCurrentTab] = React.useState<string>(initialTabNames[0] || '');
    const [checkedNumber, setCheckedNumber] = React.useState<number>(0);

    const toggleExpand = () => setIsExpand(prev => !prev);
    const handleTabClick = (tab: string) => setCurrentTab(tab);

    const currentTabContent = isMultiselect
        ? (currentData as DropDownData[]).find(item => item.name === currentTab)?.data || []
        : initialData.data;

    const handleSelectItem = (isChecked: boolean, name: string) => {
        const updatedNumber = isChecked ? checkedNumber + 1 : checkedNumber - 1;
        setCheckedNumber(updatedNumber);

        const updatedContent = currentTabContent.map(item => item.name === name ? { ...item, isSelected: isChecked } : item);
        if (isMultiselect) {
            setCurrentData((prevData: any) => prevData.map((item: any) => item.name === currentTab ? { ...item, data: updatedContent } : item));
        } else {
            setCurrentData({ ...currentData, data: updatedContent });
        }

        callback(currentData);
    }

    const checkedItems = currentTabContent.filter(item => item.isSelected);

    return (
        <>
            <button className="dropdown-button" onClick={toggleExpand}>
                <div className='dropdown-label'>
                    <Search />
                    <TabsHeadline type="active">{isMultiselect ? initialTabNames.join(', ') : initialData.name}</TabsHeadline>
                </div>
                {checkedNumber > 0 && <span className="checkmark checkmark-filled">{checkedNumber}</span>}
            </button>
            {isExpand && (
                <div className='outer-container'>
                    <div className="dropdown-container">
                        {isMultiselect && (
                            <div className="tabs-container">
                                {initialTabNames.map(tab => (
                                    <button className="tab-container" key={tab} onClick={() => handleTabClick(tab)}>
                                        <TabsHeadline type={tab === currentTab ? 'underlined' : 'regular'}>{tab}</TabsHeadline>
                                    </button>
                                ))}
                            </div>
                        )}
                        {checkedItems.length > 0 && (
                            <div className='chosen-container'>
                                {checkedItems.map(item => (
                                    <span className='chosen-item' key={item.name}>
                                        <TabsHeadline type="active">{item.name}</TabsHeadline>
                                        <BlankButton onClick={() => handleSelectItem(!item.isSelected, item.name)}>
                                            <Close />
                                        </BlankButton>
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className='content-tabs-container'>
                            {currentTabContent.map(item => (
                                <CheckboxItem
                                    key={item.name}
                                    onChange={(event) => handleSelectItem(event.target.checked, item.name)}
                                    value={item.isSelected}
                                >
                                    {item.name}
                                </CheckboxItem>
                            ))}
                        </div>
                        <div className='gradient-overlay'></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DropDownList;