import DataLoader from "dataloader";
import AccountRepository from "../repositories/AccountKnexRepository";
import { Account } from "../types";

async function getAccountsById(ids: number[]): Promise<Account[]> {
  const accountRepository = new AccountRepository();
  const accounts = await accountRepository.getMany(ids);
  return ids.map((id) => {
    return accounts.find((account) => account.id === id);
  });
}

export default new DataLoader(getAccountsById);
