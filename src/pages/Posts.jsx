import React, {useState, useEffect, useRef} from 'react'
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";
import {PostsService} from "../API/PostsService";
import {MyButton} from "../components/UI/button/MyButton";
import {MyModal} from "../components/UI/MyModal/MyModal";
import {PostForm} from "../components/PostForm";
import {PostsFilter} from "../components/PostsFilter";
import {Loader} from "../components/UI/Loader/Loader";
import {PostsList} from "../components/PostsList";
import {Pagination} from "../components/UI/pagination/Pagination";
import {getPageCount} from "../utils/pages";
import {useObserver} from "../hooks/useObserver";
import {MySelect} from "../components/UI/select/MySelect";



export const Posts = () => {
    const [value, setValue] = useState('')
    const [posts, setPosts] = useState([])
    /*const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')*/
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    //const [isPostsLoading, setIsPostsLoading] = useState(false)
    const lastElement = useRef()
    //const observer = useRef()

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostsLoading, postsError] = useFetching(async (limit, page) => {
        const response = await PostsService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))


    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit]) // //[]

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const deletePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    const changePage = (page) => {
        setPage(page)
        //fetchPosts(limit, page)
    }

    /*   async function fetchPosts() {
           setIsPostsLoading(true)

           setIsPostsLoading(false)
       }*/

    /*    const sortPosts = (typeSort) => {
            setSelectedSort(typeSort)
            //setPosts([...posts].sort((a, b) => a[typeSort].localeCompare(b[typeSort])))
        }*/

    return (
        <div className="App">
            <MyButton
                style={{marginTop: 30}}
                onClick={() => setModal(true)}>
                New post
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostsFilter filter={filter} setFilter={setFilter}/>
            {postsError &&
            <h2>Error: {postsError}</h2>
            }
            <MySelect
                 value={limit}
                 onChange={value => setLimit(value)}
                 defaultValue='All elements'
                 options={[
                     {value: 5, name: '5'},
                     {value: 10, name: '10'},
                     {value: 25, name:'25'},
                     {value: -1, name: 'All'},
                 ]}/>
            <PostsList remove={deletePost} posts={sortedAndSearchedPosts} title='Posts about JS'/>
            <div ref={lastElement} style={{height: '20px', background: 'red'}}></div>
            {isPostsLoading &&
                 <Loader/>
            }
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}/>

            <h1>{value}</h1>
            <input type='text'
                   value={value}
                   onChange={(e) => setValue(e.target.value)}/>
        </div>
    )
}

