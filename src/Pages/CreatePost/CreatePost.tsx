import React, { FormEvent, FormEventHandler, useEffect, useRef } from "react";
import { InitialStateInterface, Post, auth, db, genericsType } from "../../Settings";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const CreatePost:React.FC = ():JSX.Element => {
    const {token} = useSelector((state:{Reducer:InitialStateInterface}) => state.Reducer)
    const navigate = useNavigate()
    const collectionRef = collection(db, "posts")
    const titleRef = useRef<genericsType<HTMLInputElement>>(null)
    const discriptionRef = useRef<genericsType<HTMLTextAreaElement>>(null)
    const handleCreatePost = async (evt:FormEvent<HTMLFormElement>):Promise<void> => {
        evt.preventDefault()
        if(token){
            const data = new FormData(evt.target as HTMLFormElement)
            const post:Post = {
                title: data.get("title") as string,
                discription: data.get("discription") as string,
                author: {
                    name: auth.currentUser?.displayName?.split(" ")[0] as string,
                    firstName: auth.currentUser?.displayName?.split(" ")[1] as string,
                    uid: auth.currentUser?.uid as string
                }
            }
            await addDoc(collectionRef, post)
            navigate("/")
        }else{
            throw new Error("TOKEN ERROR")
        }
    }
    return (
        <section className="create d-flex align-items-center" style={{minHeight: "80vh"}}>
            <div className="container">
                <div className="create__inner">
                    <div className="create__form-box w-50 mx-auto text-center">
                        <h3>Create Post</h3>
                        <form  className="creare__form mt-3" onSubmit={(evt) => handleCreatePost(evt)}>
                            <input ref={titleRef} autoFocus  className="form-control" type="text" placeholder="Post title" name="title" />
                            <textarea ref={discriptionRef} className="form-control my-3" name="discription" placeholder="Post discription" cols={30} rows={10}></textarea>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}