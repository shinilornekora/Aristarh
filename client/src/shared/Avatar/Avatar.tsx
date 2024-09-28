import React, {
    MutableRefObject, 
    useCallback, 
    useEffect, 
    useRef, 
    useState
} from 'react';

import cn from 'classnames';

export type ToolsMenuVarsType = 'common' | 'server' | 'widget' | 'page' | 'cursor' | 'preview' | 'help';
export type WidgetMenuVarsType = 'button' | 'text' | 'line' | 'square' | 'triangle' | 'circle' | 'star';

type AvailableAvatars = ToolsMenuVarsType | WidgetMenuVarsType;

export type ButtonProps = {
    name: AvailableAvatars;
    size: number;
    smartRef?: MutableRefObject<HTMLImageElement | null>;
    className?: string;
    type: 'svg' | 'png';
    onClick?: (eventful: unknown) => void;
}

export const Avatar: React.FC<ButtonProps> = ({ onClick, className, name, size, type, smartRef }) => {
    const [img, setImg] = useState('');
    const self = useRef(null);

    if (type !== 'svg') {
        return <>'Unsupported static file type!'</>;
    }

    useEffect(() => {
        (async () =>
            import(`../../static/svg/icon-${name}.${type}`)
                .then(image => setImg(image.default))
        )();
    }, [name, type]);

    const handleClick = useCallback((event: unknown) => {
        if (!onClick) {
            return
        }

        if (!smartRef) {
            // Считаем что картинка про внешний мир не знает
            return onClick(event);
        }

        smartRef.current = self.current;
        onClick(event);
    }, [onClick, smartRef])

    return (
        <img
            onClick={ handleClick }
            className={ cn(className, `qa-Avatar-${name}`) }
            src={ img }
            ref={ self }
            width={ size }
            height={ size }
            alt={ name }
        />
    )
}