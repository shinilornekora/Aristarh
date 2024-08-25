import { store } from '../../shared/store';
import { Actions } from '../../shared/types';

/**
 * Так, тут стоит понять что handler по сути только и должен запускать диспатчи
 * Не стоит здесь примешивать какую-то иную логику иначе будет сложно жить
 * Ну и надо бы как-то разнести этот объект
 */
export const dropdowns = {
    'common': [
        {
            name: 'Import JSON',
            handler: () => {},
        },
        {
            name: 'Export JSON',
            handler: () => {},
        },
        {
            name: 'Export project',
            handler: () => {},
        },
        {
            name: 'Rename project',
            handler: () => store.dispatch({ type: Actions.START_RENAMING_POPUP_SCENARIO }),
        }
    ],
    'cursor': [
        {
            name: 'Cursor tool',
            handler: () => {}
        },
        {
            name: 'Select tool',
            handler: () => {}
        },
        {
            name: 'Rotate tool',
            handler: () => {}
        },
        {
            name: 'Scale tool',
            handler: () => {}
        }
    ],
    'widget': [
        {
            name: 'Show widget',
            handler: () => {}
        }
    ],
    'page': [
        {
            name: 'test',
            handler: () => {}
        }
    ],
    'server': [
        {
            name: 'test',
            handler: () => {}
        }
    ],
    'preview': [
        {
            name: 'See the preview in new page',
            handler: () => {}
        },
        {
            name: 'See the preview in new window',
            handler: () => {}
        }
    ],
    'help': [
        {
            name: 'See the official site',
            handler: () => {}
        },
        {
            name: 'Open support popup',
            handler: () => {}
        }
    ]
}