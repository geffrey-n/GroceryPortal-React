//Importing react from react library
import React from "react";
//Importing and destructuring useState hook from react library
import { useState } from "react";
//Importing modal component from react-modal library
import Modal from "react-modal";
//Importing cart fils from cart.js
import Cart from "./Cart";
//Importing restock file from restock.js
import Restock from "./Restock";
//Importing itemCards from itemCards.js
import ItemCards from "./ItemCards";
//Importing the header stylesheet module from header.module.css
import headerStyles from "../Stylesheets/Header.module.css";

/**
 *Function to render the header page
 * @export {Header} Exporting the HeaderPage file
 * @return {*} Returns the rendering of elements in the header page
 */
export default function Header() {
  //New state variable called cartItems for updating the cart items
  const [cartItems, setCartItems] = useState([]);
  //New state variable called cartClickValue for opening and closing of cart page
  const [cartClickValue, setCartClickValue] = useState(false);
  //New state variable called restockClickValue for opening and closing of restock page
  const [restockClickValue, setRestockClickValue] = useState(false);

  /**
   *Function for handling the cart click event
   */
  function cartClick() {
    setCartClickValue(!cartClickValue);
  }

  /**
   *Function for handling the restock click event
   */
  function restockClick() {
    setRestockClickValue(!restockClickValue);
  }
  return (
    <div>
      <div className={headerStyles.header}>
        {/* HTML for the app logo and app name */}
        <div className={headerStyles.app_logo_name}>
          {/* HTML for the app logo */}
          <img
            className={headerStyles.app_logo}
            src={require("../Assets/Logo.png")}
            alt="Website Logo"
          />
          {/* HTML for the app name */}
          <p className={headerStyles.app_name}>
            <span className={headerStyles.app_name_firstword_firstletter}>
              F
            </span>
            <span className={headerStyles.app_name_firstword_nextletters}>
              RESH
            </span>
            <span className={headerStyles.app_name_secondword_firstletter}>
              B
            </span>
            <span className={headerStyles.app_name_secondword_nextletters}>
              ASKET
            </span>
          </p>
        </div>
        {/* HTML for the restock logo and restock name */}
        <div className={headerStyles.restock_logo_name} onClick={restockClick}>
          {/* HTML for the restock logo */}
          <img
            className={headerStyles.restock_logo}
            src={require("../Assets/Restock.png")}
            alt="Restock Logo"
          />
          {/* HTML for the restock name */}
          <p className={headerStyles.restock_name}>
            <span className={headerStyles.restock_name_firstletter}>R</span>
            <span className={headerStyles.restock_name_nextletters}>
              estock
            </span>
          </p>
        </div>
        {/* HTML for the cart logo and cart name */}
        <div className={headerStyles.cart_logo_name} onClick={cartClick}>
          {/* HTML for the cart logo */}
          <img
            className={headerStyles.cart_logo}
            src={require("../Assets/Cart.png")}
            alt="Cart Logo"
          />
          {/* HTML for the cart name */}
          <p className={headerStyles.cart_name}>
            <span className={headerStyles.cart_name_firstletter}>C</span>
            <span className={headerStyles.cart_name_nextletters}>art</span>
          </p>
        </div>
        {/* Condition for opening and Closing of cart page */}
        {cartClickValue && (
          <Modal
            isOpen={cartClickValue}
            ariaHideApp={false}
            className={headerStyles.cart_view}
          >
            <Cart
              setCartClickValue={cartClick}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </Modal>
        )}
        {/* Condition for opening and Closing of restock page */}
        {restockClickValue && (
          <Modal
            isOpen={restockClickValue}
            ariaHideApp={false}
            className={headerStyles.restock_view}
          >
            <Restock setRestockClickValue={restockClick} />
          </Modal>
        )}
      </div>
      {/* Rendering the itemCards component */}
      <ItemCards setCartItems={setCartItems} />
    </div>
  );
}
