import Bank from '../models/Bankmodel.js'

export default {
    AddBank: async (req, res) => {
        try {
            // Create a new Company instance with the extracted data
            const BankData = req.body;

            const newservice = new Bank(BankData);
            // Save the new company to the database

            // Delete all previous bank data
            await Bank.deleteMany({});
            await newservice.save();

            res.status(200).json({
                success: true,
                message: "BankData added successfully.",
            });
        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to add BankData.",
                error: err.message,
            });
        }
    },
    GetAllbanks: async (req, res) => {
        try {
            const response = await Bank.find()
            if (response) {
                res.json({
                    success: true,
                    message: "getting all bank",
                    Data: response
                })
            } else {
                throw new Error(" bank not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    EditBank: async (req, res) => {
        try {
            const { id } = req.params;
            

            const Bankdata = await Bank.findById(id);
            if (!Bankdata) {

                // If the company with the given ID is not found, throw an error
                throw new Error("Bank not found.");
            }

            // Update the invoice with the new data
            await Bank.findByIdAndUpdate(
                { _id: id },
                {...req.body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Bank Edited successfully.",
            });


        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to edit Bank.",
                error: err.message,
            });
        }
    },
    DeleteBank: async (req, res) => {
        try {
          const { id } = req.params;
      
          const deletedBank = await Bank.findByIdAndRemove(id);
      
          if (!deletedBank) {
            return res.json({
              success: false,
              message: "Bank not found",
            });
          }
      
          res.json({
            success: true,
            message: "Bank deleted successfully",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      },
      
}