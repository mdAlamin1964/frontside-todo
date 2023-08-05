import React from 'react'
export default function Login({backend_url}){
    return (
        <>
                <h1 className='text-center'>Login into your accout</h1>
                <form action={backend_url+"/login-data"} method="POST" className="reg-form">
                    <input type="text" name="username" autoFocus autoComplete='off' placeholder="User name" className="form-control-sm d-block w-25" />
                    <input type="text" name="password" autoFocus autoComplete='off' placeholder="Password" className="form-control-sm d-block w-25" />
                    <input type="submit" value="Login" className="btn d-block btn-primary" />
                </form>
        </>
    )
}