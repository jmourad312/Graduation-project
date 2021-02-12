import { useState } from "react";
import { InputField } from '../../components/InputField'
import { Button2 } from '../../components/Button'
import { useSelector,useDispatch } from "react-redux";
import { instance } from "../../network/axiosConfig";
import {setLoginAction, setTokenAction} from '../../store/action'




export default function Loginin(props) {

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        email: null,
        password: null
    });

    const stateRedux = useSelector((state) => state)
    const dispatch = useDispatch();

    const getLogIN = async (parameter) =>{
        const response = await instance.post('admin/auth/signin',parameter);
        console.log(response);
        localStorage.setItem('Authorization', response.headers.authorization);

        if(response.data.Success == true){

        dispatch(setLoginAction(stateRedux.login === true ? false : true))
        dispatch(setTokenAction(response.headers.authorization))
        props.history.push('/')

        }
        if(response.data.Success == false){
            props.history.push('/LoginIn')
        }
    }

    const tiggreValue = (e) => {
        var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        switch (e.target.name) {
            case "email":
                setState({
                    ...state,
                    email: e.target.value
                });
                setError({
                    ...error,
                    email: e.target.value.length <= 0 ? "this field required" :

                        e.target.value.length <= 6 ? "length must be 6 or more " :

                            pattern.test(e.target.value)

                                ? null : "in valid email"
                })
                break;

            case "password":
                setState({
                    ...state,
                    password: e.target.value
                })
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="container text-center mt-5 d-flex justify-content-center">
                <div className="card mb-2 shadow p-4 bg-white" style={{ width: "300px" }}>
                    <div className="card-header">
                        <h2 style={{  fontFamily: "Georgia, serif"}}>DREKSYONY</h2>
                    </div>
                    <div className="card-body">
                        <InputField value={state.email} type="email" handleChange={(e) => tiggreValue(e)} className="form-control" name="email" error={error.email} />
                        <InputField value={state.password} type="password" handleChange={(e) => tiggreValue(e)} className="form-control" name="password" error={error.password} />

                    </div>
                    <div className="card bg-danger text-white">
                        <div className="card-footer">
                            <Button2 className="btn text-white" handelClick={getLogIN} parameter={state} name="Log IN" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}