import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FetchOrders } from "../../Redux/ActionCreator";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const MapStateToProps = (state) => {
  return {
    uid: state.user.uid,
    orders: state.orders,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    FetchOrdersDispatcher: (uid) => dispatch(FetchOrders(uid)),
  };
};

const Orders = ({ orders, uid, FetchOrdersDispatcher }) => {
  useEffect(() => {
    FetchOrdersDispatcher(uid);
  }, [uid]);

  const convertTimeToLocaleTime = (time) => {
    const toLocaleDateString = new Date(time).toLocaleDateString();
    return toLocaleDateString.split("/").join("-");
  };

  return (
    <div className="p-5">
      <div className="overflow-x-auto">
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-700">
              <TableRow>
                <TableCell className="text-white font-semibold">Order ID</TableCell>
                <TableCell className="text-white font-semibold">Date</TableCell>
                <TableCell className="text-white font-semibold">Status</TableCell>
                <TableCell className="text-white font-semibold">Total</TableCell>
                <TableCell className="text-white font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(({ orderInfo, userInfo }, index) => (
                <TableRow key={orderInfo.time}>
                  <TableCell component="th" scope="row">
                    {`#${index}`}
                  </TableCell>
                  <TableCell>
                    {convertTimeToLocaleTime(orderInfo.time)}
                  </TableCell>
                  <TableCell><span className="bg-yellow-100 p-3 rounded-md text-yellow-600 font-semibold">{orderInfo.status}</span></TableCell>
                  <TableCell>{orderInfo.total}</TableCell>
                  <TableCell>
                    <Link
                      to={{
                        pathname: "/dashboard/orders/view",
                        state: { orderInfo, userInfo },
                      }}
                    >
                      <Button variant="contained" color="primary">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default connect(MapStateToProps, MapDispatchToProps)(Orders);
