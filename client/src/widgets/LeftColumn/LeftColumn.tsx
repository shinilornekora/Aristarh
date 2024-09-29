import React, { useCallback, useEffect, useState } from "react";
import cn from 'classnames';
import { widgetButtons } from "./buttons";
import { useDispatch, useSelector } from "react-redux";
import { DraggableWidget } from "./DraggableWidget";
import * as css from './LeftColumn.module.css';
import { CustomDroppable } from "../../shared/framework/CustomDroppable/CustomDroppable";
import { DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import { Actions, StateType } from "../../shared/types/store";

export const LeftColumn = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector<StateType, boolean>(state => state.scenarios.isLeftColumnVisible);
    const [canShowColumn, setColumnState] = useState<boolean>(isVisible);

    useEffect(() => {
        setColumnState(isVisible);
    }, [isVisible]);

    const handleCloseLeftColumn = useCallback(() => {
        dispatch({ type: Actions.CLOSE_LEFT_COLUMN });
    }, [dispatch]);

    useEffect(() => {
        const timeout = setTimeout(handleCloseLeftColumn, 20000);
        return () => clearTimeout(timeout);
    }, [handleCloseLeftColumn]);

    return (
        <CustomDroppable droppableId="leftColumnDroppable">
            {(provided: DroppableProvided) => (
                <div 
                    className={cn(css.container, { [css.show]: canShowColumn }, 'qa-LeftColumn')} 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <div className={css.content}>
                        {widgetButtons.map((config, index) => (
                            <DraggableWidget 
                                key={config.name} 
                                index={index} 
                                config={config} 
                            />
                        ))}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </CustomDroppable>
    );
};
