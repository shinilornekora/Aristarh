import { DropResult } from "@hello-pangea/dnd";
import { store } from "../../../shared/store/store";
import { Actions, NexusTreeState } from "../../../shared/types/store";
import { exploreLocation } from "./exploreLocation";
import { makeChildren } from "./makeChildren";

export const handleWidgetDrop = (result: DropResult, clientX: number, clientY: number, tree: NexusTreeState) => {
    if (!result.destination) return;

    const location = exploreLocation(clientX, clientY, tree.root);

    if (location === -1) {
        return;
    }

    const child = makeChildren(result, clientX, clientY);

    if (child === -1) {
        return;
    }

    store.dispatch({
        type: Actions.ADD_TO_TREE,
        payload: {
            path: location,
            children: child
        }
    });
};
