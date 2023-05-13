import React, { Suspense, useState } from 'react'
import { Get } from '../dbFatch';
import ProductTable from '../components/ProductTable';
import { toast } from 'react-toastify';
export const ViewProductsAdmin = () => {
  const [product, setProduct] = useState([])
  async function getProductAPIs() {
    const path = '/api/v1/product';
    const response = await Get(path);
    if (response.success === true) {
      console.log(response)
      setTimeout(() => { setProduct(response.Products); }, 6000)
    }
    if (response.error) {
              toast.error('Internal server issue ', { position: 'top-right', theme: 'colored' });

    }
    if (!response) {
      console.log('error');
      toast.error('Server issue', { position: 'top-right', theme: 'colored' })
    }
  };

  getProductAPIs();
  return (
    <section style={{ display: "flex", marginTop: "12rem", alignContent: "center", justifyContent: "center", backgroundColor: "", width: "100%", flexDirection: "column" }}>
      <div style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "serif", alignSelf: "center" }}>All Listed Products</div>
      <ProductTable products={product} />
    </section>
  )
}

