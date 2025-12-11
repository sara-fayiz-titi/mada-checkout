import { madaInstance } from "../instances";

export async function initiate(reference_id: string) {
  try {
    const response = await madaInstance.post(
      "/checkout/initiate",
      {
        reference_id: reference_id,
        currencyCode: "JOD",
        amount: 700,
        description: "test payload",
        buyer: {
          name: "Sara Titi",
          email: "sara.fayiz@mada-jo.com",
          phone: "0785369715",
          dob: "2000-01-20",
        },
        shippingAddress: {
          streetAddress: "123 Main Street",
          addressLine2: "Apt 4B",
          city: "Riyadh",
          stateProvince: "Riyadh Province",
          postalCode: "12345",
          country: "SA",
        },
        items: [
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
          {
            reference_id: "item-1",
            title: "Name of the product",
            description: "Description of the product",
            quantity: 6,
            unitPrice: 100,
            product_url: "",
            image_url: "",
            category: "Clothes",
          },
        ],
      },
      {
        headers: {
          "x-skip-auth": true,
        },
      }
    );
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
