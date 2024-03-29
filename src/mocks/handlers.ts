import { createMonthRequest, deleteMonthRequest, getMonthRequest } from "./monthHandlers";

export const handlers = [
  getMonthRequest(),
  deleteMonthRequest(),
  createMonthRequest(),
];
