import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RightColumn } from "../../widgets/RightColumn";
import { ToolsPanel } from "../../widgets/ToolsPanel";
import { Constructor } from "../../widgets/Constructor";

import * as css from './Main.module.css';
import { ConfirmTextPopup } from "../../shared/ConfirmPopup/ConfirmTextPopup";
import { Actions, StateType } from "../../shared/types";
import { SupportPopup } from "../../shared/SupportPopup";

// TODO: вытащить отсюда процессы в мета-компонент и замонтировать сюда
export const Main = () => {
    const isRenamingScenario = useSelector<StateType, boolean>(state => state.scenarios.renamingProject);
    const isSupportPopupScenario = useSelector<StateType, boolean>(state => state.scenarios.supportPopupShow);

    const dispatch = useDispatch();

    const handleRenamingProcess = useCallback((payload: string) => dispatch({ 
        type: Actions.RENAME_PROJECT, 
        payload: { name: payload } 
    }), [])

    return (
        <>
            <div className={css.layout}>
                <ToolsPanel />
                <Constructor />
                <RightColumn />
                {
                    isRenamingScenario && <ConfirmTextPopup 
                        text="New project name..."
                        cb={ handleRenamingProcess }
                        inputId="rename_project"
                        cannotBeEmpty
                    />
                }
                {
                    isSupportPopupScenario && <SupportPopup />
                }
            </div>
        </>
    );
}

