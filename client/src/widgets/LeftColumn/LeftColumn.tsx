import React, { 
    useCallback, 
    useEffect, 
    useState 
} from "react";

import cn from 'classnames';

import { widgetButtons } from "./buttons";
import { useDispatch, useSelector } from "react-redux";
import { Actions, StateType } from "../../shared/types";

import * as css from './LeftColumn.module.css'
import { DraggableWidget } from "./DraggableWidget";

export const LeftColumn = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector<StateType, boolean>(state => state.scenarios.isLeftColumnVisible);
    const [canShowColumn, setColumnState] = useState<boolean>(isVisible);

    const Widgets = useCallback(() => {
        return widgetButtons.map((config, index) => (
            <DraggableWidget 
                key={ config.name } 
                index={ index } 
                config={config} 
            />
        ));
            
    }, [widgetButtons]);

    useEffect(() => {
        if (isVisible) {
            setInterval(() => setColumnState(true), 50);
            return;
        }

        setColumnState(false);
    }, [isVisible])

    // TODO: продумать кейсы когда она бы закрывалась
    const handleCloseLeftColumn = useCallback(() => dispatch({
        type: Actions.CLOSE_LEFT_COLUMN,
    }), [dispatch]);

    useEffect(() => {
        setTimeout(handleCloseLeftColumn, 20000);
    }, [])

    return (
        <div className={ 
            cn(css.container, {
                [css.show]: canShowColumn
            }, 'qa-LeftColumn') 
        }>
            <div className={ css.content }>
                <Widgets />
            </div>
        </div>
    )
}