import React from "react";
import { SupportPopup } from "../components/SupportPopup";
import { useSelector } from "react-redux";
import { StateType } from "../types";

export const SupportPopupProcess = () => {
    const isSupportPopupScenario = useSelector<StateType, boolean>(state => state.scenarios.supportPopupShow);
    return (
        <>
            { isSupportPopupScenario && <SupportPopup /> }
        </>
    )
}