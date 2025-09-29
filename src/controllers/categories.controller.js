import { CategoryModel } from "../models/mongoose/category.model.js";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    // TODO: crear category (solo admin)
    const newCategory = await CategoryModel.create({
      name,
      description
    });
    return res.status(201).json({ msg: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    // TODO: eliminar category (solo admin) y actualizar assets que referencian
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    await AssetModel.updateMany({ assets: id }, { $pull: { assets: id } })
    return res.status(204).json({ msg: "Categoría eliminada correctamente" , deletedCategory});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

