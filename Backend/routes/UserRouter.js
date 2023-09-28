import express from 'express'
const router=express.Router()
import usercontroller from '../controller/usercontroller.js';
import Companycontroller from '../controller/Companycontroller.js';
import ServiceController from '../controller/ServiceController.js';
import Invoicecontroller from '../controller/InvoiceController.js'
import userAuthMid from '../Middlewear/Authmiddlewear.js';
import Estimatecontrollers from '../controller/Estimatecontroller.js'
import Ledgercontroller from '../controller/Ledgercontroller.js';
import Expensecontroller from '../controller/Expensecontroller.js';
import Bankcontroller from '../controller/Bankcontroller.js';
import Termscontroller from '../controller/Termscontroller.js';

router.post('/login',usercontroller.LoginUser)
router.post('/changepassword',usercontroller.changepassword)

router.post('/company',userAuthMid,Companycontroller.Addcompany)
router.patch('/company/:id',userAuthMid,Companycontroller.EditCompany)
router.delete('/company/:id',userAuthMid,Companycontroller.DeleteCompany)
router.get('/company',userAuthMid,Companycontroller.GetAllcompany)
router.get('/currentcompany',userAuthMid,Companycontroller.Getnotdeleted)


router.post('/service',userAuthMid,ServiceController.AddService)
router.post('/service/:id',userAuthMid,ServiceController.Editservice)
router.delete('/service/:id',userAuthMid,ServiceController.Deleteservice)
router.get('/service',userAuthMid,ServiceController.GetAllservice)

router.post('/invoice',userAuthMid,Invoicecontroller.AddINVOICE)
router.get('/invoice',userAuthMid,Invoicecontroller.GetAllinvoice)
router.get('/currentinvoice',userAuthMid,Invoicecontroller.Getnotdeletedinvoice)
router.get('/invoice/:id',userAuthMid,Invoicecontroller.GetSelectedinvoice)
router.delete('/invoice/:id',userAuthMid,Invoicecontroller.Deleteinvoice)
router.patch('/invoice/:id',userAuthMid,Invoicecontroller.EditINVOICE)
router.post ('/searchinvoice',userAuthMid,Invoicecontroller.searchinvoice)
router.post ('/searchcompanyinvoice',userAuthMid,Invoicecontroller.searchcompanyinvoice)
router.post ('/searchserviceinvoice',userAuthMid,Invoicecontroller.searchserviceinvoice)



router.post('/Estimate',userAuthMid,Estimatecontrollers.AddEstimate)
router.get('/currentEstimate',userAuthMid,Estimatecontrollers.GetnotdeletedEstimate)
router.get('/selectedEstimate/:id',userAuthMid,Estimatecontrollers.GetSelectedEstimate)
router.patch('/editestimate/:id',userAuthMid,Estimatecontrollers.EditEstimate)
router.delete('/deleteestimate/:id',userAuthMid,Estimatecontrollers.Deleteestimate)
router.get('/allestimate',userAuthMid,Estimatecontrollers.GetAllEstimate)


router.post('/ledger',userAuthMid,Ledgercontroller.AddLedger)
router.get('/ledger',userAuthMid,Ledgercontroller.GetAllLedger)
router.patch('/ledger/:id',userAuthMid,Ledgercontroller.EditLedger)
router.delete('/ledger/:id',userAuthMid,Ledgercontroller.DeleteLedger)
router.get('/currentledger',userAuthMid,Ledgercontroller.GetnotdeletedLedger)

router.post('/expense',userAuthMid,Expensecontroller.AddExpense)
router.get('/expense',userAuthMid,Expensecontroller.GetAllExpense)
router.get('/currentexpense',userAuthMid,Expensecontroller.Getnotdeletedexpense)
router.delete('/expense/:id',userAuthMid,Expensecontroller.Deleteexpense)
router.get('/expense/:id',userAuthMid,Expensecontroller.GetSelectedexpense)
router.patch('/expense/:id',userAuthMid,Expensecontroller.Editexpense)


router.post('/bank',userAuthMid,Bankcontroller.AddBank)
router.get('/bank',userAuthMid,Bankcontroller.GetAllbanks)
router.patch('/bank/:id',userAuthMid,Bankcontroller.EditBank)
router.delete('/bank/:id',userAuthMid,Bankcontroller.DeleteBank)

router.post('/terms',userAuthMid,Termscontroller.AddTerms)
router.get('/terms',userAuthMid,Termscontroller.GetAllTerms)
router.delete('/terms/:id',userAuthMid,Termscontroller.DeleteTerms)
router.patch('/terms/:id',userAuthMid,Termscontroller.EditTerms)

export default router;