import React from "react";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="col-md-12 my-5 mx-3">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              No Orders
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{ fontSize: "12px" }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <table className="table table-light">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    className={`${
                      order.isPaid ? "alert-success" : "alert-danger"
                    }`}
                    key={order._id}
                  >
                    <td>
                      <Link to={`/orders/${order._id}`}>{order._id}</Link>
                    </td>
                    <td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                    <td>{order.isPaid ? moment(order.createdAt).calendar() : moment(order.createdAt).calendar()} </td>
                    <td>₹{order.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
