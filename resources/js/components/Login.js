import {React, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import AuthService from '../service/authservice';

function LoginCompt() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false)
    const [msg, setMsg] = useState('')
    const history = useHistory()

    const onAuthenticate = async (e) => {
        e.preventDefault()

        if(email == "" || password == "") {
            setMsg('Email or Password are not required')
            setAlert(true)
            return
        }

        const data = {
            email: email,
            password: password
        }
        
        await AuthService.Login(data).then(response => {
            let res = response.data
            if(res.status == 410) {
                setAlert(true)
                setMsg(res.message)
                return
            }
            localStorage.setItem('token', res.access.access_token)

            history.go('/home')
        }).catch(e => {
            setAlert(true)
        });
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        {alert ? 
                        <div className="alert alert-danger" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <strong>{msg}</strong>
                        </div>
                        :
                        <></>  
                        }
                        
                        <form method="POST" onSubmit={onAuthenticate}>
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div className="col-md-6">
                                    <input id="email" type="email" className="form-control" onChange={(data) => setEmail(data.target.value)} name="email" autoFocus />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Password</label>

                                <div className="col-md-6">
                                    <input id="password" type="password" className="form-control" onChange={(data) => setPassword(data.target.value)} name="password" />
                                </div>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>

                                    
                                        <Link className="btn btn-link" to="/forgot-password">
                                            Forgot Your Password?
                                        </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginCompt;
