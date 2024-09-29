import React, { createContext, useState } from "react"

import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { LeftColumn } from "../LeftColumn"
import { Constructor } from "../Constructor"
import { widgetButtons } from "../LeftColumn/buttons"
import { useSelector } from "react-redux"
import { StateType } from "../../shared/types/store"
import { CanvasWidgetProps, WidgetButtonsType } from "../../shared/types/ui"

type _CONS_CONTEXT_TYPE = { 
    widgets: Array<CanvasWidgetProps>; 
    setWidgets: (newWidgets: WidgetButtonsType[]) => void 
}

// Проба пера, уйдет в state.project.tree
export const WidgetContext = createContext<_CONS_CONTEXT_TYPE>({
    widgets: [],
    setWidgets: () => {},
});


export const Canvas = () => {
    const [widgets, setWidgets] = useState<any[]>([ widgetButtons[0] ]);
    const ProjectTree = useSelector<StateType, any>(state => state.project.tree)

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const updatedWidgets = [...widgets];
        // const { destination, draggableId } = result;

        // const draggedWidgetIndex = widgets.findIndex(widget => widget.name === draggableId);
        // const draggedWidget = updatedWidgets[draggedWidgetIndex];

        // const newX = destination.x; 
        // const newY = destination.y;

        // updatedWidgets[draggedWidgetIndex] = {
        //     ...draggedWidget,
        //     x: newX,
        //     y: newY,
        // };

        setWidgets(updatedWidgets);
    };

    const handleOnDragStart = (result: any) => {
        Aristarh.voice("DnD scenario [START]: ", result);
    };
    
    return (
        <WidgetContext.Provider value={{ widgets, setWidgets }}>
            <DragDropContext
                onDragStart={ handleOnDragStart } 
                onDragEnd={ handleOnDragEnd }
            >
                <LeftColumn />
                <Constructor />
            </DragDropContext>
        </WidgetContext.Provider>
    )
}