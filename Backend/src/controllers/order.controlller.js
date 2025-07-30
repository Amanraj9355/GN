//Placing order using COD
// import orderModel from '../models/order.model.js';
// import razorpay from 'razorpay'

// const razorpayInstance = new razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET
// })

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res
      .status(200)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// const placeOrderRazorpay = async(req,res)=>{
//     try {
//         const {userId,items,amount,address} = req.body;
//         const{origin} = req.headers;

//         const orderData={
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod:"Razorpay",
//             payment:false,
//             date:Date.now()
//         }
//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         const options = {
//             amount:amount*100,
//             currency:"INR",
//             receipt:newOrder._id.toString(),
//         }

//         await razorpayInstance.orders.create(options,(err,order)=>{
//             if(err){
//                 return res.status(500).json({success:false,message:err.message})
//             }
//             res.status(200).json({success:true,order})
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:error.message})
//     }

// }

// const verifyRazorpay = async(req,res)=>{
//     try {
//         const {userId,razorpay_order_id} = req.body;
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
//         if(orderInfo.status === "paid"){
//             await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
//             await userModel.findByIdAndUpdate(userId,{cartData:{}});
//         }
//         res.status(200).json({success:true,message:"Payment verified successfully"})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:error.message})
//     }
// }

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {}
};

//Get user orders for user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    log(error);
    res.status(500).json({ message: error.message });
  }
};

//Update order status for admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    res.json(500).json({ message: error.message });
  }
};

export { placeOrder, allOrders, userOrders, updateOrderStatus };
