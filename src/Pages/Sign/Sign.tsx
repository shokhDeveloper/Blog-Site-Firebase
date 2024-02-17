import { signInWithPopup, signOut } from "firebase/auth";
import React from "react";
import { GoogleResponse, InitialStateInterface, User, auth, provider, setToken, setUser } from "../../Settings";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
export const Sign: React.FC = (): JSX.Element => {
    const { token } = useSelector((state: { Reducer: InitialStateInterface }) => state.Reducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSign = (): void => {
        signInWithPopup(auth, provider).then((response) => {
            const user: User = {
                email: response.user?.email as string,
                firstName: response.user.displayName?.split(" ")[0] as string,
                name: response.user.displayName?.split(" ")[1] as string,
                photoURL: response.user.photoURL as string,
                uid: response.user.uid
            }
            if (response?.user) {
                dispatch(setUser(user))
                dispatch(setToken(v4()))
                window.location.reload()
                navigate("/");
            }
        })
    }
    const handleSignOut = async () => {
        await signOut(auth).then(() => {
            dispatch(setUser(null))
            dispatch(setToken(null))
            window.localStorage.clear()
            window.location.reload()
            navigate("/")
        })
    }
    return (
        <section className="sign d-flex align-items-center justify-content-center text-center " style={{ minHeight: "90vh" }}>
            <div className="container">
                <div className="sign__inner">
                    {!token ? (
                        <button className="btn btn-primary" onClick={handleSign}>Sign with Google</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleSignOut}>SinOut</button>
                    )}
                </div>
            </div>
        </section>
    )
}