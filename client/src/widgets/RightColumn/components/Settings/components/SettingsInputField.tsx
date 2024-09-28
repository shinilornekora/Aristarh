import React from "react"

import * as css from '../Settings.module.css';

type Props = {
    name: string;
    meta: string;
}

export const SettingsInputField: React.FC<Props> = ({ name, meta }) => {
    const formattedId = `${name}-${Math.round(Math.random() * 1000)}`

    return (
        <section className={ css.inputContainer }>
            <label
                className={ css.settingsLabel }
                htmlFor={ formattedId }
            >
                { meta }
            </label>
            <input
                className={ css.settingsInput }
                id={ formattedId }
                type="text" 
            />
        </section>
    )
}