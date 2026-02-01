import connectDB from "@/lib/db";
import Order from "@/model/order.models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { orderid: string } },
) => {
  try {
    await connectDB();
    const { orderid } = await params;
    const {status} = await req.json();
    const order = await Order.findById(orderid).populate("user")
    if(!order){
      return NextResponse.json(
        { error:"Order not found"},
        { status: 400}
      )
    }
    order.status = status

    let availableDeliveryBoy:any = []
    if()

  } catch (error) {}
};
