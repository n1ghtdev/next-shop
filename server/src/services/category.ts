import CategoryModel, { ICategory } from '../models/category';

export class CategoryService {
  static async add(category: ICategory): Promise<ICategory> {
    const categoryRecord = CategoryModel.create(category);

    if (!categoryRecord) {
      throw new Error('Cannot add product');
    }

    return categoryRecord;
  }

  static async findAll(): Promise<ICategory[]> {
    const categories = await CategoryModel.find().exec();
    return categories;
  }

  static async update(category: Partial<ICategory>): Promise<ICategory> {
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { _id: category.id },
      { ...category },
      { new: true }
    );

    return updatedCategory!;
  }

  static async delete(id: string): Promise<any> {
    const status = await CategoryModel.findByIdAndRemove(id);
    return status;
  }
}
