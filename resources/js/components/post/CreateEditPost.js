import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PostService from "../../service/postService";

function CreateEditPost(props) {
    const history = useHistory()
    const params = useParams()
    const [category, setCategory] = useState(["Sport", "News", "Showbiz"])
    const [getCategory, setGetCategory] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [alert, setAlert] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(location.pathname == `/posts/edit/${params.id}`) {
            const data = {
                id: params.id,
                token: props.token,
            }
            const getPostByID = async () => {
                await PostService.getByID(data).then((val) => {
                    console.log(val)
                    setTitle(val.data.data.title)
                    setDesc(val.data.data.description)
                    setGetCategory(val.data.data.category)
                })
            } 

            getPostByID()
        }else {
            setTitle('')
            setDesc('')
            setGetCategory('')
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if(title == "" || desc == "" || getCategory == "") {
            setAlert(true)
            setMsg('Title or Description or Category cannot empty!!')
            return
        }

        const val = {
            token: props.token,
            data: {
                title: title,
                category: getCategory,
                description: desc,
            }
        }

        if(location.pathname == `/posts/edit/${params.id}`) {
            const data = {
                token: props.token,
                data: {
                    id: params.id,
                    title: title,
                    category: getCategory,
                    description: desc
                }
            }
            PostService.update(data).then((e) => {
                history.push({
                    pathname: '/posts',
                    state: {
                        status: 'success',
                        code: 200,
                        message: `Post '${e.data.data.title}' are updated`
                    }
                })
            })
        }else {
            PostService.insert(val).then((e) => {
                history.push({
                    pathname: '/posts',
                    state: {
                        status: 'success',
                        code: 200,
                        message: 'Create post success!!!'
                    }
                })
            }).catch((e) => {
                setAlert(true)
                setMsg(e)
            })
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                Post 
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                {alert ?
                <div className="alert alert-danger" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <strong>{msg}</strong>
                </div>
                : 
                <div></div>
                }
                <form className="form-submit" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label htmlFor="title">Title</label>
                            <input type={"text"} className="form-control" id="title" value={title} placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="category">Category</label>
                            <select id="category" className="form-control" onChange={(e) => setGetCategory(e.target.value)} value={getCategory}>
                                <option value={""} disabled>-- Choose Category --</option>
                                {category.map((val, i) => (
                                    <option value={val} key={i}>{val}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label htmlFor="desc">Description</label>
                            <textarea className="form-control" id="desc" value={desc} rows={4} placeholder="Description..." onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12 text-right">
                            <button type={"submit"} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateEditPost