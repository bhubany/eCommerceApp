import React, { useEffect, useState } from "react";
import { Button, Box, Modal, TextField, Typography } from "@mui/material";
import { Edit, RemoveOutlined, Add, Update, Cancel } from "@mui/icons-material";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import {
  update_order_quantity,
  fetch_user_orders,
} from "../../../redux/actions/orderActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditProductModal({ data }) {
  const updateOrderQuantity = useSelector((state) => state.updateOrderQuantity);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const userId = login.isLogined ? login.userId : null;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);s

  const [quty, setQuty] = useState(data.quantity);
  const prevQuantity = data.quantity;

  const handleIncrease = () => {
    setQuty(quty + 1);
  };

  const handleDecrease = () => {
    if (quty !== 1) {
      setQuty(quty - 1);
    } else {
      // handleClose();
      Swal.fire({
        title: "Error!",
        text: `Quantity cannot be less than 1`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleUpdateOrder = () => {
    if (quty < prevQuantity) {
      dispatch(
        update_order_quantity({
          orderId: data.orderId,
          id: data.productId,
          quantity: prevQuantity - quty,
          action: "remove",
        })
      );
    } else if (quty > prevQuantity) {
      dispatch(
        update_order_quantity({
          orderId: data.orderId,
          id: data.productId,
          quantity: quty - prevQuantity,
          action: "add",
        })
      );
    } else {
      setOpen(false); //close module
      Swal.fire({
        title: "Info!",
        text: "No Change Occurs",
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    setOpen(false);
    if (updateOrderQuantity.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${updateOrderQuantity.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch(fetch_user_orders({ userId: userId, action: "fetch" }));
      dispatch(
        update_order_quantity({
          orderId: "",
          id: "",
          quantity: "",
          action: "clean",
        })
      );
    } else if (updateOrderQuantity.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${updateOrderQuantity.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      dispatch(
        update_order_quantity({
          orderId: "",
          id: "",
          quantity: "",
          action: "clean",
        })
      );
    }
  }, [updateOrderQuantity]);

  return (
    <div>
      <Button variant="outlined" color="info" onClick={handleOpen}>
        <Edit />
        &nbsp; Edit
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ gap: "1rem", padding: "1rem 0", textAlign: "center" }}>
            <Typography fontWeight={600}>
              Select Appropriate Amount Of Quantity For Id:
            </Typography>
            <Typography fontStyle={"italic"}>{data.id}</Typography>
          </Box>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="error" onClick={handleDecrease}>
              <RemoveOutlined />
            </Button>
            <TextField id="quantity" label="My Quantity" value={quty} />
            <Button variant="outlined" color="success" onClick={handleIncrease}>
              <Add />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2rem 0",
              padding: "0 1rem",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
            >
              <Cancel />
              &nbsp;
              {" Cancel"}
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateOrder}
            >
              <Update />
              &nbsp;{" Update"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
