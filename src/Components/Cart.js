// Importing react from react library
import React from "react";
// Importing close icon from the react icons library
import { IoMdCloseCircleOutline } from "react-icons/io";
// Importing card component from react bootstrap library
import Card from "react-bootstrap/Card";
//Importing the cart stylesheet module from cart.module.css
import cartStyles from "../Stylesheets/Cart.module.css";

/**
 *Function to render the cart page
 * @export {Cart} Exporting the cart file
 * @param {*} {
 * setCartClickValue {Boolean} Variable for opening and closing of cart page with boolean values,
 * cartItems {Array} Array contains the products that are added to cart,
 * setCartItems {Function} Function for updating the cart items }
 * @return {*} Returns the rendering of elements in the cart page
 */
export default function Cart({ setCartClickValue, cartItems, setCartItems }) {
  /**
   *Function for closing the cart page
   */
  function closeCart() {
    setCartClickValue();
  }

  /**
   *Function for updating the cartItems array when checkedout
   */
  function removeCart() {
    cartItems = [];
    setCartItems(cartItems);
  }

  // Declaring the cartCard variable for checking if the cart is empty or not
  let cartCard;
  if (cartItems.length === 0) {
    cartCard = false;
  } else {
    cartCard = true;
  }

  // Declaring the count for applying the key for the card
  let count = 0;
  return (
    <div>
      {cartCard ? (
        <div>
          {/* HTML for the cart name and close icon in cart page */}
          <div className={cartStyles.cart_name_close}>
            {/* HTML for the cart name */}
            <p className={cartStyles.cart_name}>
              <span className={cartStyles.cart_name_firstletter}>C</span>
              <span className={cartStyles.cart_name_nextletters}>art</span>
            </p>
            {/* HTML for the close icon in cart page */}
            <IoMdCloseCircleOutline
              className={cartStyles.close_icon}
              onClick={closeCart}
            />
          </div>
          {/* HTML for the list of products in cart */}
          <div className={cartStyles.cart_bottom}>
            <div className={cartStyles.cart_products_list}>
              {Object.values(cartItems).map((product) => {
                let productName = product.productName;
                let productQuantity = product.productQuantity;
                let productPrice = product.productPrice;
                productPrice = productPrice.split(".")[1];
                let userPrice = productQuantity * productPrice;
                return (
                  // Declaring the card component for the cart products
                  <Card
                    key={(count += 1)}
                    className={cartStyles.cart_item_card}
                  >
                    <Card.Img
                      className={cartStyles.cart_item_image}
                      src={require(`../Assets/${productName.toLowerCase()}.png`)}
                    />
                    <Card.Title className={cartStyles.cart_item_title}>
                      {productName}
                    </Card.Title>
                    <Card.Body className={cartStyles.cart_item_body}>
                      <span className={cartStyles.cart_quantity}>
                        Quantity : {productQuantity}
                      </span>
                      <span className={cartStyles.cart_price}>
                        Price - Rs.{userPrice}
                      </span>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
            <div className={cartStyles.cart_button}>
              <button className={cartStyles.item_purchase} onClick={removeCart}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* HTML for the cart name and close icon in cart page */}
          <div className={cartStyles.cart_name_close}>
            {/* HTML for the cart name */}
            <p className={cartStyles.cart_name}>
              <span className={cartStyles.cart_name_firstletter}>C</span>
              <span className={cartStyles.cart_name_nextletters}>art</span>
            </p>
            {/* HTML for the close icon in cart page */}
            <IoMdCloseCircleOutline
              className={cartStyles.close_icon}
              onClick={closeCart}
            />
          </div>
          <div className={cartStyles.cart_bottom}>
            <div className={cartStyles.cart_products_list}>
              {/* Declaring the card component for the cart products */}
              <Card className={cartStyles.nocart_item_card}>
                <Card.Img
                  className={cartStyles.nocart_item_image}
                  src={require(`../Assets/nocart.png`)}
                />
                <Card.Title className={cartStyles.nocart_item_title}>
                  Cart is Empty
                </Card.Title>
                <Card.Body className={cartStyles.nocart_item_body}>
                  <span className={cartStyles.nocart_quantity}>
                    Add products to the cart
                  </span>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
