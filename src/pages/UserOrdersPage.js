import { format, parseISO } from "date-fns";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SeverityPill } from "../components/SeverityPill";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userGetAllOrders } from "../features/orderSlice";
import PaginationBar from "../components/PaginationBar";

const UserOrdersPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const dispatch = useDispatch();

  const { userOrders, totalPages } = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(userGetAllOrders({ page, limit }));
  }, [page, limit, dispatch]);

  console.log(userOrders);
  console.log(totalPages);

  const navigate = useNavigate();
  const handleClickOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <Card>
      <CardHeader title="Orders List" sx={{ textAlign: "center" }} />
      <Box>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userOrders?.map((order) => (
                <TableRow
                  hover
                  key={order._id}
                  onClick={() => handleClickOrder(order._id)}
                  to={`/orders/${order._id}`}
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    {format(parseISO(order.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (order.status === "done" && "success") ||
                        (order.status === "confirm" && "warning") ||
                        (order.status === "shipping" && "warning") ||
                        "info"
                      }
                    >
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          p: 2,
        }}
      >
        <PaginationBar
          pageNum={page}
          setPageNum={setPage}
          totalPageNum={totalPages}
        />
      </Box>
    </Card>
  );
};

export default UserOrdersPage;
