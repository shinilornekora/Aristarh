import React, { useCallback, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";

import cn from 'classnames';

import { Avatar } from "../../shared/components/Avatar";
import { menuButtons } from "./buttons";
import { dropdowns } from "./popup";

import { Actions, ButtonProps, DropdownsType, ImageEvent, StateType, ToolsMenuVarsType } from "../../shared/types";

import * as css from './ToolsPanel.module.css';
import { Dropdown } from "../../shared/components/Dropdown";

export const ToolsPanel = () => {
    const name = useSelector<StateType, string>(state => state.project.name)
    const currentPopup = useSelector<StateType, DropdownsType>(state => state.control.activePopup);
    const dispatch = useDispatch();

    const ref = useRef<HTMLImageElement | null>(null)
    
    const onPopupClose = useCallback(() => dispatch({
        type: Actions.SET_VISIBLE_MENU_POPUP,
            payload: {
                popup: null
            }
    }), []);

    const handleToolClick = useCallback((event: unknown) => {
        dispatch({
            type: Actions.SET_VISIBLE_MENU_POPUP,
            payload: {
                popup: (event as ImageEvent).currentTarget.alt
            }
        })
    }, []);

    const buttonProcess = useCallback((props: ButtonProps) => {
        const pseudoSection = dropdowns[props.name as ToolsMenuVarsType];
        const propsToInject = {
            smartRef: ref,
            onClick: handleToolClick,
            key: props.name,
            ...props
        };

        if (pseudoSection.length === 1 && pseudoSection[0].instant) {
            propsToInject.onClick = pseudoSection[0].handler;
        }

        return <Avatar { ...propsToInject } />
    }, []);

    const additionals = useMemo(() => ({
        extraCloseCheck: ({ currentTarget }: ImageEvent) => menuButtons.some(button => currentTarget.alt === button.name),
    }), [currentPopup])

    return (
        <div className={ cn(css.container, 'qa-ToolsPanel') }>
            <div className={ css.project }>
                <div className={ css.text }>
                    { name }
                </div>
            </div>
            <div className={ css.buttons }>
                { menuButtons.map(buttonProcess) }
            </div>
            {
                currentPopup && <Dropdown
                    options={ dropdowns[currentPopup] }
                    additionals={ additionals}
                    onClose={ onPopupClose }
                    smartRef={ ref }
                />
            }
        </div>
    )
}