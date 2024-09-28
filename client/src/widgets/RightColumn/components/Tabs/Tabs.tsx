import React, { useCallback } from "react";

import { Tab } from "./Tab";

import * as css from './Tabs.module.css';
import { useDispatch } from "react-redux";
import { Actions } from "../../../../shared/types";

export type TabType = 'basic' | 'visibility' | 'actions' | 'accommodative';

const tabsList: Array<TabType> = ['basic', 'visibility', 'actions', 'accommodative'];

export const Tabs: React.FC = () => {
    const dispatcher = useDispatch();

    const RenderTabs = useCallback(() => {
        return tabsList.map(tab => {
            const onSelect = () => dispatcher({
                type: Actions.SET_RIGHT_COLUMN_TAB,
                payload: { tab }
            });

            return (
                <Tab 
                    key={ tab } 
                    tabName={ tab } 
                    onSelect={ onSelect }
                />
            );
        });
    }, []);

    return (
        <div className={ css.tabs }>
            <RenderTabs />
        </div>
    );
}