import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToolsPanel } from "../../widgets/ToolsPanel";
import { Constructor } from "../../widgets/Constructor";

import * as css from './Main.module.css';
import { ConfirmTextPopup } from "../../shared/ConfirmPopup/ConfirmTextPopup";
import { Actions, StateType } from "../../shared/types";
import { SupportPopup } from "../../shared/SupportPopup";
import { LeftColumn } from "../../widgets/LeftColumn";
import { RightColumn } from "../../widgets/RightColumn";

// TODO: вытащить сценарии в скрипт-компонент и замаунтить здесь.
export const Main = () => {
    const isRenamingScenario = useSelector<StateType, boolean>(state => state.scenarios.renamingProject);
    const isSupportPopupScenario = useSelector<StateType, boolean>(state => state.scenarios.supportPopupShow);
    const targetElementId = useSelector<StateType, string | undefined>(state => state.control.targetElementId);

    const dispatch = useDispatch();

    const handleRenamingProcess = useCallback((payload: string) => dispatch({ 
        type: Actions.RENAME_PROJECT, 
        payload: { name: payload } 
    }), [])

    const RenameProjectPopup = useMemo(() => {
        return () => (
            <ConfirmTextPopup 
                text="New project name..."
                cb={ handleRenamingProcess }
                inputId="rename_project"
                cannotBeEmpty
            />
        );
    }, [handleRenamingProcess]);

    return (
        <>
            <div className={ css.layout }>
                <ToolsPanel />
                <Constructor />
                <LeftColumn />
                { targetElementId && <RightColumn /> }
                { isSupportPopupScenario && <SupportPopup /> }
                { isRenamingScenario && <RenameProjectPopup /> }
            </div>
        </>
    );
}

