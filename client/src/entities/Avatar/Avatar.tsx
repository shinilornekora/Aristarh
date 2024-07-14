import React, { useState } from 'react';

export type ButtonProps = {
    name: string;
    size: number;
    type: 'svg' | 'png';
}

export const Avatar: React.FC<ButtonProps> = ({ name, size, type }) => {
    const [img, setImg] = useState('');

    if (type !== 'svg') {
        return 'Unsupported static file type!';
    }

    import(`../../static/svg/icon-${name}.${type}`).then(image => setImg(image.default));

    return (
        <img 
            src={ img }
            width={ size }
            height={ size }
            alt={ name }
        />
    )
}