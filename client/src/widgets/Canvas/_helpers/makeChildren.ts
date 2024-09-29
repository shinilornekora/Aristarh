import { DropResult } from "@hello-pangea/dnd";
import { NexusTreeNode } from '../../../shared/types/store';

export const makeChildren = (result: DropResult, clientX: number, clientY: number): NexusTreeNode | number => {
    if (!result || !result.draggableId) {
        Aristarh.scream('[DND]: NO CHILD WAS PROVIDED?');
        return -1;
    }

    const child: NexusTreeNode = {
        id: result.draggableId,
        name: result.draggableId, 
        x: clientX,
        y: clientY,
        children: [],
        type: 'widget',
        styles: {}
    };

    return child;
};
