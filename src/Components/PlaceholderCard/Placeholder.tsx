import React, { useContext, useEffect } from "react";
import { Context, myContext } from "../../Settings";

export const PlaceholderCard: React.FC = (): JSX.Element => {
    const {postsActive, setPostsActive}:myContext = useContext(Context)
    useEffect(() => {
        const timerId = setTimeout(() => {
            setPostsActive(false)
        }, 1000); 

        return () => {
            clearTimeout(timerId); 
        };
    }, [postsActive]);
    return (
        <div className="card mt-3 w-50 text-center mx-auto" aria-hidden="true">
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6" />
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7" />
                    <span className="placeholder col-4" />

                </p>
                <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true" />
            </div>
        </div>
    )
}