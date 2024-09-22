import React from 'react';

import * as css from './Display.module.css';

export const Display = () => {
    return (
        <div className={ css.display }>
            <div className={ css.innerDisplay }>
                { "Компонент?" }
            </div>
        </div>
    );
}