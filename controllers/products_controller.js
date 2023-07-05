const Product = require(`../models/Product`);
const Category = require('../models/Category');

module.exports = {


  getAll: async (req, res) => {
    try {
      /*       const { page = 1, limit = 3} = req.query;

      const count = await Model.count();

      console.log(count);

      const pages = Math.ceil(count / limit);

      console.log(pages);

      const models = await Model.find().skip((page - 1 ) * limit).limit(limit).exec(); */

      const products = await Product.find().populate('category').exec();

      return res.status(200).json({
        success: true,
        message: `success to find all products`,
        /*         limit,
        count,
        pages, */
        products,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in get all products`,
        error: error.message,
      });
    }
  },


  // manager functions

  addProduct: async (req, res) => {
    try {
      // gettind values from the body request
      const {
        product_name,
        product_description = "",
        product_price,
        category
      } = req.body;

      const product_image = `http://localhost:4000/uploads/${req.file.filename}`;

      // creating new model using the values from req.body
      const new_product = new Product({
        product_name,
        product_description,
        product_price,
        product_image,
        category
      });

      // actual saving
      await new_product.save();

      // return success message
      return res.status(200).json({
        success: true,
        message: `success to add new products`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in add products`,
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.product_id
      const models = await Product.findById(id).populate('categories.category').exec();

      return res.status(200).json({
        success: true,
        message: `success to find product by id for - manager`,
        product: models,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in find product by id for - manager}`,
        error: error.message,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.product_id;

      await Product.findByIdAndDelete(id).exec();

      return res.status(200).json({
        success: true,
        message: `success to delete product by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in delete product by id`,
        error: error.message,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.params.product_id;
      console.log(req.body);
      console.log(id);
      await Product.findByIdAndUpdate(id, req.body, /* {
         runValidators: true,
        context: "query", 
      } */)/* .exec(); */

      return res.status(200).json({
        success: true,
        message: `success to update product by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in update product by id`,
        error: error.message,
      });
    }
  },

  updateById: async (req, res) => {
    try {
      const id = req.params.id;

      await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        context: "query",
      }).exec();

      return res.status(200).json({
        success: true,
        message: `success to update product by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in update product by id`,
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    try {
      const id = req.params.id;

      await Product.findByIdAndDelete(id).exec();

      return res.status(200).json({
        success: true,
        message: `success to delete product by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in delete product by id`,
        error: error.message,
      });
    }
  },

  getProductByCategory: async (req, res) => {
    try {
      const category_id = req.params.category_id;
      const products = await Product.find({category_id}).populate('category').exec();
      const final_products = products.filter(product => product.category._id == category_id);
      
      return res.status(200).json({
        success: true,
        message: `success to get product by categoty`,
        final_products
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in get product by category`,
        error: error.message,
      });
    }
  }
}
