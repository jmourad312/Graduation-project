export function Tabel(props) {
    return (
        <>
            <div className="row wow fadeIn">
                <div className="col-md-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-hover">


                                <thead className="blue-grey lighten-4">
                                    <tr>
                                        <th>#</th>
                                        <th>ID</th>
                                        <th>firstName</th>
                                        <th>Email</th>
                                        <th>Banned</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                        <th>Ban</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {props.data.map((item, index) => {

                                        <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{item._id}</td>
                                            <td>{item.firstName}</td>
                                            <th>{props.email}</th>
                                            <td>{props.banned}</td>
                                            <td><i style={{ fontSize: '20px' }} className='fas fa-pen ml-1'></i></td>
                                            <td><i style={{ fontSize: '20px' }} className='fas fa-trash ml-3'></i></td>
                                            <td><i style={{ fontSize: '20px' }} className="fas fa-ban"></i></td>
                                        </tr>

                                    })}
                                </tbody>



                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}