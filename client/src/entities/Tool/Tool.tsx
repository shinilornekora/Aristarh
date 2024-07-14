import React from "react"

interface Props {
    name: string;
    icon: string;
    onClick: () => void;
    onHover?: () => void;
}

export const Tool: React.FC<Props> = props => {
    return (
        <div { ...props }>

        </div>
    )
}