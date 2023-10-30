export interface DropDownDataItem {
    name: string;
    isSelected: boolean;
}

export interface DropDownData {
    name: string;
    data: DropDownDataItem[];
}

export interface DropDownListProps {
    data: DropDownData | DropDownData[];
    isMultiselect: boolean;
    callback: (data: DropDownData | DropDownData[]) => void;
}