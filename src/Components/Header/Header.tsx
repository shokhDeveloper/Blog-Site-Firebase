import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { InitialStateInterface } from "../../Settings";
export const Header: React.FC = (): JSX.Element => {
    const { token, user } = useSelector((state: { Reducer: InitialStateInterface }) => state.Reducer)
    return (
        <header className="bg-dark py-3 text-center text-light position-sticky top-0" style={{ zIndex: 1 }}>
            <div className="container">
                <div className="header__inner d-flex justify-content-between align-items-center">
                    <a className="fs-3 text-light text-decoration-none" href="">
                        Blog Site
                    </a>
                    <nav>
                        <ul className="d-flex m-0 list-unstyled">
                            <li>
                                <NavLink className={({ isActive }) => isActive ? "text-primary  text-decoration-underline fs-5" : "text-light text-decoration-none fs-5"} to={"/"}>Home</NavLink>
                            </li>
                            <li className="mx-4">
                                {token && (
                                    <NavLink className={({ isActive }) => isActive ? "text-primary text-decoration-underline fs-5" : "text-light text-decoration-none fs-5"} to={"/create-post"}>Create Post</NavLink>
                                )}
                            </li>
                            <li className="me-4">
                                <NavLink className={({ isActive }) => isActive ? "fs-5 text-primary text-decoration-underline" : "text-light text-decoration-none fs-5"} to={"/sign"}>Sign</NavLink>
                            </li>
                            <li>
                                {(function () {
                                    if (token) {
                                        return (
                                            <span className=" bg-light p-2 text-dark fs-5 rounded-pill fs-5">{user?.firstName.charAt(0)}.{user?.name.charAt(0)}</span>
                                        )
                                    }
                                }())}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}