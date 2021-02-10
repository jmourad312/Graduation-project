import { instance } from "../../network/axiosConfig";
import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'

export default function EditVendor(props) {

    const data = props.location.state.data;

    const [editValue, setEditValue] = useState({
        firstName: "",
        lastName: "",
        middelName: "",
        password: "",
        email: "",
        image:""
    });

    useEffect(() => {
        setEditValue({
            firstName: data.person.firstName,
            lastName: data.person.lastName,
            middelName: data.person.middelName,
            password: "",
            email: data.person.email,
        });
    }, [])


    const handleEditChange = (event) => {
        const { value, name } = event.target;

        setEditValue({
            ...editValue,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        setEditValue((previous) => {
            return {
                ...previous,
                image: event.target.files[0],
            };
        });
    };

    const handleEditSubmit = async () => {

        const formData = new FormData();
        editValue.image !="" && formData.append("image", editValue.image);
        formData.append("firstName", editValue.firstName);
        formData.append("lastName", editValue.lastName);
        formData.append("middelName", editValue.middelName);
        formData.append("email", editValue.email);
        editValue.password.length !=0 && formData.append("password", editValue.password);

        const config = {
            headers: {
                "content-type":
                    "multipart/form-data; boundary=<calculated when request is sent>",
                Authorization: localStorage.getItem("Authorization"),
            },
        };
        try {
            const res = await instance.put(`vendor/updateProfile/${data.person._id}`, formData, config);
            console.log(res)

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="admin">
            <div className="container-for-admin">
                
                <Navbar />

                <div className="container mt-2 pt-1">
                    <h2 className="mt-5">Edit your Profile</h2>
                    <div className="form-group">
                        <label >firstName:</label>
                        <input type="text" className="form-control" value={editValue.firstName} name="firstName" onChange={handleEditChange} />
                    </div>


                    <div className="form-group">
                        <label >middelName</label>
                        <input type="text" className="form-control" value={editValue.middelName} name="middelName" onChange={handleEditChange} />
                    </div>

                    <div className="form-group">
                        <label >lastName</label>
                        <input type="text" className="form-control" value={editValue.lastName} name="lastName" onChange={handleEditChange} />
                    </div>

                    <div className="form-group">
                        <label>image</label>
                        <input type="file" name="image" className="form-control" onChange={handleImageChange} />
                    </div>

                    <div className="form-group">
                        <label >Email address:</label>
                        <input type="email" className="form-control" value={editValue.email} name="email" onChange={handleEditChange} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" value={editValue.password} name="password" onChange={handleEditChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleEditSubmit}>Submit</button>
                </div>
            </div>
        </div>


    )
}