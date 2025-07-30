import userModel from "../models/user.model.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const qty = Number(quantity);
    if (!userId || !itemId || !Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId].quantity += qty;
    } else {
      cartData[itemId] = { quantity: qty };
    }

    await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId].quantity = quantity;
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ message: "Cart updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.status(200).json({ cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      delete cartData[itemId]; 
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export { addToCart, updateCart, getCart, deleteFromCart };

