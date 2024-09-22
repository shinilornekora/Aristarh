import React from "react";

import { useSelector } from "react-redux";
import { StateType } from "../../../../shared/types";
import { TabType } from "../Tabs/Tabs";

import * as css from './Settings.module.css';

export const Settings: React.FC = () => {
    const selectedTab = useSelector<StateType, TabType>(state => state.control.rightColumnActiveTab ?? 'basic');

    return (
        <div className={ css.settings }>
            { selectedTab } 
        </div>
    );
}