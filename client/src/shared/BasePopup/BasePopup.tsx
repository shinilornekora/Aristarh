import React, { useMemo, memo } from 'react';

import * as css from './BasePopup.module.css';
import cn from 'classnames';

type Props = {
    size: 'small' | 'medium' | 'large';
    children: JSX.Element;
}

/**
 * Базовый шаблон попапа.
 * На основе него можно сделать самые разные их виды.
 * 
 * @param size - размер попапа
 * @param children - наполнение попапа 
 */
export const BasePopup: React.FC<Props> = memo(({ size, children }) => {
    const PopupContent = () => (
        <div className={ css.inner_popup }>
            { children }
        </div>
    );

    return (
        <div className={ css.outer }>
            <div className={ cn(css.popup, {
                [css.small_v]: size === 'small',
                [css.medium_v]: size === 'medium',
                [css.large_v]: size === 'large'
            })}>
                <PopupContent />
            </div>
        </div>
    )
});