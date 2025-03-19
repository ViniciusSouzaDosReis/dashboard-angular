const express = require("express");

const MOCK_PLANS_TYPE = ["Plano Básico", "Plano Premium", "Plano Familia"];

module.exports = (db) => {
  const router = express.Router();

  function generateMockUsers(count = 10) {
    const mockUsers = [];

    for (let i = 1; i <= count; i++) {
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const month = randomMonth < 10 ? `0${randomMonth}` : randomMonth;

      const date = `2025/${month}/1`;

      mockUsers.push({
        userId: i.toString(),
        name: "Fulano de Tal",
        cpf: "123.456.789-00",
        phone: "(11) 1 1111-1111",
        email: "a@a.com",
        registrationDate: date,
        associatedPlans: [
          {
            planId: Math.floor(Math.random() * 3) + 1,
            planName: MOCK_PLANS_TYPE[Math.floor(Math.random() * 3)],
            associationDate: "string",
          },
          {
            planId: Math.floor(Math.random() * 3) + 1,
            planName: MOCK_PLANS_TYPE[Math.floor(Math.random() * 3)],
            associationDate: "string",
          },
          {
            planId: Math.floor(Math.random() * 3) + 1,
            planName: MOCK_PLANS_TYPE[Math.floor(Math.random() * 3)],
            associationDate: "string",
          },
          {
            planId: Math.floor(Math.random() * 3) + 1,
            planName: MOCK_PLANS_TYPE[Math.floor(Math.random() * 3)],
            associationDate: "string",
          },
          {
            planId: Math.floor(Math.random() * 3) + 1,
            planName: MOCK_PLANS_TYPE[Math.floor(Math.random() * 3)],
            associationDate: "string",
          },
          {
            planId: Math.floor(Math.random() * 3) + 1,
            planName: MOCK_PLANS_TYPE[Math.floor(Math.random() * 3)],
            associationDate: "string",
          },
        ],
      });
    }

    return mockUsers;
  }

  router.post("/", (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { name, cpf, phone, email } = req.body;

    if (!name || !cpf || !phone || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = {
      id: db.clientes.length + 1,
      nome: name,
      cpf,
      telefone: phone,
      email,
      dataCadastro: new Date().toISOString(),
    };

    db.clientes.push(user);

    res.status(201).json({
      userId: user.id,
      name,
      cpf,
      phone,
      email,
      registrationDate: user.dataCadastro,
      associatedPlans: [],
    });
  });

  router.put("/:userId", (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { name, cpf, phone, email } = req.body;
    const { userId } = req.params;

    if (!name || !cpf || !phone || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    res.status(201).json({
      userId,
      name,
      cpf,
      phone,
      email,
      registrationDate: new Date().toISOString(),
      associatedPlans: [],
    });
  });

  router.delete("/:userId", (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    res.status(204).send();
  })

  router.get("/", (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    const mockUser = generateMockUsers(100);

    // const users = db.clientes || [];
    // const userPlans = db.clientePlanos || [];
    // const plans = db.planos || [];

    // const usersWithPlans = users.map((user) => {
    //   const userPlanAssociations = userPlans.filter(
    //     (up) => up.clienteId === user.id
    //   );

    //   const associatedPlans = userPlanAssociations.map((upa) => {
    //     const plan = plans.find((p) => p.id === upa.planoId);
    //     return {
    //       planId: plan.id,
    //       planName: plan.nome,
    //       associationDate: upa.dataAssociacao,
    //     };
    //   });

    //   return {
    //     userId: user.id,
    //     name: user.nome,
    //     cpf: user.cpf,
    //     phone: user.telefone,
    //     email: user.email,
    //     registrationDate: user.dataCadastro,
    //     associatedPlans: associatedPlans,
    //   };
    // });

    res.json(mockUser);
  });

  return router;
};
