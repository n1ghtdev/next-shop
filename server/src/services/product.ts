import ProductModel, { IProduct } from '../models/product';
import CategoryModel from '../models/category';

export class ProductService {
  static async add(product: Partial<IProduct>): Promise<IProduct> {
    const productRecord = new ProductModel(product);

    if (!productRecord) {
      throw new Error('Cannot add product');
    }

    await productRecord.save(async (err: Error, doc: any) => {
      await CategoryModel.updateOne(
        { _id: doc.category },
        // eslint-disable-next-line no-underscore-dangle
        { $inc: { qty: 1 }, $push: { products: doc._id } }
      );
    });

    return productRecord;
  }

  static async findAll(): Promise<IProduct[]> {
    const products = await ProductModel.find()
      .populate({ path: 'category', select: '_id, name' })
      .exec();

    return products;
  }

  static async find(id: string): Promise<IProduct> {
    const product = await ProductModel.findOne({ _id: id }).populate({
      path: 'category',
      select: '_id, name',
    });

    return product!;
  }

  static async update(product: Partial<IProduct>): Promise<IProduct> {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: product.id },
      { ...product },
      { new: true }
    ).populate({ path: 'category', select: '_id, name' });

    return updatedProduct!;
  }

  static async delete(id: string): Promise<any> {
    const status = await ProductModel.findByIdAndRemove(id);

    return status;
  }
}
