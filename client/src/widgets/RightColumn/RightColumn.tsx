import React from "react"
import { Display } from '../../features/Display'

import * as css from './RightColumn.module.css';

export const RightColumn = () => {
    return (
        <div className={css.container}>
            <Display />
        </div>
    )
}