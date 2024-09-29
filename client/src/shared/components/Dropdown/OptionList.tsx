import React from 'react';

import { DropdownOption } from "./Dropdown";

import * as css from './Dropdown.module.css';

type Props = {
    options: DropdownOption[];
}

export const OptionList: React.FC<Props> = React.memo(({ options }) => {
    return options.map(({ name, handler }) => (
        <div
            key={ name }
            onClick={ handler }
            className={ css.option }
        >
            { name }
        </div>
    ))
});