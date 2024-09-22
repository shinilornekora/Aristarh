import React from "react";
import { SettingsInputField } from "./SettingsInputField";

import * as css from '../Settings.module.css';

export const BasicStyles = () => {
    return (
        <div className={ css.baseSettings }>
            <SettingsInputField name="width" meta="W"/>
            <SettingsInputField name="height" meta="H"/>
            <SettingsInputField name="offsetX" meta="X"/>
            <SettingsInputField name="offsetY" meta="Y"/>
            <SettingsInputField name="background-color" meta="Fill"/>
            <SettingsInputField name="rotate-angle" meta="R"/>
        </div>
    );
}