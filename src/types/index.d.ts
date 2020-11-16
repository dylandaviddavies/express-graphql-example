export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
};

export type Quote = {
  id: number;
  authorId: number;
  text: string;
  createdAt: string;
};

export type OrderBy = {
  field: string;
  direction: string;
};

export type Transaction = {
  id: number;
  accountId: number;
  amount: number;
  createdAt: string;
};

export type Account = {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
};
