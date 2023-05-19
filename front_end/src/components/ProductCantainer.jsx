import React, { useEffect, useState } from 'react';
import { CartItems } from './CartItems';
import { Suspense } from 'react';
import { CardImg } from 'react-bootstrap';
import { Get } from '../dbFatch';
import HashLoader from "react-spinners/HashLoader";


export const ProductCantainer = () => {
    const [products, setProducts] = useState([{}]);
    useEffect(() => {
        return () => {
            async function getProductsAPIs() {
                const path = '/api/v1/product';
                const response = await Get(path);
                if (response.success === true) {
                    console.log(response)
                    setTimeout(() => { setProducts(response.Products) }, 0)
                }
                if (response.error) {
                    //           toast.error('Internal server issue ', { position: 'top-right', theme: 'colored' });

                }
                if (!response) {
                    console.log('error');
                    //      toast.error('Server issue', { position: 'top-right', theme: 'colored' })
                }
            };
            getProductsAPIs();
        };
    }, [])
    return (
        <div>
            <Suspense fallback={<HashLoader color="#d65c36" style={{ top: '50%' }} />}>
                <div style={{ display: "flex", width: "100%", flexDirection: "row", flexWrap: "wrap", gap: "1rem", alignContent: "center", justifyContent: "center" }}>
                    {products.map((product) => ( 
                    //    {const countaty = getItemsQuantity(product?._id) 
                        <CartItems product ={product}/>
                        )
                    )}
                </div>

            </Suspense>
        </div>
    )
}

