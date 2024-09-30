import React, { useCallback, useEffect } from "react"

import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { LeftColumn } from "../LeftColumn"
import { Constructor } from "../Constructor"
import { handleWidgetDrag } from "./_helpers/handleWidgetDrag"
import { handleWidgetDrop } from "./_helpers/handleWidgetDrop"
import { useSelector } from "react-redux"
import { NexusTreeState, StateType } from "../../shared/types/store"
import { useMousePosition } from "../../shared/framework/hooks/useMouseMove"

export const Canvas = () => {
    const { x, y } = useMousePosition();
    const NexusTree = useSelector<StateType, NexusTreeState>(state => state.project.tree);

    const handleDrop = useCallback((result: DropResult) => {
        // Проблема в том что спецификация react-dnd, hello-pangea/dnd, react-beatiful-dnd
        // Предоставляет кучу полезного для dnd, однако скрывают нативные координаты дропа :c 
        handleWidgetDrop(result, x, y, NexusTree)
    }, [x, y]);

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