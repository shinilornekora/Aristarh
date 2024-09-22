import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Avatar } from "../../shared/Avatar";
import { WidgetButtonsType } from "./buttons";
import { actions } from "./actions";

import * as css from './LeftColumn.module.css';

type Props = {
    config: WidgetButtonsType;
    index: number;
}

export const DraggableWidget: React.FC<Props> = ({ config, index }) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    return (
        // <Draggable
        //     draggableId={ config.name }
        //     index={ index }
        // >
        //     {(provided) => (
        //         <div
        //             {...provided.draggableProps}
        //             {...provided.dragHandleProps}
        //             ref={provided.innerRef}
        //             style={{
        //                 backgroundColor: isDragging ? 'lightblue' : 'white',
        //             }}
        //             onMouseEnter={() => setIsDragging(true)}
        //             onMouseLeave={() => setIsDragging(false)}
        //         >
                    <Avatar
                        onClick={ actions[config.name].handler } 
                        className={ css.pic }
                        { ...config } 
                    />
        //         </div> 
        //     )}
        // </Draggable>
    );
}