import React, { useCallback } from "react"
import { TabType } from "./Tabs"

import * as css from './Tabs.module.css';

interface SingleTabType {
    tabName: TabType;
    onSelect: (tab: TabType) => void
}

export const Tab: React.FC<SingleTabType> = ({ tabName, onSelect }) => {
    const handleSelect = useCallback(() => onSelect(tabName), [tabName, onSelect]);

    return (
        <div className={ css.tab } onClick={ handleSelect }>
            { tabName }
        </div>
    )
}