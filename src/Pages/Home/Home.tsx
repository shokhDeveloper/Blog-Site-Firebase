import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Context, InitialStateInterface, Post as PostInterface, auth, db, genericsType, myContext, setPosts } from "../../Settings";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { Error, PlaceholderCard, Post } from "../../Components";

export const Home: React.FC = (): JSX.Element => {
    const { token, posts } = useSelector((state: { Reducer: InitialStateInterface }) => state.Reducer)
    const { postsActive, setPostsActive, postsError, setPostsError, setErrorText, errorText }: myContext = useContext(Context)
    const [postsArray, setPostsArray] = useState<genericsType<number[]>>(null)
    const postsCollectionRef = collection(db, "posts")
    const dispatch = useDispatch()
    const handleGetPosts = useCallback(async (): Promise<void> => {
        if (token) {
            const postsQuery = await getDocs(postsCollectionRef)
            let posts: PostInterface[] = postsQuery?.docs?.map((item) => {
                const data = item.data() as DocumentData
                const id: string = item.id
                return {
                    ...data as PostInterface, id
                }
            })
            if(posts?.length){
                dispatch(setPosts(posts))
            }else{
                dispatch(setPosts([]))
                setPostsError(true)
            }
        } else {
            setPostsError(true)
            setErrorText("Token mavjud emas")
            
        }
    }, [token])
    useEffect(() => {
        handleGetPosts()
    }, [handleGetPosts])
    useEffect(() => {
        if (posts?.length) {
            setPostsActive(true)
            setPostsArray(Array.from({ length: posts?.length }, (_, index: number) => index + 1))
        }
    }, [posts])
    return (
        <section className="posts mt-3">
            <div className="container">
                <div className="posts__title-box w-100 text-center my-4 mb-3 d-block">
                    <h2>All Posts</h2>
                </div>
                {posts?.length ? (
                    <ul className="posts__list list-unstyled m-0">
                        {postsActive  ? (
                            postsArray?.map(() => {
                                return (
                                    <PlaceholderCard/>
                                )
                            })
                        ) : (
                            posts?.map((item: PostInterface) => {
                                return (
                                    <Post getPosts={handleGetPosts}  title={item.title} discription={item.discription} id={item.id} author={item.author} />
                                )
                            })
                        )}
                    </ul>
                ) : ( 
                    postsError && !token ? (
                        <Error errorText={errorText}/>
                    ):postsError && token ? (
                        <Error errorText={"Postlar mavjud emas"}/>
                    ):(
                        (function(){
                            let arrayPost:number[] = Array.from({ length: 3 }, (_, index: number) => index + 1)
                            if(!postsArray?.length && !postsError){
                                return arrayPost?.map((item) => {
                                    return (
                                        <PlaceholderCard/>
                                    )
                                })
                            }
                        }())    
                    )
             )}
            </div>
        </section>
    )
}
