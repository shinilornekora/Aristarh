export const initialState = {
    project: {
        name: 'Unnamed',
        tree: []
    },
    user: '',
    control: {
        activePopup: undefined,
        rightColumnActiveTab: undefined,
        targetElementId: '',
        mouse: ''
    },
    scenarios: {
        renamingProject: false,
        supportPopupShow: false,
        isLeftColumnVisible: false,
    }
}