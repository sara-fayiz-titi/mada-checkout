import { madaInstance } from "../instances";

export async function initiate(params: any) {
  try {
    // Build payload dynamically
    const payload: any = {
      reference_id: params.reference_id,
      currencyCode: params.currencyCode || "JOD",
      amount: params.amount || 700,
      description: params.description || "test payload",
      buyer: {
        name: params.buyer?.name || "Sara Titi",
        email: params.buyer?.email || "sara.fayiz@mada-jo.com",
        phone: params.buyer?.phone || "0785369715",
        dob: params.buyer?.dob || "2000-01-20",
      },
      items: params.items || [
        {
          reference_id: "item-1",
          title: "Name of the product",
          description: "Description of the product",
          quantity: 1,
          unitPrice: 100,
          product_url: "",
          image_url: "",
          category: "Clothes",
        },
      ],
    };

    // Include shippingAddress only if provided
    if (params.shippingAddress) {
      payload.shippingAddress = params.shippingAddress;
    }

    const response = await madaInstance.post("/checkout/initiate", payload, {
      headers: {
        "x-skip-auth": true,
      },
    });

    return {
      kind: "OK",
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("ERROR: processCheckout", error);
    return {
      kind: "ERROR",
      errorMessage: error.response?.data?.message || error.message,
    };
  }
}
