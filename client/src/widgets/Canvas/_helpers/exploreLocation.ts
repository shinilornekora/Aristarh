import { NexusTreeNode } from '../../../shared/types/store';


const isPointInNode = (x: number, y: number, node: NexusTreeNode): boolean => {
    // Прокинуть общее значение!
    const nodeWidth = 100;
    const nodeHeight = 50;

    return (
        x >= node.x &&
        x <= node.x + nodeWidth &&
        y >= node.y &&
        y <= node.y + nodeHeight
    );
};

export const exploreLocation = (x: number, y: number, root: NexusTreeNode): string[] | number => {
    // Function to understand the place of the widget on the canvas

    if (x === undefined || y === undefined) {
        Aristarh.scream('[DND]: NO COORDINATES OF DROPPED WIDGET!');
        return -1;
    }

    const rootNode = root;
    const path: string[] = [];

    const findNode = (node: NexusTreeNode, currentPath: string[]) => {
        if (isPointInNode(x, y, node)) {
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
