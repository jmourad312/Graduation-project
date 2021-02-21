import { Button } from "react-bootstrap";

export function Tabel(props) {
  return (
    <>
      <div className="row wow fadeIn" id={props.id}>
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <table className="table table-hover">
                <thead className="blue-grey lighten-4">
                  <tr>
                    <th>Index</th>
                    {/* <th>ID</th> */}
                    <th>User name</th>
                    <th>Email</th>
                    <th>Banned</th>
                    <th className="pl-5">Edit</th>
                    <th className="pl-5">Delete</th>
                    <th className="pl-5">Ban</th>
                  </tr>
                </thead>

                <tbody>
                  {props.data.map((item, index) => {
                    return (
                      <tr
                        style={{
                          backgroundColor:
                            item.banned == true
                              ? "gray"
                              : "",
                        }}
                      >
                        <td style={{fontWeight:"600"}}>{props.index + index + 1}</td>
                        {/* <td>{item.person._id}</td> */}
                        <td style={{fontWeight:"600"}}>{item.firstName}</td>
                        <td style={{fontWeight:"600"}}>{item.email}</td>
                        <td style={{fontWeight:"600"}}>{item.banned == true ? "Yes" : "No"}</td>

                        <td>
                          <Button
                            className="page-link"
                            style={{ width: "80%",marginLeft:"30px" }}
                            key={index + 1}
                            onClick={() => props.handelClickEdit(item)}>
                            <i style={{ fontSize: "20px"}} className="fas fa-pen"></i>
                          </Button>
                        </td>

                        <td>
                          <Button
                            className="page-link"
                            style={{ width: "80%",marginLeft:"30px"  }}
                            key={index + 1}
                            onClick={() => props.handelClickDelete(item._id)}>
                            <i style={{ fontSize: "20px" }} className="fas fa-trash "></i>
                          </Button>
                        </td>

                        <td>
                          <Button
                            className="page-link"
                            style={{ width: "80%",marginLeft:"30px" }}
                            key={index + 1}
                            onClick={() => props.handelClick(item)}>
                            <i style={{ fontSize: "20px" }} className="fas fa-ban"></i>
                          </Button>
                        </td>
                      </tr>
                    );
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
