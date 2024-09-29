import { StateType } from "../types/store";

export const initialState: StateType = {
    project: {
        name: 'Unnamed',
        tree: {
            root: {
                id: 'root',
                name: 'root',
                children: [],
                type: 'container',
            },
            selectedNodeId: '',
            expandedNodeIds: []
        }
    },
    user: '',
    control: {
        activePopup: undefined,
        rightColumnActiveTab: undefined,
        targetElementId: '',
    },
    scenarios: {
        renamingProject: false,
        supportPopupShow: false,
        isLeftColumnVisible: false,
    }
}