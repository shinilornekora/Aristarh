import React, { MutableRefObject, useMemo } from 'react';

import * as css from './Dropdown.module.css';

interface DropdownOption {
    name: string;
    handler: () => void;
}

type Props = {
    options: DropdownOption[];
    smartRef: MutableRefObject<HTMLElement | null>;
}

export const Dropdown: React.FC<Props> = ({ options, smartRef }) => {
    if (smartRef.current === null) {
        return;
    }

    const { offsetLeft, offsetTop, clientHeight } = smartRef?.current;
    
    const potisionStyles = useMemo(() => ({
        top: offsetTop + clientHeight,
        left: offsetLeft
    }), [offsetLeft, offsetTop, clientHeight]);

    return (
        <div className={ css.container } style={ potisionStyles }>
            { options.map(({ name, handler }) => (
                <div 
                    key={ name }
                    onClick={ handler } 
                    className={ css.option }
                >
                    { name }
                </div>
            )) }
        </div>
    )
}