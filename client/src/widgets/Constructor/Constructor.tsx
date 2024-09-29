import React, { useContext } from "react";
import cn from 'classnames';

import { Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { Widget } from "./Widget";
import { CustomDroppable } from "../../shared/framework/CustomDroppable/CustomDroppable";
import { DroppableProvided } from '@hello-pangea/dnd';
import * as css from './Constructor.module.css';
import { WidgetContext } from "../Canvas";
import { CanvasWidgetProps } from "../../shared/types/ui";

export const Constructor = () => {
    const { widgets } = useContext(WidgetContext);

    return ( 
        <CustomDroppable droppableId="constructorDroppable">
            {(provided: DroppableProvided) => (
                <div 
                    className={ cn(css.container, 'qa-Constructor') } 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <div className={ cn(css.canvas, 'qa-Canvas') }>
                        {widgets.map((widget: CanvasWidgetProps, index: number) => (
                            <Draggable 
                                key={widget.name} 
                                draggableId={widget.name} 
                                index={index}
                            >
                                {(provided: DraggableProvided) => (
                                    <div 
                                        ref={provided.innerRef}
                                        className={ cn(css.widgetPos, `qa-Widget-On-Canvas-${widget.name}`) }
                                        {...provided.draggableProps} 
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            width: 'fit-content',
                                            left: widget.x,
                                            top: widget.y,
                                        }}
                                    >
                                        <Widget config={widget} index={index} /> 
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </CustomDroppable>
    );
};
