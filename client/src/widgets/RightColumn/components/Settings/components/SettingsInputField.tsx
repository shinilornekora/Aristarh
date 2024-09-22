import React from "react"

import * as css from '../Settings.module.css';

type Props = {
    name: string;
}

export const SettingsInputField: React.FC<Props> = ({ name }) => {
    const formattedId = `${name}-${Math.round(Math.random() * 1000)}`

    return (
        <section className={ css.inputContainer }>
            <label htmlFor={ formattedId }></label>
            <input
                className={ css.settingsInput }
                id={ formattedId }
                type="text" 
            />
        </section>
    )
}