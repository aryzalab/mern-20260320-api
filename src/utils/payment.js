import axios from "axios";
import config from "../config/config.js";

const payViaKhalti = async (data) => {
  const body = {
    return_url: config.khalti.returnUrl,
    website_url: config.appUrl,
    amount: data.amount,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: data.customerInfo,
  };

  const response = await axios.post(config.khalti.apiUrl, body, {
    headers: {
      Authorization: `Key ${config.khalti.secretKey}`,
    },
  });

  return response.data;
};

export { payViaKhalti };
