import React, { MutableRefObject, useState } from 'react';

export type ButtonProps = {
    name: string;
    size: number;
    smartRef?: MutableRefObject<HTMLImageElement | null>;
    type: 'svg' | 'png';
    onClick?: (eventful: unknown) => void;
}

export const Avatar: React.FC<ButtonProps> = ({ onClick, name, size, type, smartRef }) => {
    const [img, setImg] = useState('');

    if (type !== 'svg') {
        return 'Unsupported static file type!';
    }

    import(`../../static/svg/icon-${name}.${type}`).then(image => setImg(image.default));

    return (
        <img 
            onClick={ onClick }
            src={ img }
            ref={ smartRef }
            width={ size }
            height={ size }
            alt={ name }
        />
    )
}