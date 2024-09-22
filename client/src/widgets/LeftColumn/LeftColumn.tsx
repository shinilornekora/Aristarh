import React, { 
    useCallback, 
    useEffect, 
    useMemo, 
    useState 
} from "react";

import cn from 'classnames';

import { widgetButtons } from "./buttons";
import { Avatar } from "../../shared/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Actions, StateType } from "../../shared/types";

import * as css from './LeftColumn.module.css'
import { actions } from "./actions";

export const LeftColumn = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector<StateType, boolean>(state => state.scenarios.isLeftColumnVisible);
    const [canShowColumn, setColumnState] = useState<boolean>(isVisible);

    const Widgets = useMemo(() => {
        return widgetButtons.map(config => {
            return (
                <Avatar 
                    key={ config.name }
                    onClick={ actions[config.name].handler } 
                    className={ css.pic }
                    { ...config } 
                />
            )
        })
    }, [widgetButtons]);

    useEffect(() => {
        if (isVisible) {
            setInterval(() => setColumnState(true), 50);
            return;
        }

        setColumnState(false);
    }, [isVisible])

    const handleCloseLeftColumn = useCallback(() => dispatch({
        type: Actions.CLOSE_LEFT_COLUMN,
    }), [dispatch]);

    return (
        <div className={ 
            cn(css.container, {
                [css.show]: canShowColumn
            }, 'qa-LeftColumn') 
        }>
            <div className={ css.content }>
                { Widgets }
            </div>
        </div>
    )
}