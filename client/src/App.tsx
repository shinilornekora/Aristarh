import React from "react";
import { Provider } from "react-redux";
import { store } from './store';

import { RightColumn } from "./widgets/RightColumn";
import { ToolsPanel } from "./widgets/ToolsPanel";
import { Constructor } from "./widgets/Constructor";

import * as css from './App.module.css';

export const App = () => {
    return (
        <Provider store={store} >
            <div className={css.layout}>
                <ToolsPanel />
                <Constructor />
                <RightColumn />
            </div>
        </Provider> 
    );
}

