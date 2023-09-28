import Terms from '../models/Termsmodel.js'

export default {
    AddTerms: async (req, res) => {
        try {
            // Create a new Company instance with the extracted data
            const TermsData = req.body;

            const newservice = new Terms(TermsData);
            // Save the new company to the database

            // Delete all previous bank data
            await Terms.deleteMany({});
            await newservice.save();

            res.status(200).json({
                success: true,
                message: "Terms&condition added successfully.",
            });
        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to add Terms&condition.",
                error: err.message,
            });
        }
    },
    GetAllTerms: async (req, res) => {
        try {
            const response = await Terms.find()
            if (response) {
                res.json({
                    success: true,
                    message: "getting all Terms",
                    Data: response
                })
            } else {
                throw new Error(" Terms not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    EditTerms: async (req, res) => {
        try {
            const { id } = req.params;
            

            const Termsdata = await Terms.findById(id);
            if (!Termsdata) {

                // If the company with the given ID is not found, throw an error
                throw new Error("Terms not found.");
            }

            // Update the invoice with the new data
            await Terms.findByIdAndUpdate(
                { _id: id },
                {...req.body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Terms Edited successfully.",
            });


        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to edit Terms.",
                error: err.message,
            });
        }
    },
    DeleteTerms: async (req, res) => {
        try {
          const { id } = req.params;
      
          const deletedTerms = await Terms.findByIdAndRemove(id);
      
          if (!deletedTerms) {
            return res.json({
              success: false,
              message: "Terms not found",
            });
          }
      
          res.json({
            success: true,
            message: "Terms deleted successfully",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      },
      
}