import React, {
    MutableRefObject, 
    useCallback, 
    useEffect, 
    useRef, 
    useState, 
    memo, 
    useMemo, 
    CSSProperties
} from 'react';

import cn from 'classnames';

import { OptionList } from './OptionList';

import * as css from './Dropdown.module.css';
import { ImageEvent } from '../types';

export interface DropdownOption {
    name: string;
    handler: () => void;
}

type Props = {
    onClose: () => void;
    options: DropdownOption[];
    smartRef: MutableRefObject<HTMLDivElement | null>;
    additionals?: {
        extraCloseCheck: (event: ImageEvent) => boolean;
    }
}

/**
 * Компонент дропдауна.
 * Решил унифицировать, поскольку использовать мы его будем везде.
 * 
 * @param onClose - функция, которая отработает при закрытии
 * @param options - контекст наполнения компонента
 * @param smartRef - указатель на ноду, к которой нужно привязаться
 * @param additionals - опциональные параметры
 * - @function extraCloseCheck - функция, передающая признак фейкового закрытия
 */
export const Dropdown: React.FC<Props> = memo(({ options, onClose, smartRef, additionals }) => {
    const ref = useRef<HTMLDivElement>(null);

    const initialStyles = useMemo(() => {
        if (smartRef.current) {
            const { offsetLeft, offsetTop, clientHeight } = smartRef?.current;

            return {
                top: offsetTop + clientHeight,
                left: offsetLeft,    
            }
        }

        return {};
    }, []);

    const [_posStyles, setStyles] = useState<CSSProperties>(initialStyles);
    const [fade, setFade] = useState<'in' | 'out'>('out');
    const checkIfClickedOutside = useCallback((e: unknown) => {
        const element = (e as { target: HTMLDivElement }).target;
        const isClickedOutside = ref.current && !ref.current.contains(element);

        if (!isClickedOutside) {
            return;
        }

        // Если дополнительная проверка прошла, то мы мягко скрываем дропдаун и рисуем его в другом месте
        if (additionals?.extraCloseCheck && additionals.extraCloseCheck(e as ImageEvent)) {
            setStyles({
                ..._posStyles,
                ...getPCC(element)
            })
            
            return;
        }

        // Мягкое закрытие и последующий вырез из DOM
        new Promise((resolve) => {
            setFade('out')
            setTimeout(resolve, 200)
        }).then(onClose)
    }, [ref.current]);

    useEffect(() => {
        setTimeout(() => window.document.addEventListener('click', checkIfClickedOutside), 1);

        if (Object.values(_posStyles).length || !smartRef.current) {
            setFade('in');
        }

        return () => {
            window.document.removeEventListener('click', checkIfClickedOutside);
        }
    }, [smartRef.current, setStyles]);

    useEffect(() => {
        setStyles({ 
            ...getPCC(smartRef.current!), 
            opacity: Number(fade === 'in') });
    }, [fade, JSON.stringify(options)]);
    
    return (
         <div
            className={ cn(css.container, 'qa-Dropdown') }
            style={ _posStyles }
            id="dropdown-popup"
            ref={ ref }
        >
            <OptionList options={ options } />
        </div>
    );
});

// Расшифровка - get precise component coordinates
function getPCC(node: HTMLDivElement) {
    const { offsetLeft, offsetTop, clientHeight } = node;

    return {
        top: offsetTop + clientHeight,
        left: offsetLeft,    
    }
}