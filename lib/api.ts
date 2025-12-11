import axios from "axios"

// Mock API base - in production, this would be your actual API endpoint
const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
})

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock?: boolean
}

// Mock products database
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality noise-cancelling headphones with 30-hour battery life",
    price: 299.99,
    image: "/wireless-headphones.png",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitor and GPS",
    price: 399.99,
    image: "/smartwatch-lifestyle.png",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "3",
    name: "Designer Backpack",
    description: "Spacious and stylish backpack with laptop compartment",
    price: 89.99,
    image: "/designer-backpack.png",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "4",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound and 20-hour playtime",
    price: 129.99,
    image: "/bluetooth-speaker.jpg",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "5",
    name: "Premium Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection",
    price: 59.99,
    image: "/leather-wallet.jpg",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for all Qi-enabled devices",
    price: 39.99,
    image: "/wireless-charger.png",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    description: "Insulated bottle keeps drinks cold for 24 hours or hot for 12 hours",
    price: 34.99,
    image: "/reusable-water-bottle.png",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "8",
    name: "USB-C Hub Adapter",
    description: "7-in-1 adapter with HDMI, USB 3.0, and SD card reader",
    price: 49.99,
    image: "/usb-hub.png",
    category: "Electronics",
    inStock: false,
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProducts(): Promise<Product[]> {
  await delay(800) // Simulate network delay
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | null> {
  await delay(500)
  return mockProducts.find((p) => p.id === id) || null
}

interface CheckoutData {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    zipCode: string
    cardNumber: string
    expiryDate: string
    cvv: string
  }
}

interface CheckoutResponse {
  success: boolean
  orderId?: string
  message?: string
}

export async function processCheckout(data: CheckoutData): Promise<CheckoutResponse> {
  await delay(1500) // Simulate payment processing

  // Mock checkout validation
  if (!data.customerInfo.email.includes("@")) {
    return {
      success: false,
      message: "Invalid email address",
    }
  }

  // Generate mock order ID
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  console.log("[v0] Checkout processed:", { orderId, total: data.total, itemCount: data.items.length })

  return {
    success: true,
    orderId,
  }
}
