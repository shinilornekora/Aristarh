import { Actions, ActionType, StateType } from "../../types/store";

export const treeReducer = (state: StateType, action: ActionType): StateType => {
    const { type, payload } = action;

    switch (type) {
        case Actions.ADD_TO_TREE: {
            let nodePlace = state.project.tree;

            if (!payload.path) {
                return state;
            }

            for (const node of payload.path) {
                const currentNode = nodePlace.children[node];
                if (!currentNode) {
                    return state;
                }
                nodePlace = currentNode;
            }

            nodePlace.children = payload.children;

            return {
                ...state,
                project: {
                    ...state.project,
                },
            };
        }
        default:
            return state;
    }
};
