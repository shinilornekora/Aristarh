import React from "react";

import cn from 'classnames';

import Processes from "../../shared/processes"
import { ToolsPanel } from "../../widgets/ToolsPanel";
import { RightColumn } from "../../widgets/RightColumn";
import { Canvas } from "../../widgets/Canvas";

import * as css from './Main.module.css';

export const Main = () => {    
    return (
            <div className={ cn(css.layout, 'qa-MainPage') }>
                <div
                    style={{
                        width: '100%',
                        display: 'flex'
                    }}
                >
                    <ToolsPanel />
                    <Canvas />
                    <RightColumn />
                    <Processes />
                </div>
            </div>
    );
}

