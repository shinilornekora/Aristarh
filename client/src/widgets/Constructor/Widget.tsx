import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { NexusTreeNode } from '../../shared/types/store';


type Props = {
    config: NexusTreeNode;
    index: number;
};

export const Widget: React.FC<Props> = ({ config, index }) => {
    return (
        <Draggable draggableId={config.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        backgroundColor: 'white',
                    }}
                >
                    Красава, круто перетащил
                </div>
            )}
        </Draggable>
    );
};
