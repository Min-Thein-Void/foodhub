import Checkout from "@/components/Checkout"
import CheckoutItems from "@/components/CheckoutItems"

function Page() {
  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* LEFT - Cart */}
        <CheckoutItems />

        {/* RIGHT - Form */}
        <Checkout />

      </div>
    </div>
  )
}

export default Page