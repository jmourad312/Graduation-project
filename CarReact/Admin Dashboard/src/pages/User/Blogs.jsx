import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { useSelector, useDispatch } from "react-redux";
import { getBlogsUser } from '../../store/action'
import BlogEntry from '../../components/BlogEntry';


export default function Blogs(props) {

    const data = props.location.state.data;

    const stateRedux = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogsUser(data._id))
    }, [])

    const handelClickDetails = (parameter) => {
        props.history.push({
            pathname: '/DetailsBlog',
            state: { data: parameter }
        })
    }

    const handelClickEdit = (parameter) => {

    }

    const handelClickDelete = (parameter) => {
        
    }

    const createBlog = (blog) => {
        return (
            <BlogEntry
                key={blog._id}
                id={blog._id}
                imgSrc={blog.image}
                cardTitle={blog.title}
                userName={blog.person.firstName ? blog.person.firstName : "User"}
                date={blog.createdAt}
                cardContent={blog.body}
                cardBrand={blog.brand}
                cardModel={blog.model}
                details={handelClickDetails}
                edit={handelClickEdit}
                delete={handelClickDelete}
            />
        );
    };

    return (

        <div className="admin">
            <div className="container-for-admin">
                <Navbar />
                <h1 className="m-5">Products By {data.firstName}</h1>

                <div className="col-9 blog-contents">
                    <section>
                        <div className="row">
                            {stateRedux.blogs.length !=0 && stateRedux.blogs.Data.map(createBlog)}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}