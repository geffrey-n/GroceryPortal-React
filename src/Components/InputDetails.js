/**
 *Function for storing the initial values of the products in the local storage
 * @export {InputDetails} Exporting the InputDetails file
 */
export default function InputDetails() {
  //Declaring the inputdetails
  const inputData = [
    { apple: { name: "Apple", quantity: 10, price: "1Kg - Rs.120" } },
    { orange: { name: "Orange", quantity: 10, price: "1Kg - Rs.60" } },
    { strawberry: { name: "Strawberry", quantity: 10, price: "1Kg - Rs.120" } },
    { watermelon: { name: "Watermelon", quantity: 10, price: "1Kg - Rs.60" } },
    {
      pomegranate: { name: "Pomegranate", quantity: 10, price: "1Kg - Rs.120" },
    },
  ];
  // Writing the input details to the local storage
  localStorage.setItem("product-list", JSON.stringify(inputData));
}
