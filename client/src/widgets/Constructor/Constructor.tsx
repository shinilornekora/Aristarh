import React, { useContext } from "react";

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { WidgetButtonsType } from '../LeftColumn/buttons';

import * as css from './Constructor.module.css';
import { Widget } from "./Widget";
import { WidgetContext } from "../../pages/Main";

export const Constructor = () => {
    const { widgets } = useContext(WidgetContext);

    return ( 
        <div className={ css.container }>
            <div className={ css.inner }>
                {widgets.map((widget: WidgetButtonsType, index) => (
                    <Widget key={widget.name} config={widget} index={index} /> 
                ))}
            </div>
        </div> 
    )
}