import { DocumentData, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Author, Post, db, genericsType } from "../../Settings";
import { useNavigate, useParams } from "react-router-dom";

export const UpdatePost: React.FC = (): JSX.Element => {
    const [updatePost, setUpdatePost] = useState<genericsType<Post>>(null)
    const navigate = useNavigate()
    const {postId} = useParams()    
    const handleSub =  async (evt:FormEvent<HTMLFormElement>, postId: string | undefined):Promise<void> => {
        evt.preventDefault()
        const data = new FormData(evt.target as HTMLFormElement)
        if(postId){
            const postCollectionRef = doc(db, `/posts`, postId)
            const newPost:Post = {
                title: data.get("title") as string,
                discription: data.get("discription") as string,
                id: postId,
                author: updatePost?.author as Author
            }        
            await updateDoc(postCollectionRef, newPost as Record<string, any>  )
            navigate("/")
        }
    }
    const handleGetPost = useCallback(async ():Promise<void> => {
        if(postId){
            const postCollectionRef = doc(db, `/posts`, postId)
            const postResponse = await getDoc(postCollectionRef)
            if(postResponse.exists()){
                const post = postResponse.data()
                setUpdatePost(post as Post)
            }
        }
    },[postId]) 
    useEffect(() => {
        handleGetPost()
    },[handleGetPost])
    return (
        <>
           <section className="create d-flex align-items-center" style={{minHeight: "80vh"}}>
            <div className="container">
                <div className="create__inner">
                    <div className="create__form-box w-50 mx-auto text-center">
                        <h3>Update Post</h3>
                        <form className="creare__form mt-3" onSubmit={(evt) => handleSub(evt, postId)} >
                            <input defaultValue={updatePost?.title}  autoFocus  className="form-control" type="text" placeholder="Post title" name="title" required/>
                            <textarea defaultValue={updatePost?.discription}  className="form-control my-3" name="discription" placeholder="Post discription" cols={30} rows={10} required></textarea>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}