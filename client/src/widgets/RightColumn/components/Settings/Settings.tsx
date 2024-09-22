import React from "react";
import { TabType } from "../Tabs/Tabs";

import * as css from './Settings.module.css';

type ComponentSettingsType = {
    selectedTab: TabType;
}

export const Settings: React.FC<ComponentSettingsType> = ({ selectedTab }) => {
    return (
        <div className={ css.settings }>
            { selectedTab } 
        </div>
    );
}