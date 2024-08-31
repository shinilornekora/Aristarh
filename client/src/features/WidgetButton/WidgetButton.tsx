import React from "react";

import * as css from './WidgetButton.module.css'

interface Props {
    text: string;
    onClick: () => void
}

export const WidgetButton: React.FC<Props> = ({ text, onClick }) => {
    return (
        <div className={css.layout} onClick={onClick}>
            {text}
        </div>
    )
}