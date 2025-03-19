import { User } from "./user.model";

export type PlanMetrics = {
  id: string;
  name: string;
  totalUsersInPlan: number;
  percentage: number;
  associations: {
    clientId: string;
    associationDate: string;
  }[];
};

export type Plan = {
  id: string;
  nome: string;
  preco: number;
  franquiaDados: number;
  minutosLigacao: number;
  dataCadastro: string;
};

export type CreatePlanRequest = {
  nome: string;
  preco: number;
  franquiaDados: number;
  minutosLigacao: number;
};

export type PlanAssociation = {
  id: string;
  name: string;
  items: User[]
};
