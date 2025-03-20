import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';


const OrderPage = () => {
  // state for orders
  const [data, setData] = useState([]);
  // get orders from backend
  const fetchData = async () => {
    // req to backend
    const dataApi = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    // res from backend
    const responseApi = await dataApi.json();
    // get data to state
    setData(responseApi?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container mx-auto'>
      {/* empty order */}
      <div>
        {
          data?.length === 0 && <h1 className='text-center text-2xl font-bold mt-8'>No Order avaliable</h1>
        }
      </div>
      {/* orders */}
      <div className='p-4'>
        {
          data?.map((item, index) => {
            return (
              <div key={index + "orders" + index}>
                {/* date of create order */}
                <p className='text-lg font-medium text-slate-600'>
                  {moment(item.createdAt).format("Do MMMM YYYY")}
                </p>
                {/* image and details of products in order */}
                <div>
                  {
                    item?.productDitails?.map((item, index) => {
                      return (
                        <Link
                          key={index + "ordersImage" + index}
                          to={`/product/${item.productId}`}
                          className='flex gap-3 mb-3 bg-slate-100 border-b border-slate-300 p-1'
                        >
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            className='w-28 h-28 bg-slate-200 object-scale-down rounded p-2
                                        hover:scale-110 transition-all'
                          />
                          <div>
                            <p className='font-medium text-lg text-ellipsis line-clamp-1'>
                              {item.name}
                            </p>
                            <p className='mt-5 text-sm text-slate-600'>Price : 
                              <span className='text-red-600'> {displayINRCurrency(item.price)}</span>
                            </p>
                            <p className='text-sm text-slate-600'>Quantity : {item.quantity}</p>
                          </div>
                        </Link>
                      )
                    })
                  }
                </div>
                {/* shipping and payment details and total amount */}
                <div className='mb-3 border-b-2 border-slate-600 md:flex gap-8'>
                  {/* payment ditails */}
                  <div className='p-2'>
                    <div className='text-lg font-semibold'>Payment Details</div>
                    <p className='font-medium ml-1'>Payment Method : {item.paymentDetails.payment_method_type[0]}</p>
                    <p className='font-medium ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                  </div>
                  {/* shipping details */}
                  <div className='p-2'>
                    <div className='text-lg font-semibold'>Shipping Details</div>
                    {
                      item.shipping_options.map((item, index) => {
                        return (
                          <div key={index + "shipping" + index} className='font-medium ml-1'>
                            Shipping Amount : {displayINRCurrency(item.shipping_amount)}
                          </div>
                        )
                      })
                    }
                  </div>
                  {/* total amount */}
                  <div>
                    <div className='text-lg font-semibold'>Total Amount</div>
                    <p className='text-red-600'>{displayINRCurrency(item.totalAmount)}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OrderPage