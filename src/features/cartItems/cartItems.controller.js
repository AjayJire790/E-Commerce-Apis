import CartItemsModel from "./cartItems.model.js";

export default class CartItemsController {
  add(req, res) {
    const productID = req.body.productID;
    const quantity = req.body.quantity;
    const userID = payload.userID;
    CartItemsModel.add(productID, userID, quantity);
    res.status(201).send("Cart is updated");
  }
  get(req, res) {
    const userID = req.userID;
    const cartItems = CartItemsModel.get(userID);
    return res.status(200).send(cartItems);
  }
  delete(req, res) {
    const userID = req.userID;
    const productID = req.params.productID;
    const error = CartItemsModel.delete(productID, userID);
    if (error) {
      return res.status(404).send(error);
    }
    return res.status(200).send("Cart Item is removed");
  }
}
