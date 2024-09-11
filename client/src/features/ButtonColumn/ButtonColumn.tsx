import React from "react";
import { WidgetButton } from "../WidgetButton";

import * as css from './ButtonColumn.module.css'

export const ButtonColumn = () => {
    const clickHandler = () => {
        alert('Button clicked!');
    };
    
    return (
        <div className={css.layout}>
            <WidgetButton text="text" onClick={clickHandler}/>
            <WidgetButton text="text" onClick={clickHandler}/>
            <WidgetButton text="text" onClick={clickHandler}/>
            <WidgetButton text="text" onClick={clickHandler}/>
            <WidgetButton text="text" onClick={clickHandler}/>
            <WidgetButton text="text" onClick={clickHandler}/>
            <WidgetButton text="text" onClick={clickHandler}/>
        </div>
    )
}