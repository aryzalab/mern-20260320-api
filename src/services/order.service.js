import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
} from "../constants/orderStatus.js";
import {
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_ONLINE,
  PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_SUCCESS,
} from "../constants/payment.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import { payViaKhalti } from "../utils/payment.js";
import userService from "./user.service.js";

// for admin
const getOrders = async () => {
  return await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls")
    .populate("payment", "transactionId amount method status");

  if (!order)
    throw {
      status: 404,
      message: "Order not found.",
    };

  return order;
};

const createOrder = async (data, userId) => {
  const user = await userService.getById(userId);

  if (!data.shippingAddress) {
    data.shippingAddress = user.address;
  }

  data.orderNumber = crypto.randomUUID();
  data.user = userId;

  return await Order.create(data);
};

const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

const cancelOrder = async (id) => {
  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCELLED },
    { new: true },
  );
};

const deleteOrder = async (id) => {
  await Order.findByIdAndDelete(id);
};

const confirmOrder = async (id, status) => {
  const order = await getOrderById(id);

  if (status?.toUpperCase() != PAYMENT_STATUS_SUCCESS) {
    await Payment.findByIdAndUpdate(order.payment, {
      status: PAYMENT_STATUS_FAILED,
    });

    throw {
      status: 400,
      message: "Payment failed.",
    };
  }

  await Payment.findByIdAndUpdate(order.payment, {
    status: PAYMENT_STATUS_SUCCESS,
  });

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CONFIRMED },
    { new: true },
  );
};

const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrdersByMerchant = () => {};

const orderPaymentViaCash = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: PAYMENT_METHOD_CASH,
    amount: order.totalPrice,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CONFIRMED,
      payment: orderPayment.id,
    },
    { new: true },
  );
};

const orderPaymentViaKhalti = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: PAYMENT_METHOD_ONLINE,
    amount: order.totalPrice,
  });

  await Order.findByIdAndUpdate(id, {
    payment: orderPayment.id,
  });

  return await payViaKhalti({
    amount: order.totalPrice,
    purchaseOrderId: order.orderNumber,
    purchaseOrderName: order.orderItems[0].product.name,
    customerInfo: {
      name: order.user.name,
      email: order.user.email,
      phone: order.user.phone,
    },
  });
};

export default {
  getOrders,
  getOrderById,
  getOrdersByMerchant,
  getOrdersByUser,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
  confirmOrder,
  orderPaymentViaCash,
  orderPaymentViaKhalti,
};
