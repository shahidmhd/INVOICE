import invoice from '../models/Invoicemodel.js'
import AppError from '../utils/AppError.js';
export default {
    AddINVOICE: async (req, res) => {
        try {
            // Create a new Company instance with the extracted data
            const invoiceData = req.body;
            invoiceData.isdeleted = false
            const newservice = new invoice(invoiceData);
            // Save the new company to the database
            await newservice.save();

            res.status(200).json({
                success: true,
                message: "invoice added successfully.",
            });
        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to add invoice.",
                error: err.message,
            });
        }
    },
    GetAllinvoice: async (req, res) => {
        try {
            const response = await invoice.find().sort({ createdAt: -1 }).populate('selectedCompanyId');
            if (response) {
                res.json({
                    success: true,
                    message: "getting all invoice",
                    Data: response
                })
            } else {
                throw new Error(" invoice not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    Getnotdeletedinvoice: async (req, res) => {
        try {
            const response = await invoice.find({ isdeleted: false }).sort({ createdAt: -1 }).populate('selectedCompanyId');
            if (response) {
                res.json({
                    success: true,
                    message: "getting all invoice",
                    Data: response
                })
            } else {
                throw new Error(" invoice not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    GetSelectedinvoice: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await invoice.findById(id).populate('selectedCompanyId');
            if (response) {
                res.json({
                    success: true,
                    message: "Invoice data found",
                    Data: response
                });
            } else {
                throw new Error("Invoice not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            });
        }
    },
    Deleteinvoice: async (req, res) => {
        try {
            const { id } = req.params
            // await invoice.findByIdAndDelete({ _id: id });
            const updatedInvoice = await invoice.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
            if (!updatedInvoice) {
                return res.json({
                    success: false,
                    message: "invoice not found",
                });
            }
            res.json({
                success: true,
                message: "invoice deleted successfully",
            })
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    EditINVOICE: async (req, res) => {
        try {
            console.log(req.body,"gggg");
            const { id } = req.params;
            

            const Invoice = await invoice.findById(id);
            if (!Invoice) {

                // If the company with the given ID is not found, throw an error
                throw new Error("invoice not found.");
            }

            // Update the invoice with the new data
            await invoice.findByIdAndUpdate(
                { _id: id },
                {...req.body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "invoice Edited successfully.",
            });


        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to edit invoice.",
                error: err.message,
            });
        }
    },
    searchinvoice: async (req, res) => {
        try {
            const { startdate, enddate } = req.body;
            const filteredInvoices = await invoice.find({
                date: { $gte: startdate, $lte: enddate },
                isdeleted: false
            }).sort({ createdAt: -1 }).populate('selectedCompanyId');;
            res.json({
                success: 'true',
                message: 'data fetched successfully',
                filteredInvoices
            })
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching invoice data.' });
        }
    },
    searchcompanyinvoice: async (req, res) => {
        try {
            const { companyId } = req.body
            // Query the database for invoices that match the selectedCompanyId
            const matchingInvoices = await invoice.find({
                selectedCompanyId: companyId,
            }).sort({ createdAt: -1 }).populate('selectedCompanyId');
            res.json({
                success: 'true',
                message: 'data fetched successfully',
                matchingInvoices
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching invoice data.' });
        }
    },
    searchserviceinvoice: async (req, res) => {
        try {
            const { servicename } = req.body
            // Query the database for invoices with matching serviceName within tableRows
            const matchingInvoices = await invoice.find({
                'tableRows.serviceName': servicename,
            }).sort({ createdAt: -1 }).populate('selectedCompanyId');;
            res.json({
                success: 'true',
                message: 'data fetched successfully',
                matchingInvoices
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching invoice data.' });
        }
    }


}