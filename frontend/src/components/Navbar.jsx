import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition font-medium ${
      isActive
        ? "bg-white text-blue-700"
        : "text-white hover:bg-blue-500"
    }`;

  return (
    <nav className="bg-blue-700 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo / Project Name */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            📦 ProcureFlow ERP
          </h1>
          <p className="text-blue-100 text-sm">
            Purchase Orders & Inventory Management
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <NavLink to="/" className={linkClasses}>
            Inventory
          </NavLink>

          <NavLink
            to="/purchase-orders"
            className={linkClasses}
          >
            Purchase Orders
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;