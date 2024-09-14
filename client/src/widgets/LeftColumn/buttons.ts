import { WidgetMenuVarsType } from "../../shared/Avatar";

interface WidgetButtonsType {
    name: WidgetMenuVarsType;
    size: number;
    type: 'svg' | 'png';
}

export const widgetButtons: WidgetButtonsType[] = [
    {
        name: 'button',
        size: 24,
        type: 'svg',
    },
    {
        name: 'text',
        size: 24,
        type: 'svg'
    },
    {
        name: 'line',
        size: 24,
        type: 'svg'
    },
    {
        name: 'square',
        size: 24,
        type: 'svg'
    },
    {
        name: 'triangle',
        size: 24,
        type: 'svg'
    },
    {
        name: 'circle',
        size: 24,
        type: 'svg'
    },
    {
        name: 'star',
        size: 24,
        type: 'svg'
    },
]