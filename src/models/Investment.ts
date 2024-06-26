import mongoose from "mongoose";


const investment = new mongoose.Schema(
    {
        investorAddress: {
            type: String,
        },
        investedAmount: {
            type: Number,
        },
        boughtAmount: {
            type: Number,
        },
        askAmount: {
            type: Number,
        },
        projectID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
        saleStatus: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Investment = mongoose.models.Investment || mongoose.model('Investment', investment);
export default Investment

