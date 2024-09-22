import React, { useCallback } from "react";

import { Tab } from "./Tab";

import * as css from './Tabs.module.css';

export type TabType = 'basic' | 'visibility' | 'actions' | 'accommodative';

type Props = {
    onSelect: (tab: TabType) => void;
}


const tabsList: Array<TabType> = ['basic', 'visibility', 'actions', 'accommodative'];

export const Tabs: React.FC<Props> = ({ onSelect }) => {
    const RenderTabs = useCallback(() => {
        return tabsList.map(tab => (
            <Tab tabName={ tab } onSelect={ onSelect }/>
        ));
    }, [onSelect]);

    return (
        <div className={ css.tabs }>
            <RenderTabs />
        </div>
    );
}