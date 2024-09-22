import React, { useState } from "react"

import cn from 'classnames';

import { Display } from "./components/Display";
import { Settings } from "./components/Settings";
import { Tabs, TabType } from "./components/Tabs/Tabs";

import * as css from './RightColumn.module.css';
import { useSelector } from "react-redux";
import { StateType } from "../../shared/types";

export const RightColumn = () => {
    const [activeTab, setTab] = useState<TabType>('basic');
    const targetElementId = useSelector<StateType, string | undefined>(state => state.control.targetElementId);

    return (
        <div className={ cn(css.container, 'qa-RightColumn', {
            [css.active]: Boolean(targetElementId),
            [css.inactive]: !Boolean(targetElementId)
        }) }>
            <Display />
            <Settings selectedTab={ activeTab } />
            <Tabs onSelect={ setTab } />
        </div>
    )
}