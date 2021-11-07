import React, {useState} from 'react';
import {MyInput} from "./UI/input/MyInput";
import {MyButton} from "./UI/button/MyButton";

export const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})
    //const bodyInputRef = useRef()

    const addNewPost = (e) => {
        e.preventDefault()
        //setPosts([...posts, {...post, id: Date.now()}])
        const newPost = {
            ...post, id: Date.now(),

        }
        create(newPost)
        setPost({title: '', body: ''})
    }
    /*    const addNewPost = (e) => {
            e.preventDefault()
            console.log(title)
            console.log(bodyInputRef.current.value)
        }*/

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                type='text'
                placeholder='Title'/>
            <MyInput
                value={post.body}
                onChange={(e) => setPost({...post, body: e.target.value})}
                type='text'
                placeholder='Title'/>
            {/*                //Неконтролируемые компоненты
                <input ref={bodyInputRef} type='text'/>
                <MyInput
                    ref={bodyInputRef}
                    type='text'
                    placeholder='Description' />*/}
            <MyButton onClick={addNewPost}>New post</MyButton>
        </form>
    );
};

