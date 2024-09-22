import React from "react"

import cn from 'classnames';

import { Display } from "./components/Display";
import { Settings } from "./components/Settings";
import { Tabs } from "./components/Tabs/Tabs";

import { useSelector } from "react-redux";
import { StateType } from "../../shared/types";

import * as css from './RightColumn.module.css';

export const RightColumn = () => {
    const targetElementId = useSelector<StateType, string | undefined>(state => state.control.targetElementId);

    return (
        <div className={ cn(css.container, 'qa-RightColumn', {
            [css.active]: Boolean(targetElementId),
            [css.inactive]: !Boolean(targetElementId)
        }) }>
            <Display />
            <Settings />
            <Tabs />
        </div>
    )
}