import React from "react"


export default function Register({backend_url}) {
    return (
        <>
            <div className="container text-center">
                <h1>Register a new accout</h1>

                <form action={backend_url+"/newdata"} method="POST" className="reg-form">
                    <input type="text" name="fname" autoFocus autoComplete="off" placeholder="Full name" className="form-control-sm d-block w-25" />
                    <input type="text" name="username" autoFocus autoComplete="off" placeholder="User name" className="form-control-sm d-block w-25" />
                    <input type="text" name="password" autoFocus autoComplete="off" placeholder="password" className="form-control-sm d-block w-25" />
                    <input type="text" name="con-password" autoFocus autoComplete="off" placeholder="Confirm password" className="form-control-sm d-block w-25" />
                    <input type="submit" value="Submit" className="btn d-block btn-primary" />
                </form>
            </div>
        </>
    )
}