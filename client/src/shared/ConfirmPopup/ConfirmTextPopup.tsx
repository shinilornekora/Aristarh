import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { BasePopup } from "../BasePopup"

import cn from 'classnames';

import * as css from './ConfirmTextPopup.module.css';
import { useDispatch } from 'react-redux';
import { Actions } from '../types';

type Props = {
    text: string;
    inputId: string;
    cb: (text: string) => unknown;
    cannotBeEmpty?: boolean;
}

const MAX_INPUT_LIMIT = 47;

export const ConfirmTextPopup: React.FC<Props> = ({ text, inputId, cb, cannotBeEmpty }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [errorText, setErrorText] = useState<string>('');
    const dispatcher = useDispatch();

    const onConfirm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputRef.current === null) {    
            return;
        }
        
        if (cannotBeEmpty && !Boolean(inputRef.current.value)) {
            setErrorText("This field cannot be empty.");
            return;
        }

        if (inputRef.current.value.length > MAX_INPUT_LIMIT) {
            setErrorText("Text exceeds possible limit. Cut it.");
            return;
        }

        cb(inputRef.current.value)
        dispatcher({ type: Actions.END_RENAMING_POPUP_SCENARIO });
    }, [cb, inputRef.current?.value, cannotBeEmpty]);
    
    return (
        <BasePopup size="large">
            <form className={ css.form } onSubmit={ onConfirm }>
                <section className={ css.popupText }>
                    <label className={ css.text } htmlFor={ inputId }>{ text }</label>
                    <input 
                        ref={ inputRef }
                        className={ cn(css.input, {
                            [css.error]: Boolean(errorText)
                        }) }
                        id={ inputId }
                        type="text" 
                    />
                    <p className={ css.errorText}>{errorText}</p>
                </section>
                <button className={ css.button } type="submit">Confirm</button>
            </form>
        </BasePopup>
    )
}