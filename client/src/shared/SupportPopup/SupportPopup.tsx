import React, { useCallback } from 'react';

import { BasePopup } from "../BasePopup";
import { useDispatch } from 'react-redux';
import { Actions } from '../types';

import * as css from './SupportPopup.module.css';

export const SupportPopup = () => {
    const dispatch = useDispatch();
    const onClose = useCallback(() => dispatch({ type: Actions.END_SUPPORT_POPUP_SCENARIO }), [])

    return (
        <BasePopup onClose={ onClose } size="large">
            <div className={ css.outer }>
                <p>Окно подсказок, будет дополняться.</p>
                <p>Для закрытия нажмите на область вне этого окна.</p>
            </div>    
        </BasePopup>
    );
};