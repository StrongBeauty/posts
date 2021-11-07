import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {PostsService} from "../API/PostsService";
import {Loader} from "../components/UI/Loader/Loader";
import {useParams} from "react-router-dom";

export const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostsService.getById(id)
        setPost(response.data)
    })
    const [fetchCommentsById, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostsService.getCommentsById(id)
        setComments(response.data)
    })

    useEffect(() =>{
        fetchPostById(params.id)
        fetchCommentsById(params.id)
    }, [])


    return (
        <div>
            <h3 style={{marginTop: '25px'}}>Page with ID={params.id}</h3>
            {isLoading
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }
            <h2 style={{marginTop: '25px'}}>
                Comments
            </h2>
            {isCommentsLoading
                ? <Loader />
                : <div>{comments.map(c =>
                    <div key={c.email} style={{marginTop: '15px'}}>
                        <h4>{c.email}</h4>
                        <div>{c.body}</div>
                    </div>
                )}</div>
            }
        </div>
    )
}
