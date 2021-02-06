import React from 'react'

export default function MyItems() {
    return (
        <div className="FavouriteItems">
            <div className="container">
                <div className="card" >
                    <img className="card-img-top" src="https://pngimage.net/wp-content/uploads/2018/05/exhaust-png-3.png" alt="Card image"/>
                    <div className="card-body">
                        <h4 className="card-title">John Doe</h4>
                        <p className="card-text">some example text.</p>
                        <a href="#" className="btn btn-success">Details</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
