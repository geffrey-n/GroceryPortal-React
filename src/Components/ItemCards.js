// Importing react from react library
import React from "react";
// Importing the toast notification from toastify library
import { Flip, ToastContainer, toast } from "react-toastify";
// Importing the css file of the toast notification
import "react-toastify/dist/ReactToastify.css";
//Importing and destructuring useState hook from react library
import { useState } from "react";
// Importing card component from react bootstrap library
import Card from "react-bootstrap/Card";
// Importing the increment and decrement icon frrom react icons library
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
//Importing the itemCards stylesheet module from ietmCards.module.css
import itemCardStyles from "../Stylesheets/ItemCards.module.css";

/**
 *Function to render the products in the home page
 * @export {ItemCards} Exporting the ItemCards file
 * @param {*} { setCartItems {Function} Function for updating the cart items when the product is added to cart }
 * @return {*} Returns the rendering of products in the home page
 */
export default function ItemCards({ setCartItems }) {
  // Declaring the inputData and fetching the values from the local storage
  const inputData = JSON.parse(localStorage.getItem("product-list"));
  //New state variable called quantities for updating the quantity of the products added
  const [quantities, setQuantities] = useState({
    Apple: 1,
    Orange: 1,
    Strawberry: 1,
    Watermelon: 1,
    Pomegranate: 1,
  });

  /**
   *Arrow function for displaying the toast notification
   * @param {string} name provides the name pf the product added to the cart
   * @param {number} quantity provides the quantity of the product added
   * @param {string} price provides the price of the particular product
   */
  const notifyCart = (name, quantity, price) => {
    quantity = quantity === "" ? "1" : quantity;
    setCartItems((value) => [
      ...value,
      { productName: name, productQuantity: quantity, productPrice: price },
    ]);
    //Message and properties of the toast notification
    toast("Added to Cart", {
      position: "top-center",
      autoClose: 300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    cartUpdate(name, quantity);
  };

  /**
   *Function for updating the quantity in the local storage
   * @param {string} name provides the name pf the product added to the cart
   * @param {*} purchase provides the quantity of the product user purchased
   */
  function cartUpdate(name, purchase) {
    const productName = name.toLowerCase();
    const updateInput = JSON.parse(localStorage.getItem("product-list"));
    Object.values(updateInput).filter((detail) => {
      let productQty = Object.keys(detail);
      if (productQty[0] === productName) {
        let oldStock = parseInt(Object.values(detail)[0].quantity);
        let userStock = parseInt(purchase);
        let newStock = oldStock - userStock;
        Object.values(detail)[0].quantity = newStock;
      }
    });
    localStorage.setItem("product-list", JSON.stringify(updateInput));
  }

  /**
   *Function for taking the input value for the quantity of products
   * @param {string} productName provides the name pf the product added to the cart
   * @param {number} quantity provides the quantity of the product user purchased
   * @param {number} stock provides the stock quantity of the products
   */
  const handleQuantityChange = (productName, quantity, stock) => {
    quantity = quantity > stock ? stock : parseInt(quantity);
    setQuantities({ ...quantities, [productName]: parseInt(quantity) });
  };

  /**
   *Function for handling the increment button for the quantity of products
   * @param {string} productName provides the name pf the product added to the cart
   * @param {number} quantity provides the quantity of the product user purchased
   * @param {number} stock provides the stock quantity of the products
   */
  const handleIncrement = (productName, quantity, stock) => {
    quantity = quantity === stock ? stock : parseInt(quantity) + 1;
    setQuantities({ ...quantities, [productName]: quantity });
  };

  /**
   *Function for handling the decrement button for the quantity of products
   * @param {string} productName provides the name pf the product added to the cart
   * @param {number} quantity provides the quantity of the product user purchased
   * @param {number} stock provides the stock quantity of the products
   */
  const handleDecrement = (productName, quantity, stock) => {
    quantity = quantity <= 1 ? 1 : parseInt(quantity) - 1;
    setQuantities({ ...quantities, [productName]: quantity });
  };

  //   const inputData = [
  //     { apple: { name: "Apple", quantity: 10, price: "1Kg - Rs.120" } },
  //     { orange: { name: "Orange", quantity: 10, price: "1Kg - Rs.60" } },
  //     {
  //       strawberry: { name: "Strawberry", quantity: 10, price: "1Kg - Rs.120" },
  //     },
  //     {
  //       watermelon: { name: "Watermelon", quantity: 10, price: "1Kg - Rs.60" },
  //     },
  //     {
  //       pomegranate: {
  //         name: "Pomegranate",
  //         quantity: 10,
  //         price: "1Kg - Rs.120",
  //       },
  //     },
  //     { apple: { name: "Apple", quantity: 10, price: "1Kg - Rs.120" } },
  //     { orange: { name: "Orange", quantity: 10, price: "1Kg - Rs.60" } },
  //     {
  //       strawberry: { name: "Strawberry", quantity: 10, price: "1Kg - Rs.120" },
  //     },
  //     {
  //       watermelon: { name: "Watermelon", quantity: 10, price: "1Kg - Rs.60" },
  //     },
  //     {
  //       pomegranate: {
  //         name: "Pomegranate",
  //         quantity: 10,
  //         price: "1Kg - Rs.120",
  //       },
  //     },
  //   ];
  return (
    <div className={itemCardStyles.bottom_portion}>
      <div className={itemCardStyles.itemCards}>
        {/* HTML for the products name */}
        <p className={itemCardStyles.products}>
          <span className={itemCardStyles.products_firstletter}>P</span>
          <span className={itemCardStyles.products_nextletters}>roducts</span>
        </p>
        {/* HTML for the products list in the cart */}
        <div className={itemCardStyles.products_list}>
          {Object.values(inputData).map((data) => {
            let detail = Object.values(data)[0];
            return detail.quantity !== 0 ? (
              // Card component for products in the home page
              <Card key={detail.name} className={itemCardStyles.item_card}>
                {/* Image of the product */}
                <Card.Img
                  className={itemCardStyles.item_image}
                  src={require(`../Assets/${detail.name.toLowerCase()}.png`)}
                />
                {/* Name of the product */}
                <Card.Title className={itemCardStyles.item_title}>
                  {detail.name}
                  <p className={itemCardStyles.item_price}>{detail.price}</p>
                  <p className={itemCardStyles.item_quantity}>
                    Quantity - {detail.quantity}
                  </p>
                </Card.Title>
                {/* Body of the product */}
                <Card.Body className={itemCardStyles.item_body}>
                  {/* Increment button for incrementing the quantity */}
                  <BiPlusCircle
                    className={itemCardStyles.add_icon}
                    onClick={() =>
                      handleIncrement(
                        detail.name,
                        quantities[detail.name],
                        detail.quantity
                      )
                    }
                  />
                  {/* Input field for getting the user quantity */}
                  <input
                    className={itemCardStyles.item_input}
                    type="number"
                    placeholder="1"
                    value={quantities[detail.name]}
                    onChange={(event) => {
                      handleQuantityChange(
                        detail.name,
                        event.target.value,
                        detail.quantity
                      );
                    }}
                    onFocus={(event) => {
                      event.target.placeholder = "";
                      event.target.value = "";
                    }}
                    onBlur={(event) => {
                      event.target.placeholder = "1";
                    }}
                  ></input>
                  {/* Decrement button for incrementing the quantity */}
                  <BiMinusCircle
                    className={itemCardStyles.minus_icon}
                    onClick={() =>
                      handleDecrement(
                        detail.name,
                        quantities[detail.name],
                        detail.quantity
                      )
                    }
                  />
                </Card.Body>
                {/* Button for adding the products to cart */}
                <button
                  className={itemCardStyles.item_add}
                  onClick={() =>
                    notifyCart(
                      detail.name,
                      quantities[detail.name],
                      detail.price
                    )
                  }
                >
                  Add to cart
                </button>
              </Card>
            ) : (
              // Card component for products in the home page
              <Card key={detail.name} className={itemCardStyles.item_card}>
                {/* Image of the product */}
                <Card.Img
                  className={itemCardStyles.item_image}
                  src={require(`../Assets/${detail.name.toLowerCase()}.png`)}
                  style={{ opacity: "0.5" }}
                />
                {/* Name of the product */}
                <Card.Title
                  className={itemCardStyles.item_title}
                  style={{ opacity: "0.5" }}
                >
                  {detail.name}
                  <p>{detail.price}</p>
                  <p>Quantity - {detail.quantity}</p>
                </Card.Title>
                {/* Body of the product */}
                <Card.Body
                  className={itemCardStyles.item_body}
                  style={{ opacity: "0.5" }}
                >
                  {/* Input field with the quantity value as zero */}
                  <input
                    className={itemCardStyles.item_input}
                    type="number"
                    placeholder="0"
                  ></input>
                </Card.Body>
                {/* Button displaying out of stock */}
                <button className={itemCardStyles.out_of_stock}>
                  Out of Stock
                </button>
              </Card>
            );
          })}
          {/* Properties of the toast notification */}
          <ToastContainer
            position="top-center"
            autoClose={500}
            transition={Flip}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </div>
  );
}
