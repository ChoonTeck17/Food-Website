import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

export const FoodDisplay = ({ category }) => {
  const { food_list, addToCart, removeFromCart } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (id) => {
    const quantity = quantities[id] || 1; // Use the quantity set for the item
    addToCart(id, quantity); // Ensure addToCart accepts quantity
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const updateQuantity = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, parseInt(value) || 1),
    }));
  };

  return (
    <div className="mt-12 px-6 lg:px-12" id="food-display">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 tracking-wide mb-6">
        Top Dishes Around You
      </h2>

      {showPopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
          Item added to cart successfully!
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-semibold text-green-600">${item.price}</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        value={quantities[item._id] || 1}
                        onChange={(e) => updateQuantity(item._id, e.target.value)}
                        className="w-12 text-center border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => handleAddToCart(item._id)}
                        className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 transition duration-150"
                      >
                        Add to Cart
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;