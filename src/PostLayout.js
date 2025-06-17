import React from "react"
import { Link, Outlet } from "react-router-dom"

const PostLayout = () => {
  return (
    <>
        <Link to="/postpage/1">Post page 1</Link>
        <br />
        <Link to="/postpage/2">Post page 2</Link>
        <br />
        <Link to="/postpage/3">Post page 3</Link>
        <br />
        <Link to="/postpage/newpost">NewPost</Link>
        <Outlet />
    </>
  )
}

export default PostLayout