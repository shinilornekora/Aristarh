import React, { useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { Avatar } from "../../entities/Avatar";
import { menuButtons } from "./buttons";

import { Actions, StateType } from "../../store";
import { Dropdown } from "../../entities/Dropdown";

import * as css from './ToolsPanel.module.css';

const dropdownOptions = {
    'common': [
        {
            name: 'Import JSON',
            handler: () => {},
        },
        {
            name: 'Export JSON',
            handler: () => {},
        },
        {
            name: 'Export project',
            handler: () => {},
        },
        {
            name: 'Rename project',
            handler: () => {},
        }
    ],
    'server': [],
}

export const ToolsPanel = () => {
    const name = useSelector<StateType, string>(state => state.project.name)
    const currentPopup = useSelector<StateType, 'common' | 'server' | undefined>(state => state.control.activePopup);
    const dispatch = useDispatch();
    const ref = useRef<HTMLImageElement>(null)
    const handleToolClick = useCallback(({ currentTarget }: any) => {

        dispatch({ 
            type: Actions.SET_VISIBLE_POPUP, 
            payload: {
                popup: currentTarget.alt
            }
        })
    }, []);
    
    return (
        <div className={ css.container }>
            <div className={ css.project }>
                <div className={ css.text }>
                    { name }
                </div>
            </div>
            <div className={ css.buttons }>
                { 
                    menuButtons.map( 
                        props => (
                            <Avatar 
                                smartRef={ ref }
                                onClick={ handleToolClick } 
                                key={ props.name } 
                                { ...props } 
                            />
                        ) 
                    )
                }
            </div>
            { 
                currentPopup && <Dropdown 
                    smartRef={ref}
                    options={ dropdownOptions[currentPopup] }
                /> 
            }
        </div>
    )
}