import OrderModel, { IOrder } from '../models/order';

export class OrderService {
  static async add(order: Partial<IOrder>): Promise<IOrder> {
    const orderRecord = OrderModel.create(order);

    if (!orderRecord) {
      throw new Error('Cannot add order');
    }

    return orderRecord;
  }

  static async findUserOrders(userId: string): Promise<IOrder[]> {
    const orders = await OrderModel.find({ 'user._id': userId }).exec();
    return orders;
  }

  static async update(order: Partial<IOrder>): Promise<IOrder> {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: order.id },
      { ...order },
      { new: true }
    );

    return updatedOrder!;
  }

  static async delete(orderId: string): Promise<any> {
    const status = await OrderModel.findByIdAndRemove(orderId);
    return status;
  }
}
