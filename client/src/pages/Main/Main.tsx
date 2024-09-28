import React, { createContext, useCallback, useMemo, useState } from "react";

import cn from 'classnames';

import { useDispatch, useSelector } from "react-redux";

import { ToolsPanel } from "../../widgets/ToolsPanel";
import { Constructor } from "../../widgets/Constructor";

import * as css from './Main.module.css';
import { ConfirmTextPopup } from "../../shared/ConfirmPopup/ConfirmTextPopup";
import { Actions, StateType } from "../../shared/types";
import { SupportPopup } from "../../shared/SupportPopup";
import { LeftColumn } from "../../widgets/LeftColumn";
import { RightColumn } from "../../widgets/RightColumn";
import { widgetButtons, WidgetButtonsType } from "../../widgets/LeftColumn/buttons";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

type _CONS_CONTEXT_TYPE = { 
    widgets: WidgetButtonsType[]; 
    setWidgets: (newWidgets: WidgetButtonsType[]) => void 
}

// Проба пера, уйдет в state.project.tree
export const WidgetContext = createContext<_CONS_CONTEXT_TYPE>({
    widgets: [],
    setWidgets: () => {},
});

// TODO: вытащить сценарии в скрипт-компонент и замаунтить здесь.
export const Main = () => {
    const isRenamingScenario = useSelector<StateType, boolean>(state => state.scenarios.renamingProject);
    const isSupportPopupScenario = useSelector<StateType, boolean>(state => state.scenarios.supportPopupShow);

    // TODO: удалить этот ужас
    const [widgets, setWidgets] = useState<any[]>([ widgetButtons[0] ]);

    const dispatch = useDispatch();

    const handleRenamingProcess = useCallback((payload: string) => dispatch({ 
        type: Actions.RENAME_PROJECT, 
        payload: { name: payload } 
    }), [])

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;
    
        const items = Array.from(widgets);
        const [reorderedItem] = items.splice(result.source.index, 1);

        items.splice(result.destination.index, 0, reorderedItem);
        setWidgets(items);
    };

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
        <WidgetContext.Provider value={{ widgets, setWidgets }}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className={ cn(css.layout, 'qa-MainPage') }>
                    <Droppable droppableId="widgets">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    width: '100%',
                                    display: 'flex'
                                }}
                            >
                                <ToolsPanel />
                                <LeftColumn />
                                <Constructor />
                                <RightColumn />
                                { isSupportPopupScenario && <SupportPopup /> }
                                { isRenamingScenario && <RenameProjectPopup /> }
                                { provided.placeholder }
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </WidgetContext.Provider>
    );
}

