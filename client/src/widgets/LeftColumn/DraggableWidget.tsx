import React from "react";
import cn from 'classnames';
import { Draggable } from "@hello-pangea/dnd";
import { Avatar } from "../../shared/components/Avatar";
import { actions } from "./actions";
import * as css from './LeftColumn.module.css';
import { WidgetButtonsType } from "../../shared/types/ui";

type Props = {
    config: WidgetButtonsType;
    index: number;
};

export const DraggableWidget: React.FC<Props> = ({ config, index }) => {
    return (
        <Draggable key={config.name} draggableId={config.name} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(css.widget, `qa-Widget-${config.name}`) }
                >
                    <Avatar
                        onClick={actions[config.name]?.handler}
                        {...config}
                    />
                </div>
            )}
        </Draggable>
    );
};
