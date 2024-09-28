import React, { memo, useRef, useEffect } from 'react';

import * as css from './BasePopup.module.css';
import cn from 'classnames';

type Props = {
    size: 'small' | 'medium' | 'large';
    children: JSX.Element;
    onClose?: () => void;
}

/**
 * Базовый шаблон попапа.
 * На основе него можно сделать самые разные их виды.
 * 
 * @param size - размер попапа
 * @param children - наполнение попапа 
 */
export const BasePopup: React.FC<Props> = memo(({ size, children, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);
  
    const PopupContent = () => (
        <div className={css.inner_popup}>{children}</div>
    );
  
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose?.();
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  
    return (
        <div className={ cn(css.outer, 'qa-BasePopup') }>
            <div
                ref={ popupRef }
                className={ 
                    cn(css.popup, {
                        [css.small_v]: size === 'small',
                        [css.medium_v]: size === 'medium',
                        [css.large_v]: size === 'large',
                    }) 
                }
            >
                <PopupContent />
            </div>
        </div>
    );
});