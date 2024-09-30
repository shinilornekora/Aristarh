import { DropResult } from "@hello-pangea/dnd";
import { store } from "../../../shared/store/store";
import { Actions, NexusTreeState } from "../../../shared/types/store";
import { exploreLocation } from "./exploreLocation";
import { makeChildren } from "./makeChildren";

export const handleWidgetDrop = (result: DropResult, clientX: number, clientY: number, tree: NexusTreeState) => {
    let canvas: DOMRect;

    Aristarh.voice("[DROP] DnD scenario start: ", {
        tree: JSON.stringify(tree),
        dropInfo: result,
        clientX, 
        clientY, 
    });

    if (!result.destination) {
        Aristarh.voice("[DROP]: DnD scenario end - dropped in non-droppable section.")
        return;
    }

    if (result.destination.droppableId === 'constructorDroppable') {
        canvas = document
            .getElementsByClassName('qa-Canvas')[0]
            .getBoundingClientRect()
    }

    const location = exploreLocation({ 
        // TODO: что нибудь сделать с этим, не дело подавать столько моков
        node: {
            id: result.draggableId + Math.round(Math.random() * 9e+05),
            name: result.draggableId,
            children: [],
            type: '',
            width: 100,
            height: 100,
            x: clientX, 
            y: clientY, 
        },
        tree, 
    });

    if (location === -1) {
        Aristarh.scream(
            "[DROP]: parent node does not exist!", { 
            tree: JSON.stringify(tree.root), 
            clientX, 
            clientY
        });
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
