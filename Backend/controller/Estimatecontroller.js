import Estimate from '../models/Estimatemodel.js'
import AppError from '../utils/AppError.js';
export default {
    AddEstimate: async (req, res) => {
        try {
            // Create a new Company instance with the extracted data
            const EstimateData = req.body;
            EstimateData.isdeleted = false
            const newservice = new Estimate(EstimateData);
            await newservice.save();

            res.status(200).json({
                success: true,
                message: "Estimate added successfully.",
            });
        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to add Estimate.",
                error: err.message,
            });
        }
    },
    GetnotdeletedEstimate: async (req, res) => {
        try {
            const response = await Estimate.find({ isdeleted: false }).sort({ createdAt: -1 }).populate('selectedCompanyId');
            if (response) {
                res.json({
                    success: true,
                    message: "getting all Estimate",
                    Data: response
                })
            } else {
                throw new Error(" Estimate not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    GetSelectedEstimate: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await Estimate.findById(id).populate('selectedCompanyId');
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
    EditEstimate: async (req, res) => {
        try {
            const { id } = req.params;
            

            const Invoice = await Estimate.findById(id);
            if (!Invoice) {

                // If the company with the given ID is not found, throw an error
                throw new Error("Estimate not found.");
            }

            // Update the invoice with the new data
            await Estimate.findByIdAndUpdate(
                { _id: id },
                {...req.body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Estimate Edited successfully.",
            });


        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to edit Estimate.",
                error: err.message,
            });
        }
    },
    Deleteestimate: async (req, res) => {
        try {
            const { id } = req.params
            // await invoice.findByIdAndDelete({ _id: id });
            const updatedInvoice = await Estimate.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
            if (!updatedInvoice) {
                return res.json({
                    success: false,
                    message: "Estimate not found",
                });
            }
            res.json({
                success: true,
                message: "Estimate deleted successfully",
            })
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },


}