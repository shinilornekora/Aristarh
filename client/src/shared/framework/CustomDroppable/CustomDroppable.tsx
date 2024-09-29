import React from 'react';
import { 
    Droppable, 
    DroppableProps, 
    DroppableProvided, 
    DroppableStateSnapshot 
} from '@hello-pangea/dnd';

export const CustomDroppable: React.FC<DroppableProps> = ({ droppableId, children, ...props }) => {
    const styles = droppableId === 'constructorDroppable' ? { width: '100%' } : {};

    return (
        <Droppable droppableId={droppableId} {...props}>
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <div style={styles} ref={provided.innerRef} {...provided.droppableProps}>
                    {typeof children === 'function' ? children(provided, snapshot) : children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};
