import * as React from 'react';
import { Search } from '../assets/search';
import TabsHeadline from './Headlines/TabsHeadline';
import CheckboxItem from './CheckboxItem';
import { DropDownData, DropDownDataItem, DropDownListProps } from '../types';
import { Close } from '../assets/close';
import BlankButton from './BlankButton';

const DropDownList: React.FC<DropDownListProps> = ({ data, isMultiselect, callback }) => {
    const [currentData, setCurrentData] = React.useState<DropDownData | DropDownData[]>(data);
    const [headline, setHeadline] = React.useState<string>('');
    const [isExpand, setIsExpand] = React.useState<boolean>(false);
    const [tabs, setTabs] = React.useState<string[]>([]);
    const [currentTabContent, setCurrentTabContent] = React.useState<DropDownDataItem[]>([]);
    const [currentTab, setCurrentTab] = React.useState<string>('');
    const [checkedNumber, setCheckedNumber] = React.useState<number>(0);
    const isArrayData = Array.isArray(currentData);

    const toggleExpand = React.useCallback(() => {
        setIsExpand(prev => !prev);
    }, []);

    const handleTabClick = React.useCallback((tab: string) => {
        setCurrentTab(tab);
    }, []);

    // initialize headline
    React.useEffect(() => {
        const currentTabData = isArrayData ? currentData[0] : currentData as DropDownData;
        setCurrentTabContent(currentTabData.data || []);

        if (isMultiselect) {
            const headlineName = isArrayData && currentData.map(item => item.name).join(', ');
            const tabsName = isArrayData && currentData.map(item => item.name);

            setHeadline(headlineName || '');
            setTabs(tabsName || []);
            setCurrentTab(tabsName && tabsName.length ? tabsName[0] : '');
        } else {
            setHeadline(currentTabData.name);
        }
    }, []);

    // change current tab content
    React.useEffect(() => {
        if (isMultiselect) {
            setCurrentTabContent((currentData as DropDownData[]).find(item => item.name === currentTab)?.data || []);
        }
    }, [currentTab, currentData, isMultiselect, checkedNumber]);

    // select an item
    const handleSelectItem = (isChecked: boolean, name: string) => {
        if (isChecked) setCheckedNumber(prevState => prevState + 1);
        else setCheckedNumber(prevState => prevState - 1);
        currentTabContent.forEach(item => {
            if (item.name === name) item.isSelected = isChecked;
        });
        if (isMultiselect) {
            isArrayData && setCurrentData(prevState => (prevState as DropDownData[]).map(item => {
                if (item.name === currentTab) item.data = currentTabContent;
                return item;
            }));
        } else {
            setCurrentData(prevState => { (prevState as DropDownData).data = currentTabContent; return prevState; });
        }
        callback(currentData)
    }

    return (
        <>
            <button
                className="dropdown-button"
                onClick={toggleExpand}
            >
                <div className='dropdown-label'>
                    <Search />
                    <TabsHeadline type="active">{headline}</TabsHeadline>
                </div>
                {checkedNumber > 0 && <span className="checkmark checkmark-filled">{checkedNumber}</span>}
            </button>
            {isExpand && (
                <div className='outer-container'>
                    <div className="dropdown-container">
                        {isMultiselect && <div className="tabs-container">
                            {tabs.map(tab => (
                                <button
                                    className="tab-container"
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    <TabsHeadline type={tab === currentTab ? 'underlined' : 'regular'}>
                                        {tab}
                                    </TabsHeadline>
                                </button>
                            ))}
                        </div>}
                        {currentTabContent.filter(item => item.isSelected).length > 0 && <div className='chosen-container'>
                            {currentTabContent.map(item => item.isSelected && <span className='chosen-item' key={item.name}>
                                <TabsHeadline type="active">{item.name}</TabsHeadline>
                                <BlankButton
                                    onClick={() => handleSelectItem(!item.isSelected, item.name)}
                                ><Close /></BlankButton>
                            </span>)}
                        </div>}
                        <div className='content-tabs-container'>
                            {currentTabContent.map(item => (
                                <CheckboxItem
                                    key={item.name}
                                    onChange={(event) => handleSelectItem(event.target.checked, item.name)}
                                    value={item.isSelected}>{item.name}</CheckboxItem>
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