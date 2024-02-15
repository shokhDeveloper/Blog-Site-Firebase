import React from "react";
import { genericsType } from "../../Settings";
interface ErrorInterface {
    errorText: genericsType<string>
}
export const Error:React.FC<ErrorInterface> = ({errorText}):JSX.Element => {
    return(
        <div className="error__title-box text-center">
            <h3 className="error__title text-danger">{errorText}</h3>
        </div>
    )
}