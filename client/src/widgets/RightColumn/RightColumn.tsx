import React, { useState } from "react"

import cn from 'classnames';

import { Display } from "./components/Display";
import { Settings } from "./components/Settings";
import { Tabs, TabType } from "./components/Tabs/Tabs";

import * as css from './RightColumn.module.css';

export const RightColumn = () => {
    const [activeTab, setTab] = useState<TabType>('basic');

    return (
        <div className={ cn(css.container, 'qa-RightColumn') }>
            <Display />
            <Settings selectedTab={ activeTab } />
            <Tabs onSelect={ setTab } />
        </div>
    )
}