import { NexusTreeNode, NexusTreeState } from '../../../shared/types/store';
import { isPointInNode } from './isPointInNode';

interface WidgetClearedType {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface _EXPLORE_LOC_TYPE {
    newWidget: WidgetClearedType;
    root: NexusTreeNode;
}

// TODO - доработки.
// Единственная честная Droppable секция - это холст.
// Логично что нам нужно будет перевести все координаты нод на координаты виджета
// Тогда функция isPointInNode будет работать как нужно.
// Для этого нужно еще одну обертку сделать
export const _exploreLocation = ({ newWidget, root }: _EXPLORE_LOC_TYPE): string[] | number => {
    // Function to understand the place of the widget on the canvas

    const { x, y } = newWidget

    if (x === undefined || y === undefined) {
        Aristarh.scream('[DND]: NO COORDINATES OF DROPPED WIDGET!');
        return -1;
    }

    const rootNode = root;
    const path: string[] = [];

    const findNode = (node: NexusTreeNode, currentPath: string[]) => {
        if (node.id === 'root') {
            path.push(node.id);
            return true;
        }

        if (isPointInNode({ newWidget, root: node })) {
            path.push(...currentPath, node.id);
            return true;
        }

        for (const child of node.children) {
            if (findNode(child, [...currentPath, node.id])) {
                return true;
            }
        }
        return false;
    };

    if (findNode(rootNode, [])) {
        return path;
    }

    return -1;
};

interface ExploreLocationType {
    node: NexusTreeNode;
    tree: NexusTreeState;
}

export const exploreLocation = ({ node, tree }: ExploreLocationType) => {
    const canvas = document.getElementsByClassName('qa-Canvas')[0];

    if (!canvas) {
        Aristarh.scream("[ERROR]: Canvas cannot be found!");
        return -1;
    }

    const rectangledCanvas = canvas.getBoundingClientRect();

    // Примем как данность координаты холста для корня
    const clearRootCords = {
        ...tree.root,
        x: tree.root.x - rectangledCanvas.x,
        y: tree.root.x - rectangledCanvas.y,
        width: tree.root.width,
        height: tree.root.height,
    }

    // Соответственно тоже самое для нового виджета
    const clearWidgetCords = {
        x: node.x - rectangledCanvas.x,
        y: node.y - rectangledCanvas.y,
        width: node.width,
        height: node.height,
    }

    return _exploreLocation({
        newWidget: clearWidgetCords,
        root: clearRootCords
    })
}