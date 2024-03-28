import mongoose from "mongoose";
const project = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        logo: {
            type: String,
        },
        symbol: {
            type: String,
        },
        amountToRaise: {
            type: Number,
        },
        totalTokenSupply: {
            type: Number,
        },
        minimumBuy: {
            type: Number,
        },
        maximumBuy: {
            type: Number,
        },
        vesting: {
            type: Number,
        },

        totalRaised: {
            type: Number,
            default: 0,
        },
        fundRaisedInUSDT: {
            type: Number,
            default: 0,
        },
        fundRaisedInUSDC: {
            type: Number,
            default: 0,
        },
        receiverAddress: {
            type: String,
        },
        publicKey: {
            type: String,
        },
        privateKey: {
            type: String,
        },
        status: {
            type: String,
            enum: ["NOT LAUNCHED", "PRIVATE", "LIVE", "DISTRIBUTING", "PENDING"],
            default: "PENDING",
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        chain: {
            type: String,
            enum: ["BSC", "ETH"],
            default: "BSC",
        },
        numberOfBuyer: {
            type: Number,
            default: 0,
        },
        numberOfSeller: {
            type: Number,
            default: 0,
        },
        type: {
            type: String,
            enum: ["ICO", "IDO", "SEED"],

        },
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transection",
            },
        ],
        tokenAddress: {
            type: String,
            default: "0x0x0000000000000000000000000000000000000000",
        },


    },
    { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', project);

export default Project