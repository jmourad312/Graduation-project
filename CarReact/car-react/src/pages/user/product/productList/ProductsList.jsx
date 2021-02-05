import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductComp from '../../../../components/ProductComp';
import ProductFilter from '../../../../components/ProductFilter';
import { getProductsAction } from '../../../../store/actions';


export default function ProductsList() {
  
  const products = useSelector((state) => state.products);
  console.log(products);
  const dispatch = useDispatch();
  console.log(products);
  const getProducts = () => {
    dispatch(getProductsAction());
  };
  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);
  
  const createProducts = (prod) =>{
    return (
      <ProductComp
        key={prod.id}
        image={prod.image}
        price={prod.price}
        title={prod.title}
        brand={prod.description}
        model={prod.description}
        category={prod.category}
      />
    );
  }
  return (
    <div className="productList">
      <div className="container">
        <div className="row">
          <div className="col-4" style={{ marginTop:"10%" }}>
            <ProductFilter />
          </div>
          <div className="col-8" style={{ marginTop: "10%" }}>
          <div className="row">
            {products.map(createProducts)}
          </div>
          </div>
        </div>
    </div>
  </div>
  );
}
