import { ProductGrid } from "@/components/product-grid"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Premium Collection</h1>
          <p className="text-muted-foreground text-lg">Discover our curated selection of quality products</p>
        </div>
        <ProductGrid />
      </main>
    </div>
  )
}
