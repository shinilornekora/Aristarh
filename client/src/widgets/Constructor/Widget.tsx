import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { WidgetButtonsType } from '../LeftColumn/buttons';
import { actions } from '../LeftColumn/actions';
import { Avatar } from '../../shared/Avatar';

import * as css from '../LeftColumn/LeftColumn.module.css';

type Props = {
    config: WidgetButtonsType;
    index: number;
};

export const Widget: React.FC<Props> = ({ config, index }) => {
    return (
        <Draggable draggableId={config.name} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        backgroundColor: 'white',
                    }}
                >
                    <Avatar
                        onClick={actions[config.name].handler}  
                        className={css.pic}
                        {...config}
                    />
                </div>
            )}
        </Draggable>
    );
};