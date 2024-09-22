import React from "react";
import { SettingsInputField } from "./SettingsInputField";

import * as css from '../Settings.module.css';

export const BasicStyles = () => {
    return (
        <div className={ css.baseSettings }>
            <SettingsInputField name="width" />
            <SettingsInputField name="height" />
            <SettingsInputField name="offsetX" />
            <SettingsInputField name="offsetY" />
            <SettingsInputField name="background-color" />
            <SettingsInputField name="border-radius" />
        </div>
    );
}