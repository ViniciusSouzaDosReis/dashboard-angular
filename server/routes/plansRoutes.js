const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  function generateMockPlans(count = 3) {
    const mockPlans = [];

    for (let i = 1; i <= count; i++) {
      mockPlans.push({
        id: i.toString(),
        nome: `Plano ${i}`,
        preco: Math.floor(Math.random() * 100) + 50,
        franquiaDados: Math.floor(Math.random() * 10) + 5,
        minutosLigacao: Math.floor(Math.random() * 200) + 100,
        dataCadastro: "2025-01-01",
      });
    }

    return mockPlans;
  }

  router.get("/", (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const plans = generateMockPlans(100);
    res.json(plans);
  });

  router.post("/", (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const newPlan = req.body;
    newPlan.id = (db.planos.length + 1).toString();
    db.planos.push(newPlan);

    res.json(newPlan);
  });

  router.put("/:id", (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const planId = req.params.id;
    const updatedPlan = req.body;

    const planIndex = db.planos.findIndex((p) => p.id === planId);
    if (planIndex < 0) {
      return res.status(404).json({ error: "Plan not found" });
    }

    db.planos[planIndex] = updatedPlan;

    res.json(updatedPlan);
  });

  router.delete("/:id", (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const planId = req.params.id;
    const planIndex = db.planos.findIndex((p) => p.id === planId);
    if (planIndex < 0) {
      return res.status(404).json({ error: "Plan not found" });
    }

    db.planos.splice(planIndex, 1);

    res.json({ success: true });
  });

  router.get("/metrics", (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const plans = db.planos || [];
    const clientPlans = db.clientePlanos || [];
    const clients = db.clientes || [];

    const totalClients = clients.length;

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const plansWithDetails = plans.map((plan) => {
      const planAssociations = clientPlans.filter(
        (cp) => cp.planoId === plan.id
      );

      const filteredAssociations = planAssociations.filter((cp) => {
        const associationDate = cp.dataAssociacao;
        if (startDate && endDate) {
          return associationDate >= startDate && associationDate <= endDate;
        }
        return true;
      });

      const totalClientsInPlan = filteredAssociations.length;

      const percentage =
        totalClients > 0
          ? ((totalClientsInPlan / totalClients) * 100).toFixed(2)
          : "0.00";

      return {
        id: plan.id,
        name: plan.nome,
        totalUsersInPlan: totalClientsInPlan,
        percentage,
        associations: filteredAssociations.map((cp) => ({
          clientId: cp.clienteId,
          associationDate: cp.dataAssociacao,
        })),
      };
    });

    res.json(plansWithDetails);
  });

  return router;
};
