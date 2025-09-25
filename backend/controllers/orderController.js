const placeOrder = async (req, res) => {
  try {
    const { firstName, lastName, address, items, total } = req.body;

    if (!firstName || !lastName || !address) {
      return res.status(400).json({
        success: false,
        message: "firstName, lastName, and address are required",
      });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart items are required",
      });
    }

    const order = {
      id: Date.now(),
      firstName,
      lastName,
      address,
      items,
      total,
      createdAt: new Date(),
    };
    console.log("New order placed:", JSON.stringify(order, null, 2));

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: { orderId: order.id },
    });
  } catch (error) {
    console.error("Error placing order:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { placeOrder };