import { CartView } from "@/components/cart-view"
import { Header } from "@/components/header"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CartView />
      </main>
    </div>
  )
}
