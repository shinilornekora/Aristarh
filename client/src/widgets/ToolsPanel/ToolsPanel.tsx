import React from "react"
import { useSelector } from "react-redux";

import { Avatar } from "../../entities/Avatar/Avatar";
import { menuButtons } from "./buttons";

import { StateType } from "../../store";
import * as css from './ToolsPanel.module.css';

export const ToolsPanel = () => {
    const name = useSelector<StateType, string>(state => state.project.name)

    return (
        <div className={ css.container }>
            <div className={ css.project }>
                <div className={ css.text }>
                    { name }
                </div>
            </div>
            <div className={ css.buttons }>
                { menuButtons.map(props => <Avatar { ...props } />) }
            </div>
        </div>
    )
}