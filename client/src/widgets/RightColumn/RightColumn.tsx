import React, { useState } from "react"

import * as css from './RightColumn.module.css';
import { Display } from "./components/Display";
import { Settings } from "./components/Settings";
import { Tabs, TabType } from "./components/Tabs/Tabs";

export const RightColumn = () => {
    const [activeTab, setTab] = useState<TabType>('basic');

    return (
        <div className={css.container}>
            <Display />
            <Settings selectedTab={ activeTab } />
            <Tabs onSelect={ setTab } />
        </div>
    )
}