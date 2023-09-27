import Ledger from '../models/Ledgermodel.js'

export default {
    AddLedger: async (req, res) => {
        try {
            // Create a new Company instance with the extracted data
            const LedgerData = req.body;
            LedgerData.isdeleted = false
            const newservice = new Ledger(LedgerData);
            await newservice.save();

            res.status(200).json({
                success: true,
                message: "Ledger added successfully.",
            });
        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: err.message,
                error: err.message,
            });
        }
    },
    GetAllLedger: async (req, res) => {
        try {
            const response = await Ledger.find().sort({ createdAt: -1 })
            if (response) {
                res.json({
                    success: true,
                    message: "getting all Ledger",
                    Data: response
                })
            } else {
                throw new Error(" Ledger not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    EditLedger: async (req, res) => {
        try {
            const { id } = req.params;
            const {Name,balance,type} = req.body;

            // Find the company with the given ID
            const company = await Ledger.findById(id);

            if (!company) {
                // If the company with the given ID is not found, throw an error
                throw new Error("Ledger not found.");
            }

            // Check if the 'id' and 'company._id' match
            const existingLedger = await Ledger.findOne({ Name: Name });
            if (existingLedger && Name !== existingLedger.Name.toString()) {
                throw new AppError('Ledger name already exist', 403)
            }
            // Update the company with the new data
            await Ledger.findByIdAndUpdate(
                { _id: id },
                {Name,balance,type, isdeleted: false },
                { new: true }
            );

            res.json({
                success: true,
                message: "Ledger edited successfully.",
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    DeleteLedger: async (req, res) => {
        try {
            const { id } = req.params

            const updatedLedger = await Ledger.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
            if (!updatedLedger) {
                return res.json({
                    success: false,
                    message: "Ledger not found",
                });
            }

            res.json({
                success: true,
                message: "Ledger deleted successfully",
            })
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    GetnotdeletedLedger: async (req, res) => {
        try {
            const response = await Ledger.find({ isdeleted: false }).sort({ createdAt: -1 });
            if (response) {
                res.json({
                    success: true,
                    message: "getting all Ledger",
                    Data: response
                })
            } else {
                throw new Error(" Ledger not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },

}