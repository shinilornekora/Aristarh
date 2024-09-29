import React from "react";
import cn from 'classnames';

import { Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { Widget } from "./Widget";
import { CustomDroppable } from "../../shared/framework/CustomDroppable/CustomDroppable";
import { DroppableProvided } from '@hello-pangea/dnd';
import { useSelector } from "react-redux";
import { NexusTreeNode, NexusTreeState, StateType } from "../../shared/types/store";
import * as css from './Constructor.module.css';

const renderTreeNodes = (node: NexusTreeNode, index: number) => {
    return (
        <Draggable key={node.id} draggableId={node.id} index={index}>
            {(provided: DraggableProvided) => (
                <div
                    ref={provided.innerRef}
                    className={cn(css.widgetPos, `qa-Widget-On-Canvas-${node.id}`)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        width: 'fit-content',
                        left: node.x, 
                        top: node.y,
                    }}
                >
                    <Widget config={node} index={index} />
                    {node.children && node.children.map((childNode, childIndex) => 
                        renderTreeNodes(childNode, childIndex)
                    )}
                </div>
            )}
        </Draggable>
    );
};

export const Constructor = () => {
    const nexusTreeState = useSelector<StateType, NexusTreeState>(state => state.project.tree);

    return ( 
        <CustomDroppable droppableId="constructorDroppable">
            {(provided: DroppableProvided) => (
                <div 
                    className={cn(css.container, 'qa-Constructor')}
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <div className={cn(css.canvas, 'qa-Canvas')}>
                        {renderTreeNodes(nexusTreeState.root, 0)}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </CustomDroppable>
    );
};
