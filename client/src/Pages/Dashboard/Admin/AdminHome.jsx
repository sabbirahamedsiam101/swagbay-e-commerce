import React from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const summaryCards = [
  {
    label: "Total Products",
    value: 128,
    icon: <FaBoxOpen />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Total Orders",
    value: 562,
    icon: <FaShoppingCart />,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Total Revenue",
    value: "$24,950",
    icon: <FaDollarSign />,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "Total Customers",
    value: 321,
    icon: <FaUsers />,
    color: "bg-purple-100 text-purple-700",
  },
];

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4780 },
  { name: "May", sales: 5890 },
];

const orderStatusData = [
  { name: "Pending", value: 12 },
  { name: "Shipped", value: 38 },
  { name: "Cancelled", value: 5 },
];

const COLORS = ["#FDBA74", "#86EFAC", "#FCA5A5"];

const recentOrders = [
  { id: "#1234", customer: "John Doe", amount: "$199.00", status: "Shipped" },
  { id: "#1235", customer: "Jane Smith", amount: "$89.00", status: "Pending" },
  {
    id: "#1236",
    customer: "Mark Tailor",
    amount: "$450.00",
    status: "Cancelled",
  },
];

const AdminHome = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-xl shadow ${card.color}`}
          >
            <div className="text-3xl mr-4">{card.icon}</div>
            <div>
              <p className="text-lg font-semibold">{card.value}</p>
              <p className="text-sm opacity-80">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Sales Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Order Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {orderStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-2 font-medium">{order.id}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">{order.amount}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Shipped"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
