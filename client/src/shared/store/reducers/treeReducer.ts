import { Actions, ActionType, NexusTreeNode, StateType } from "../../types/store";

export const treeReducer = (state: StateType, action: ActionType): StateType => {
    const { type, payload } = action;

    switch (type) {
        case Actions.ADD_TO_TREE: {
            if (!payload.path) {
                // Мы не знаем куда идти, фоллбек
                return state;
            }

            const updateNodeChildren = (node: NexusTreeNode, path: string[], children: NexusTreeNode[]): NexusTreeNode => {
                if (path.length === 0) {
                    // Длина - 0, значит корень
                    return { ...node, children };
                }

                const [currentNodeId, ...remainingPath] = path;
                const currentNode = node.children.find(child => child.id === currentNodeId);

                if (!currentNode) {
                    // Конец погружения
                    return node;
                }

                return {
                    ...node,
                    children: node.children.map(child =>
                        child.id === currentNodeId
                            ? updateNodeChildren(child, remainingPath, children)
                            : child
                    ),
                };
            };

            const newTreeRoot = updateNodeChildren(state.project.tree.root, payload.path, payload.children as any);

            return {
                ...state,
                project: {
                    ...state.project,
                    tree: {
                        root: newTreeRoot,
                        selectedNodeId: '',
                        expandedNodeIds: [],
                    }
                }
            };
        }
        default:
            return state;
    }
};
