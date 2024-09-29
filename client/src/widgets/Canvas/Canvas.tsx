import React, { useCallback } from "react"

import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { LeftColumn } from "../LeftColumn"
import { Constructor } from "../Constructor"
import { handleWidgetDrag } from "./_helpers/handleWidgetDrag"
import { handleWidgetDrop } from "./_helpers/handleWidgetDrop"
import { useSelector } from "react-redux"
import { NexusTreeState, StateType } from "../../shared/types/store"

export const Canvas = () => {
    const NexusTree = useSelector<StateType, NexusTreeState>(state => state.project.tree);
    
    const handleDrop = useCallback((result: DropResult) => handleWidgetDrop(result, 0, 0, NexusTree), [])

    return (
        <DragDropContext
            onDragStart={ handleWidgetDrag } 
            onDragEnd={ handleDrop }
        >
            <LeftColumn />
            <Constructor />
        </DragDropContext>
    )
}