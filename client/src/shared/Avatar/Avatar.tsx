import React, {
    MutableRefObject, 
    useCallback, 
    useEffect, 
    useRef, 
    useState
} from 'react';

export type ButtonProps = {
    name: string;
    size: number;
    smartRef?: MutableRefObject<HTMLImageElement | null>;
    type: 'svg' | 'png';
    onClick?: (eventful: unknown) => void;
}

export const Avatar: React.FC<ButtonProps> = ({ onClick, name, size, type, smartRef }) => {
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
            src={ img }
            ref={ self }
            width={ size }
            height={ size }
            alt={ name }
        />
    )
}