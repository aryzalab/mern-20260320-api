import Product from "../models/Product.js";
import uploadFile from "../utils/fileuploader.js";

const getAllProducts = async (query) => {
  const sort = query.sort ? JSON.parse(query.sort) : {};
  const limit = query.limit ?? 10;
  const offset = query.offset ?? 0;

  const filters = {};

  const { category, brands, name, min, max, createdBy } = query;

  if (category) filters.category = category;
  if (brands) filters.brand = { $in: brands.split(",") };
  if (name) filters.name = { $regex: name, $options: "i" }; // Ilike match
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (createdBy) filters.createdBy = createdBy;

  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);

  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  return product;
};

const createProduct = async (data, files, userId) => {
  const uploadedFiles = await uploadFile(files);

  return await Product.create({
    ...data,
    imageUrls: uploadedFiles.map((file) => file.url),
    createdBy: userId,
  });
};

const updateProduct = async (id, input) => {
  return await Product.findByIdAndUpdate(id, input, { new: true });
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

const getBrands = async () => {
  return await Product.distinct("brand");
};

const getCategories = async () => {
  return await Product.distinct("category");
};

const getTotalCount = async () => {
  return await Product.countDocuments();
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getBrands,
  getCategories,
  getTotalCount,
};
