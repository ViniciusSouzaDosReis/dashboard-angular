const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomMetrics = () => {
    const total = getRandomInt(50, 200);
    const lastMonth = getRandomInt(10, 200);
    const difference = total - lastMonth;
    const percentage = ((difference / lastMonth) * 100).toFixed(2);
    const trend = difference >= 0 ? "increase" : "decrease";

    return {
      total,
      lastMonth,
      difference,
      percentage,
      trend,
    };
  };

  router.get("/", (req, res) => {
    const clientsMetrics = generateRandomMetrics();
    const plansMetrics = generateRandomMetrics();
    const averagePlansMetrics = generateRandomMetrics();

    res.json({
      clients: {
        total: clientsMetrics.total,
        lastMonth: clientsMetrics.lastMonth,
        ...clientsMetrics,
      },
      plans: {
        total: plansMetrics.total,
        lastMonth: plansMetrics.lastMonth,
        ...plansMetrics,
      },
      averagePlansPerClient: {
        total: averagePlansMetrics.total,
        lastMonth: averagePlansMetrics.lastMonth,
        ...averagePlansMetrics,
      },
    });
  });

  return router;
};