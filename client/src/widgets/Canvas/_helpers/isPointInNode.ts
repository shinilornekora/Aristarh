import { _EXPLORE_LOC_TYPE } from "./exploreLocation";

// Функция-хелпер, проверяет что все 4 точки внутри нужной границы.
export const isPointInNode = ({ newWidget, root }: _EXPLORE_LOC_TYPE): boolean => {
    const { x, y, width, height } = newWidget;

    return (
        x >= root.x &&
        x + width <= root.x + root.width &&
        y >= root.y &&
        y + height <= root.y + root.height
    );
};
