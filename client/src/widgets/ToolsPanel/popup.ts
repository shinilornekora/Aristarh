import { ToolsMenuVarsType } from '../../shared/components/Avatar';
import { store } from '../../shared/store/store';
import { Actions } from '../../shared/types';

interface DropdownMenuProp {
    name: string;
    handler: () => void;
    instant?: boolean;
}

type DropdownProps = Record<ToolsMenuVarsType, DropdownMenuProp[]>

/**
 * Так, тут стоит понять что handler по сути только и должен запускать диспатчи
 * Не стоит здесь примешивать какую-то иную логику иначе будет сложно жить
 * Ну и надо бы как-то разнести этот объект
 * 
 * TODO: некоторые из кнопок должны быть без дропдауна, добавить условие instant
 */
export const dropdowns: DropdownProps = {
    'common': [
        {
            name: 'Import JSON',
            handler: () => store.dispatch({ type: Actions.START_IMPORT_SCENARIO }),
        },
        {
            name: 'Export JSON',
            handler: () => store.dispatch({ type: Actions.START_EXPORT_SCENARIO }),
        },
        {
            name: 'Export project',
            handler: () => store.dispatch({ type: Actions.START_EXPORT_PROJECT_SCENARIO }),
        },
        {
            name: 'Rename project',
            handler: () => store.dispatch({ type: Actions.START_RENAMING_POPUP_SCENARIO }),
        }
    ],
    'cursor': [
        {
            name: 'Cursor tool',
            handler: () => store.dispatch({ type: Actions.CHANGE_MOUSE_STATE, payload: { control: 'cursor' } })
        },
        {
            name: 'Select tool',
            handler: () => store.dispatch({ type: Actions.CHANGE_MOUSE_STATE, payload: { control: 'select' } })
        },
        {
            name: 'Rotate tool',
            handler: () => store.dispatch({ type: Actions.CHANGE_MOUSE_STATE, payload: { control: 'rotate' } })
        },
        {
            name: 'Scale tool',
            handler: () => store.dispatch({ type: Actions.CHANGE_MOUSE_STATE, payload: { control: 'scale' } })
        }
    ],
    'widget': [
        {
            name: 'Show widget',
            handler: () => store.dispatch({ type: Actions.OPEN_LEFT_COLUMN }),
            instant: true
        }
    ],
    'page': [
        {
            name: 'Open page settings',
            handler: () => store.dispatch({ type: Actions.OPEN_PAGE_SETTINGS }),
            instant: true
        }
    ],
    'server': [
        {
            name: 'Open server settings',
            handler: () => store.dispatch({ type: Actions.OPEN_SERVER_SETTINGS }),
            instant: true
        }
    ],
    // Мы обязаны запомнить открытый window, иначе потеряем контроль над превью
    'preview': [
        {
            name: 'See the preview in new page',
            handler: () => store.dispatch({
                type: Actions.START_PREVIEW_SCENARIO,
                payload: { pageContext: window.open('https://example.com', '_blank') }
            })
        },
        {
            name: 'See the preview in current page',
            handler: () => store.dispatch({
                type: Actions.START_PREVIEW_SCENARIO,
                payload: { pageContext: window.open('https://example.com', '_self') }
            })
        }
    ],
    'help': [
        {
            name: 'See the official site',
            handler: () => window.open('https://example.com/', '_blank'),
        },
        {
            name: 'Open support popup',
            handler: () => store.dispatch({ type: Actions.START_SUPPORT_POPUP_SCENARIO })
        }
    ]
}