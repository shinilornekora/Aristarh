import React, { useCallback } from "react";

import { Tab } from "./Tab";

import { useDispatch } from "react-redux";
import { TabType } from "../../../../shared/types/ui";
import { Actions } from "../../../../shared/types/store";
import * as css from './Tabs.module.css';

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