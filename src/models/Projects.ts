import mongoose from "mongoose";
const project = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        uuid: {
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
        currentTokenPrice: {
            type: Number,
        },
        listingTokenPrice: {
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
            enum: ["NOT LAUNCHED", "PRIVATE", "LIVE", "DISTRIBUTING"],
            default: "NOT LAUNCHED",
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
        overview: {
            type: String,
        },
        partners: [
            {
                name: { type: String, required: true },
                logo: { type: String, required: true }
            }
        ],
        socialMedia: [
            {
                platform: { type: String, required: true },
                link: { type: String, required: true }
            }
        ],
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