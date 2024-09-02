import { Router } from 'express';
import {
    createAccount,
    getAccounts,
    getAccountByNumber,
    deleteAccountByNumber,
    updateAccountByNumber,
    removeAccountByNumber,
} from '../controller/accountController.js';

const router = Router();

router.post('/create', createAccount);
router.get('/accounts', getAccounts);
router.get('/account/:accountNumber', getAccountByNumber);
router.delete('/delete/:accountNumber', deleteAccountByNumber);
router.put('/update/:accountNumber', updateAccountByNumber);
router.put('/remove/:accountNumber', removeAccountByNumber);

export default router;
