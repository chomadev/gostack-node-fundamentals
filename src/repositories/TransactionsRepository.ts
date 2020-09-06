import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private reduceTransactionsToValue(type: string): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .reduce(
        (sum: number, transaction: Transaction) => sum + transaction.value,
        0,
      );
  }

  public getBalance(): Balance {
    const income = this.reduceTransactionsToValue('income');
    const outcome = this.reduceTransactionsToValue('outcome');
    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
