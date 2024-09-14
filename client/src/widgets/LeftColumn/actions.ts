import { WidgetMenuVarsType } from "../../shared/Avatar";

type UnknownEvent = (eventful: unknown) => void;
type ActionsType = Record<WidgetMenuVarsType, { handler: UnknownEvent; }>

export const actions: ActionsType = {
    'button': {
        handler: () => {}
    },
    'text': {
        handler: () => {}
    },
    'line': {
        handler: () => {}
    },
    'square': {
        handler: () => {}
    },
    'triangle': {
        handler: () => {}
    },
    'circle': {
        handler: () => {}
    },
    'star': {
        handler: () => {}
    }
}