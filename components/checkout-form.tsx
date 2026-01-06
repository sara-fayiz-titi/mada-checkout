"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { initiate } from "@/api/services/checkout";
import { v4 as uuidv4 } from "uuid";

export function CheckoutForm() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",

    // ✅ Shipping address fields (match your required keys)
    streetAddress: "",
    addressLine2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "SA", // default (change if you want)

    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [checkoutId, setCheckoutId] = useState("");

  const cartTotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const unitPrice = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + unitPrice * qty;
    }, 0);
  }, [items]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reference_id = uuidv4();

      // ✅ Only include shippingAddress if at least one field is filled
      const hasShipping =
        formData.streetAddress ||
        formData.addressLine2 ||
        formData.city ||
        formData.stateProvince ||
        formData.postalCode ||
        formData.country;

      const payload: any = {
        reference_id,
        currencyCode: "JOD",
        amount: cartTotal,
        description: "Checkout payload",
        buyer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob || "2000-01-20",
        },
        items: items.map((item, index) => ({
          reference_id: `item-${index + 1}`,
          title: item.name,
          description: item.description || item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          product_url: "",
          image_url: item.image || "",
          category: item.category || "Clothes",
        })),
      };

      if (hasShipping) {
        payload.shippingAddress = {
          streetAddress: formData.streetAddress,
          addressLine2: formData.addressLine2,
          city: formData.city,
          stateProvince: formData.stateProvince,
          postalCode: formData.postalCode,
          country: formData.country,
        };
      }

      const result = await initiate(payload);

      if (result.kind === "OK") {
        setCheckoutId(result.data.checkoutId);
        clearCart();
        router.replace(
          `https://checkout.stg.mada-bnpl.com/${result.data.checkoutId}`
        );
      } else {
        toast({
          title: "Checkout failed",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (items.length === 0 && checkoutId) {
    router.replace(`https://checkout.stg.mada-bnpl.com/${checkoutId}`);
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* ✅ Shipping Address (with your required fields) */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Apt 4B"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Riyadh"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stateProvince">State / Province</Label>
                    <Input
                      id="stateProvince"
                      name="stateProvince"
                      value={formData.stateProvince}
                      onChange={handleChange}
                      placeholder="Riyadh Province"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="12345"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="SA"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        $
                        {(Number(item.price) * Number(item.quantity)).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading || cartTotal <= 0}
                >
                  {loading ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Processing...
                    </>
                  ) : (
                    "Continue with mada"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
