import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Inventory from "./pages/Inventory";
import PurchaseOrders from "./pages/PurchaseOrders";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route
            path="/purchase-orders"
            element={<PurchaseOrders />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;