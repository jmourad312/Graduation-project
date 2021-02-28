import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { useSelector, useDispatch } from "react-redux";
import { getBlogsUser } from '../../store/action'
import BlogEntry from '../../components/BlogEntry';
import { instance } from "../../network/axiosConfig";

export default function Blogs(props) {

    const data = props.location.state.data;

    const stateRedux = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogsUser(data._id))
    }, [stateRedux.blogs])

    const handelClickDetails = (parameter) => {

    }

    const handelClickEdit = (parameter) => {

    }

    const handelClickDelete = async (parameter) => {
        try {
            const res = await instance.delete(`user/deletePost/${parameter._id}/${parameter.person._id}`,
            {headers: { Authorization: localStorage.getItem("Authorization")}});
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    const createBlog = (blog) => {
        return (
            <BlogEntry
                key={blog._id}
                id={blog._id}
                idperson={blog.person._id}
                imgSrc={blog.images[0]}
                cardTitle={blog.title}
                userName={blog.person.firstName ? blog.person.firstName : "User"}
                dataItem={blog}
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
                <Navbar/>
                <h1 className="container mt-5 pt-4">Blogs By {data.firstName}</h1>
                <div className="col-9 blog-contents">
                    <section>
                        <div className="row">
                            {stateRedux.blogs.Data !=null && stateRedux.blogs.Data.map(createBlog)}
                        </div>
                    </section>
                </div>
            </div>
        </div>
  
    );
}