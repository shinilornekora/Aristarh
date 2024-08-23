import React, {MutableRefObject, useCallback, useEffect, useMemo, useState} from 'react';

import cn from 'classnames';
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
    const [isMounted, setIsMounted] = useState(false);
    const [posStyles, setStyles] = useState({});

    useEffect(() => {
        fade('in');
        setIsMounted(true);

        return () => {
            setIsMounted(false);
            fade('out');
        }
    }, []);

    const fade = useCallback((direction: 'in' | 'out') => {
        setStyles({
            ...posStyles,
            opacity: Number(direction === 'in'),
        })
    }, [])

    if (smartRef.current === null) {
        return <></>;
    }

    const { offsetLeft, offsetTop, clientHeight } = smartRef?.current;

    setStyles({
        top: offsetTop + clientHeight,
        left: offsetLeft,
    });

    return isMounted ? (
         <div
            className={ css.container }
            style={ posStyles }
            id="dropdown-popup"
        >
            {
                options.map(({name, handler}) => (
                    <div
                        key={name}
                        onClick={handler}
                        className={css.option}
                    >
                        {name}
                    </div>
                ))
            }
        </div>
    ) : <></>;
}