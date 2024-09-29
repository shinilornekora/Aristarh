import React, { useCallback } from "react";

import { useSelector } from "react-redux";

import { BasicStyles } from "./components/BasicStyles";
import { AccommodationStyles } from "./components/AccomodationStyles";
import { ActionStyles } from "./components/ActionStyles";
import { VisibilityStyles } from "./components/VisibilityStyles";

import * as css from './Settings.module.css';
import { StateType } from "../../../../shared/types/store";
import { TabType } from "../../../../shared/types/ui";

export const Settings: React.FC = () => {
    const selectedTab = useSelector<StateType, TabType>(state => state.control.rightColumnActiveTab ?? 'basic');

    const SettingsComponent = useCallback(() => {
        switch (selectedTab) {
            case 'basic':
                return <BasicStyles />;
            case 'accommodative':
                return <AccommodationStyles />;
            case 'actions':
                return <ActionStyles />;
            case "visibility":
                return <VisibilityStyles />;
            default:
                return null;
        }
    }, [selectedTab]);

    return (
        <div className={ css.settings }>
            <SettingsComponent /> 
        </div>
    );
}