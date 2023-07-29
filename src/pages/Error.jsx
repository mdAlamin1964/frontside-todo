import React from "react";

export default function Error({message}) {
    return (
        <>
            <h4 className="text-danger text-center pt-5">{message}</h4>
        </>
    )
}