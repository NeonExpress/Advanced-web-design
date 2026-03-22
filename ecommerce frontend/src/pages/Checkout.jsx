// src/pages/Checkout.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "cod",
  });

  const [submitted, setSubmitted] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please complete all fields");
      return;
    }
    setFinalTotal(total);
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mt-5 text-center">
        <h2>Order Confirmed!</h2>
        <p>Thank you, {form.name}. Your order has been placed.</p>
        <p>Total Amount: ₱{finalTotal.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <div className="row">
        <div className="col-md-6">
          <h4>Customer Information</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
                value={form.name}
              />
            </div>

            <div className="mb-2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={form.email}
              />
            </div>

            <div className="mb-2">
              <label>Address</label>
              <textarea
                name="address"
                className="form-control"
                onChange={handleChange}
                value={form.address}
              ></textarea>
            </div>

            <div className="mb-2">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                onChange={handleChange}
                value={form.phone}
              />
            </div>

            <div className="mb-3">
              <label>Payment Method</label>
              <select
                name="payment"
                className="form-control"
                onChange={handleChange}
                value={form.payment}
              >
                <option value="cod">Cash on Delivery</option>
                <option value="gcash">GCash</option>
                <option value="card">Credit Card</option>
              </select>
            </div>

            <button className="btn btn-success w-100">Place Order</button>
          </form>
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>

          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₱{((item.price || 0) * (item.qty || 0)).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <p>Subtotal: ₱{subtotal.toFixed(2)}</p>
          <p>Tax (12%): ₱{tax.toFixed(2)}</p>
          <h5>Total: ₱{total.toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
};

export default Checkout;