import React from "react";

import { useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Actions, StateType } from "../types";
import { ConfirmTextPopup } from "../components/ConfirmPopup/ConfirmTextPopup";

export const RenameProjectProcess = () => {
    const isRenamingScenario = useSelector<StateType, boolean>(state => state.scenarios.renamingProject);

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
            { isRenamingScenario && <RenameProjectPopup /> }
        </>
    )
}