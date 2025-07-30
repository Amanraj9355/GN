import userModel from "../models/user.model.js";

const addToWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let wishlistData = userData.wishlistData || {};

    // ✅ If already in wishlist, do nothing
    if (!wishlistData[itemId]) {
      wishlistData[itemId] = true;
    }

    await userModel.findByIdAndUpdate(
      userId,
      { $set: { wishlistData } },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Item added to wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const wishlistData = userData.wishlistData || {};
    res.status(200).json({ success: true, wishlistData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteFromWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let wishlistData = userData.wishlistData || {};

    if (wishlistData[itemId]) {
      delete wishlistData[itemId];
    } else {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    await userModel.findByIdAndUpdate(
      userId,
      { $set: { wishlistData } },
      { new: true }
    );

    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export { addToWishlist, getWishlist, deleteFromWishlist };
