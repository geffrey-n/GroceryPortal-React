// Importing react from react library
import React from "react";
// Importing Card from react bootstrap library
import Card from "react-bootstrap/Card";
// Importing the close icon from the react icons library
import { IoMdCloseCircleOutline } from "react-icons/io";
// Importing the toast notification from toastify library
import { toast } from "react-toastify";
// Importing the css files for the toast notification
import "react-toastify/dist/ReactToastify.css";
//Importing and destructuring useState hook from react library
import { useState } from "react";
//Importing the restock stylesheet module from restock.module.css
import restockStyles from "../Stylesheets/Restock.module.css";

/**
 *Function to render the restock page for adding the stock
 * @export {Restock} Exporting the restock file
 * @param {*} { setRestockClickValue {Boolean} Variable for opening and closing of restock page with boolean values}
 * @return {*} Returns the rendering of elements in the restock page
 */
export default function Restock({ setRestockClickValue }) {
  //New state variable called stock for updating the quantity of the products when restocked
  const [stock, setStock] = useState({
    Apple: 0,
    Orange: 0,
    Strawberry: 0,
    Watermelon: 0,
    Pomegranate: 0,
  });

  /**
   *Function to execute the toast notification
   */
  function toastFunction() {
    toast("Stock Added", {
      position: "top-right",
      autoClose: 300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  /**
   *Arrow function to update the quantity when stock is added and execute the toasitfy function
   * @param {string} name provides the name of the product
   */
  const notifyStock = (name) => {
    const productName = name.toLowerCase();
    const updateInput = JSON.parse(localStorage.getItem("product-list"));
    Object.values(updateInput).filter((detail) => {
      let productQty = Object.keys(detail);
      if (productQty[0] === productName) {
        let oldStock = parseInt(Object.values(detail)[0].quantity);
        let userStock = stock[name];
        let newStock = oldStock + userStock;
        function oldStockUpdate() {
          newStock = oldStock;
          window.alert("Stock is full \nNew stock cannot be added");
        }
        newStock > 100 ? oldStockUpdate() : toastFunction();
        Object.values(detail)[0].quantity = newStock;
      }
    });
    localStorage.setItem("product-list", JSON.stringify(updateInput));
  };

  /**
   *Function for taking the input value for restocking of products
   * @param {string} productName provides the name of the product
   * @param {number} quantity provides the quantity of the product to be restocked
   */
  const handleStock = (productName, quantity) => {
    quantity = quantity > 100 ? 100 : quantity;
    quantity = quantity <= 0 ? 1 : quantity;
    setStock({ ...stock, [productName]: parseInt(quantity) });
  };

  // Declaring the inputData to get the product details from local storage
  const inputData = JSON.parse(localStorage.getItem("product-list"));
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

  /**
   *Function for closing the restock page
   */
  function closeRestock() {
    setRestockClickValue();
  }
  return (
    <div>
      {/* HTML for restock name and close icon in the restock page */}
      <div className={restockStyles.restock_name_close}>
        {/* HTML for the restock name */}
        <p className={restockStyles.restock_name}>
          <span className={restockStyles.restock_name_firstletter}>R</span>
          <span className={restockStyles.restock_name_nextletters}>estock</span>
        </p>
        {/* Html for the close icon in the restock page */}
        <IoMdCloseCircleOutline
          className={restockStyles.close_icon}
          onClick={closeRestock}
        />
      </div>
      {/* HTML for the products list for restocking */}
      <div className={restockStyles.restock_products_list}>
        {Object.values(inputData).map((data) => {
          let detail = Object.values(data)[0];
          return (
            // Card component for restocking of the products
            <Card key={detail.name} className={restockStyles.restock_item_card}>
              {/* Image of the product */}
              <Card.Img
                className={restockStyles.restock_item_image}
                src={require(`../Assets/${detail.name.toLowerCase()}.png`)}
              />
              {/* Name of the product */}
              <Card.Title className={restockStyles.restock_item_title}>
                {detail.name}
              </Card.Title>
              {/* Body of the product */}
              <Card.Body className={restockStyles.restock_item_body}>
                {/* Input field to get the value from the user for restocking */}
                <input
                  className={restockStyles.restock_item_input}
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Qty"
                  value={stock[detail.name]}
                  onChange={(event) => {
                    handleStock(detail.name, event.target.value);
                  }}
                  onFocus={(event) => {
                    event.target.placeholder = "";
                    event.target.value = "";
                  }}
                  onBlur={(event) => {
                    event.target.placeholder = "Qty";
                  }}
                ></input>
              </Card.Body>
              {/* Button for adding the stock to the quantity */}
              <button
                className={restockStyles.restock_item_add}
                onClick={() => notifyStock(detail.name)}
              >
                Add Stock
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
