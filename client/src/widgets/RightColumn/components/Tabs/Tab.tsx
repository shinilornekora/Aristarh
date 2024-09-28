import React, { useCallback } from "react"
import { useSelector } from "react-redux";

import cn from 'classnames';

import { StateType } from "../../../../shared/types";
import { TabType } from "./Tabs"

import * as css from './Tabs.module.css';

interface SingleTabType {
    tabName: TabType;
    onSelect: (tab: TabType) => void
}

const texts = {
    accommodative: 'Accommodation behaviour',
    visibility: 'Visibility settings',
    actions: 'Action handlers',
    basic: 'Basic styles',
}

export const Tab: React.FC<SingleTabType> = ({ tabName, onSelect }) => {
    const currentlySelectedTab = useSelector<StateType, TabType>(state => state.control.rightColumnActiveTab ?? 'basic');
    const handleSelect = useCallback(() => onSelect(tabName), [tabName, onSelect]);

    return (
        <div 
            className={ 
                cn(css.tab, {
                    [css.active]: currentlySelectedTab === tabName
                }) 
            } 
            onClick={ handleSelect }
        >
            { texts[tabName] }
        </div>
    )
}