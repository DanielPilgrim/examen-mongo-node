import Account from '../models/account.js';
import bcrypt from 'bcryptjs';

export async function createAccount(req, res) {
    try {
        const { document, balance, key, observation } = req.body;

        const account = new Account({
            document: document || null, 
            balance: balance || 0, 
            key: await bcrypt.hash(key, 6),
            observation: observation || '',
            estado: 'activo'  
        });

        await account.save();
        res.status(201).json({ msg: 'Account created successfully', account });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.send(accounts);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAccountByNumber = async (req, res) => {
    try {
        const account = await Account.findOne({ accountNumber: req.params.accountNumber });
        if (!account) return res.status(404).send('Account not found');
        res.send(account);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteAccountByNumber = async (req, res) => {
    try {
        const account = await Account.findOneAndDelete({ accountNumber: req.params.accountNumber });
        if (!account) return res.status(404).send('Account not found');
        if (account.balance != 0) return res.status(400).send('The account balance must be 0 to delete');
        res.send('Account deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateAccountByNumber = async (req, res) => {
    const { balance } = req.body;
    try {
        const account = await Account.findOne({ accountNumber: req.params.accountNumber });
        if (!account) return res.status(404).send('Account not found');
        if (balance < 0) return res.status(400).send('The balance cannot be negative');

        account.balance += balance;
        await account.save();
        res.send(account);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const removeAccountByNumber = async (req, res) => {
    const { balance } = req.body;
    try {
        const account = await Account.findOne({ accountNumber: req.params.accountNumber });
        if (!account) return res.status(404).send('Account not found');
        if (balance > account.balance) return res.status(400).send('The amount to remove cannot be greater than the balance');

        account.balance -= balance;
        await account.save();
        res.send(account);
    } catch (error) {
        res.status(400).send(error);
    }
};
