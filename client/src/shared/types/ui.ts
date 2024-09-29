import { MutableRefObject } from "react";

export type ButtonProps = {
    name: AvailableAvatars;
    size: number;
    smartRef?: MutableRefObject<HTMLImageElement | null>;
    className?: string;
    type: 'svg' | 'png';
    onClick?: (eventful: unknown) => void;
}

export type DropdownsType = 'common' | 'server' | 'cursor' | 'page' | 'widget' | 'preview' | 'help' | undefined;

export type ToolsMenuVarsType = 'common' | 'server' | 'widget' | 'page' | 'cursor' | 'preview' | 'help';
export type WidgetMenuVarsType = 'button' | 'text' | 'line' | 'square' | 'triangle' | 'circle' | 'star';

export type AvailableAvatars = ToolsMenuVarsType | WidgetMenuVarsType;

export interface WidgetButtonsType {
    name: WidgetMenuVarsType;
    size: number;
    type: 'svg' | 'png';
}

export type CanvasWidgetProps = WidgetButtonsType & {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type TabType = 'basic' | 'visibility' | 'actions' | 'accommodative';