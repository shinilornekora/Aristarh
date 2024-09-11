import React from "react"
import { Display } from '../../features/Display'
import { ButtonColumn } from "../../features/ButtonColumn";

import * as css from './RightColumn.module.css';

export const RightColumn = () => {
    return (
        <div className={css.container}>
            <Display />
            <ButtonColumn />
        </div>
    )
}