import React, { useState, useEffect } from "react";
import PostService from "../../service/postService";
import { useHistory, useLocation } from "react-router-dom";

function Post(props) {
    const [dataPost, setDataPost] = useState([])
    const [alertDelete, setAlertDelete] = useState(false)
    const [msgDelete, setMsgDelete] = useState('')
    const [search, setSearch] = useState('')
    let history = useHistory()
    let location = useLocation()

    useEffect(() => {
        getPost()
    }, [])

    const getPost = async () => {
        const post = await PostService.get({
            token: props.token
        })
        setDataPost(post.data.data)
    }

    const deletePost = (e, id) => {
        e.preventDefault()
        
        const confirmation = confirm("Are you sure to delete this post ?")
        if(confirmation) {
            const data = {
                id: id,
                token: props.token,
            }
            PostService.remove(data).then((e) => {
                setAlertDelete(true)
                setMsgDelete(e.data.message)
            })
        }
    }

    const searchPost = (e, val) => {
        e.preventDefault()

        setSearch(val)

        const data = {
            token: props.token,
            text: val,
        }

        console.log("val:", val)
        if(val == "") {
            getPost()
            return
        }
        
        PostService.search(data).then((e) => {
            setDataPost(e.data.data)
        })
    }

    return (
        <div className="card">
            <div className="card-header">
                Post
            </div>
            <div className="card-body">
                <h5 className="card-title">List Post</h5>
                {location.state != null || alertDelete ? 
                <div className="alert alert-success" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => {
                        history.replace()
                        setAlertDelete(false)
                    }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <strong>{alertDelete ? msgDelete  : location.state.message}</strong>
                </div>
                :
                <></>
                }
                <div className="row">
                    <div className="col-8">
                        <button className="btn btn-primary" onClick={() => history.push('/posts/create')}>Add Post</button>
                    </div>
                    <div className="col-4">
                        <input type={"text"} value={search} placeholder="Search post..." className="form-control" onChange={(e) => searchPost(e, e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Date</th>
                                    <th scope="col" className="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                            dataPost.length > 0 ?
                                dataPost.map((data, i) => (
                                    <tr key={i}>
                                        <td scope="row">{i + 1}</td>
                                        <td scope="row">{data.title}</td>
                                        <td scope="row">{data.category}</td>
                                        <td scope="row">{data.publish_at}</td>
                                        <td scope="row" className="text-right">
                                            <button className="btn btn-warning" onClick={() => history.push(`/posts/edit/${data.id}`)}>Edit</button> | <button className="btn btn-danger" onClick={(e) => deletePost(e, data.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )) 
                            :
                            <tr rowSpan={5}>
                                <td>No data post</td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post