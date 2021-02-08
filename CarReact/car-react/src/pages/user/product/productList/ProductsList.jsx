import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../components/Loading';
import ProductComp from '../../../../components/ProductComp';
import ProductFilter from '../../../../components/ProductFilter';
import { getProductsAction } from '../../../../store/actions';


export default function ProductsList() {
  
  const products = useSelector((state) => state.products);
  // console.log(products);
  const dispatch = useDispatch();
  // console.log(products);
  const getProducts = () => {
    dispatch(getProductsAction());
  };
  // console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  const createProducts = (prod) =>{
    return (
      <ProductComp
        key={prod._id}
        id={prod._id}
        image={prod.image}
        description={prod.description}
        price={prod.price}
        name={prod.name}
        brand={prod.carBrand}
        model={prod.carModel}
        // category={prod.category}
      />
    );
  }
  return (
    <div className="productList">
      <div className="container">
        <div className="row">
          <div className="col-3" style={{ marginTop: "10%" }}>
            <ProductFilter />
          </div>
          <div className="col-9" style={{ marginTop: "1%" }}>
            <div className="row">
              {products.Data ? products.Data.map(createProducts) : <Loading />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
