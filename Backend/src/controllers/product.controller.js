import productModel from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      productCode,
      description,
      price,
      category,
      subCategory,
      subSubCategory,
      bestSeller,
      discount,
      tag1,
      tag2,
      tag3,
    } = req.body;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];
    const image5 = req.files.image5?.[0];

    const images = [image1, image2, image3, image4, image5].filter(
      (item) => item !== undefined
    );

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required to add a product.",
      });
    }

    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        console.log("Uploading:", image.path);
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const tags = [tag1, tag2, tag3].filter((tag) => tag);

    const productData = {
      name,
      productCode,
      description,
      price: Number(price),
      category,
      subCategory,
      subSubCategory,
      discount: discount ? Number(discount) : 0,
      bestSeller: bestSeller === "true",
      images: imagesUrl,
      tags: tags,
      date: Date.now(),
    };

    const newProduct = new productModel(productData);
    await newProduct.save();

    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      name,
      productCode,
      description,
      price,
      category,
      subCategory,
      subSubCategory,
      bestSeller,
      discount,
      tag1,
      tag2,
      tag3,
    } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];
    const image5 = req.files.image5?.[0];

    const images = [image1, image2, image3, image4, image5].filter(
      (item) => item !== undefined
    );

    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (image) => {
          console.log("Uploading:", image.path);
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    } else if (product.images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required to update the product.",
      });
    }

    imagesUrl = imagesUrl.length > 0 ? imagesUrl : product.images;

    const tags = [tag1, tag2, tag3].filter((tag) => tag);

    const updatedProductData = {
      name,
      productCode,
      description,
      price: Number(price),
      category,
      subCategory,
      subSubCategory,
      discount,
      bestSeller: bestSeller === "true",
      images: imagesUrl,
      tags: tags,
      date: Date.now(),
    };

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await productModel.findByIdAndDelete(productId);
    res.json({
      success: true,
      message: "Product Removed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, listProducts, editProduct, removeProduct, singleProduct };
