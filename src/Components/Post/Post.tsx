import React from "react";
import { Author, auth, db } from "../../Settings";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
interface PostInterface {
    id: string | undefined,
    title: string,
    discription: string,
    author: Author,
    getPosts: () => Promise<void>
}
export const Post: React.FC<PostInterface> = ({id, title, author, discription, getPosts}): JSX.Element => {
    const navigate = useNavigate()
    const handleDeletePost = async ():Promise<void> => {
        if(id){
            const deletePost = doc(db, "/posts", id)
            await deleteDoc(deletePost)
            getPosts()
        }
    }
    return (
        <li key={id} className="posts__list-item mt-3 w-50 text-center mx-auto">
            <div className="card position-relative ">

                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-text">{discription}</p>
                    {(function () {
                        if (auth.currentUser?.uid == author.uid) {
                            return (
                                <>
                                <button className="position-absolute top-0 end-0 btn btn-danger" onClick={handleDeletePost}>Delete</button>
                                <button className="btn btn-primary" onClick={() => navigate(`/posts/${id}`)}>Postni yangilash</button>
                                </>
                            )
                        }
                    }())}
                </div>
            </div>
        </li>
    )
} 