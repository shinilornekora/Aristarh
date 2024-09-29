import { store } from "../../shared/store/store";
import { Actions } from "../../shared/types/store";
import { WidgetMenuVarsType } from "../../shared/types/ui";

type UnknownEvent = (eventful: unknown) => void;
type ActionsType = Record<WidgetMenuVarsType, { handler: UnknownEvent; }>

function callRightColumn(id: string) {
    const MAYBE_WIDGET_ID = `${id}-${Math.random()}`;

    store.dispatch({
        type: Actions.START_DND_SCENARIO,
        payload: {
            targetElementId: MAYBE_WIDGET_ID
        }
    })  
}

export const actions: ActionsType = {
    'button': {
        handler: () => callRightColumn('NewButtonId')  
    },
    'text': {
        handler: () => callRightColumn('NewTextId')
    },
    'line': {
        handler: () => callRightColumn('NewLineId')
    },
    'square': {
        handler: () => callRightColumn('NewSquareId')
    },
    'triangle': {
        handler: () => callRightColumn('NewTriangleId')
    },
    'circle': {
        handler: () => callRightColumn('NewCircleId')
    },
    'star': {
        handler: () => callRightColumn('NewStarId')
    }
}