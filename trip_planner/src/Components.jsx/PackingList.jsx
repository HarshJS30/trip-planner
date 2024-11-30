import React from "react";

function PackingList() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Packing List</h2>

      <div className="mb-4">
        <h3 className="text-primary">Clothing</h3>
        <ul className="list-group">
          <li className="list-group-item">Shoes</li>
          <li className="list-group-item">Casual Clothes</li>
          <li className="list-group-item">Dressy Outfit</li>
          <li className="list-group-item">Sleepwear</li>
          <li className="list-group-item">Jackets/Sweater (if applicable)</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-primary">Toiletries</h3>
        <ul className="list-group">
          <li className="list-group-item">Toothbrush and Toothpaste</li>
          <li className="list-group-item">Perfumes/Deodorant</li>
          <li className="list-group-item">Skincare</li>
          <li className="list-group-item">Comb</li>
          <li className="list-group-item">Towel</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-primary">Electronics</h3>
        <ul className="list-group">
          <li className="list-group-item">Charger</li>
          <li className="list-group-item">Powerbank</li>
          <li className="list-group-item">Camera and Accessories</li>
          <li className="list-group-item">Headphones/Earbuds</li>
          <li className="list-group-item">Laptop/Tablet (if needed)</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-primary">Essentials</h3>
        <ul className="list-group">
          <li className="list-group-item">Passport/ID</li>
          <li className="list-group-item">Tickets</li>
          <li className="list-group-item">Local Currency (if abroad)</li>
          <li className="list-group-item">Cards</li>
          <li className="list-group-item">Wallet</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-primary">Other Items</h3>
        <ul className="list-group">
          <li className="list-group-item">Sunglasses</li>
          <li className="list-group-item">Water Bottle</li>
          <li className="list-group-item">Snacks</li>
          <li className="list-group-item">Beach Accessories (if going)</li>
          <li className="list-group-item">Mountain Accessories (if going)</li>
        </ul>
      </div>
    </div>
  );
}

export default PackingList;
