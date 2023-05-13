import React, { Suspense, useState } from 'react'
import { Get } from '../dbFatch';
import OrdersTable from '../components/OrdersTable';
import { toast } from 'react-toastify';
export const ViewOrdersAdmin = () => {
  const [orders, setorders] = useState([])
  async function getOrdersAPIs() {
    const path = '/api/v1/admin/orders';
    const response = await Get(path);
    if (response.success === true) {
      // console.log(response)
      setTimeout(() => { setorders(response.orders) }, 3000)
    }
    if (response.error) {
  //            toast.error('Internal server issue ', { position: 'top-right', theme: 'colored' });

    }
    if (!response) {
      console.log('error');
//      toast.error('Server issue', { position: 'top-right', theme: 'colored' })
    }
  };

  getOrdersAPIs();
  return (
    <section style={{ display: "flex", marginTop: "12rem", alignContent: "center", justifyContent: "center", backgroundColor: "", width: "100%", flexDirection: "column" }}>
      <div style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "serif", alignSelf: "center" }}>All Listed Orders</div>
      <OrdersTable orders={orders} />
    </section>
  )
}

