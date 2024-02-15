import React from "react";

export const Error:React.FC = ():JSX.Element => {
    return(
        <div className="error__title-box text-center">
            <h3 className="error__title text-danger">Postlar mavjud emas</h3>
        </div>
    )
}