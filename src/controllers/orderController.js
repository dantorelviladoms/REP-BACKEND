const Order = require('../models/Order');
const User = require('../models/user');

// ─── GET /api/orders/my-orders ─────────────────────────────────────────────────
// Retorna les ordres de l'usuari autenticat
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('products.vehiculo', 'marca modelo version imagen')
      .sort({ createdAt: -1 });

    res.json({ status: 'success', data: orders });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ─── GET /api/orders ────────────────────────────────────────────────────────────
// Retorna totes les ordres (admin only)
const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate('user', 'nombre apellido email')
      .populate('products.vehiculo', 'marca modelo version')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      status: 'success',
      data: orders,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ─── GET /api/orders/stats ──────────────────────────────────────────────────────
// Estadístiques per al dashboard d'admin (Chart.js)
const getOrderStats = async (req, res) => {
  try {
    // Comptes per estat
    const byStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 }, total: { $sum: '$total' } } }
    ]);

    // Ordres per mes (últims 12 mesos)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const byMonth = await Order.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo }, status: { $in: ['paid', 'pending'] } } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: '$total' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Totals globals
    const totals = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          paidOrders: { $sum: { $cond: [{ $eq: ['$status', 'paid'] }, 1, 0] } },
          paidRevenue: { $sum: { $cond: [{ $eq: ['$status', 'paid'] }, '$total', 0] } }
        }
      }
    ]);

    // Total usuaris
    const totalUsers = await User.countDocuments();

    res.json({
      status: 'success',
      data: {
        byStatus,
        byMonth,
        totals: totals[0] || { totalOrders: 0, totalRevenue: 0, paidOrders: 0, paidRevenue: 0 },
        totalUsers
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { getMyOrders, getAllOrders, getOrderStats };
