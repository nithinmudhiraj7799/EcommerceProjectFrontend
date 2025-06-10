import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle Place Order button click
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Your cart is empty. Please add items before placing an order.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Cart added successfully!",
      text: "Complete the payment and enjoy the fruits' taste 🍉🍎.",
      confirmButtonText: "Proceed to Checkout",
    }).then(() => {
      navigate("/address");
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center">🛒 View Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center py-4 border-b"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>₹ {item.price}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => decreaseQty(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>
            </div>
            <div>
              <p>₹ {(item.price * item.quantity).toFixed(2)}</p>
              <button
                className="text-red-500"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <div className="text-right font-bold mt-6">Total: ₹ {total.toFixed(2)}</div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default CartPage;
