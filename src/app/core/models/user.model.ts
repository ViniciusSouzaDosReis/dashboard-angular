export type User = {
  userId: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  registrationDate: string;
  associatedPlans: {
    planId: string;
    planName: string;
    associationDate: string;
  }[];
};

export type CreateUserRequest = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
};

export type EditUserRequest = {
  userId: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
};
