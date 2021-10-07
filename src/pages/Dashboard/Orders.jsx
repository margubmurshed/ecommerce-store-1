import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import date from 'date-and-time';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchOrders } from "../../Redux/ActionCreator";

const Orders = () => {
  const dispatch = useDispatch();
  const { uid, orders } = useSelector(({ user, orders }) => ({ uid: user.uid, orders }))

  useEffect(() => {
    dispatch(FetchOrders(uid))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);


  return (
    <>
      {orders.length ?
        (<div className="p-5">
          <div className="bg-blue-500 text-white p-3 mb-5 text-center rounded-md">My Orders</div>
          <div className="overflow-x-auto">
            <TableContainer component={Paper}>
              <Table>
                <TableHead className="bg-gray-700">
                  <TableRow>
                    <TableCell className="text-white font-semibold">Order ID</TableCell>
                    <TableCell className="text-white font-semibold">Date</TableCell>
                    <TableCell className="text-white font-semibold">Status</TableCell>
                    <TableCell className="text-white font-semibold">Total</TableCell>
                    {/* <TableCell className="text-white font-semibold">Actions</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map(({ orderInfo }, index) => (
                    <TableRow key={orderInfo.time}>
                      <TableCell component="th" scope="row">
                        {`#${index + 1}`}
                      </TableCell>
                      <TableCell>
                        {date.format(new Date(orderInfo.time), 'DD MMM YYYY')}
                      </TableCell>
                      <TableCell>
                        <span className="bg-yellow-100 p-3 rounded-md text-yellow-600 font-semibold">{orderInfo.status}</span>
                      </TableCell>
                      <TableCell>{orderInfo.total} Taka</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>)
        : (
          <div className="flex justify-center items-center p-5">
            <span className="font-semibold text-gray-500">
              No Previous Orders Found
            </span>
          </div>
        )}
    </>
  );
};

export default Orders;
