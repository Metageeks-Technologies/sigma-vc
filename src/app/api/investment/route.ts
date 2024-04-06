import Investment from "@/models/Investment";
import { connectToDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Project from "@/models/Projects";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { projectID, investedAmount, symbolType, investorAddress, boughtAmount } = body;

        console.log(boughtAmount)

        connectToDb();
        const existingInvestment = await Investment.findOne({ projectID, investorAddress });
        if (existingInvestment) {
            existingInvestment.investedAmount += investedAmount;
            await existingInvestment.save();

            const project = await Project.findById(projectID);
            console.log(project);

            project.totalRaised += investedAmount;
            if (symbolType === "USDT") {
                project.fundRaisedInUSDT += investedAmount;
            } else project.fundRaisedInUSDC += investedAmount;

            await project.save();

            return NextResponse.json({
                success: true,
                investment: existingInvestment,
            }, { status: 201 });
        } else {
            const investment = await Investment.create({ projectID, investedAmount, investorAddress, boughtAmount });
            const project = await Project.findById(projectID);
            // console.log(project);
            project.numberOfBuyer += 1;
            project.totalRaised += investedAmount;
            if (symbolType === "USDT") {
                project.fundRaisedInUSDT += investedAmount;
            } else project.fundRaisedInUSDC += investedAmount;

            await project.save();


            return NextResponse.json({
                success: true,
                investment: investment,
            }, { status: 201 });
        }

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { investorAddress, projectID, saleStatus, askAmount, accountAddress, projectCurrentPrice, boughtAmount } = body;

        console.log(investorAddress, projectID, saleStatus, askAmount, projectCurrentPrice);
        connectToDb();
        const investment = await Investment.findOneAndUpdate({ projectID, investorAddress }, { investorAddress: accountAddress, saleStatus, askAmount, boughtAmount });
        const project = await Project.findOne({ _id: projectID });

        if (project && project.currentTokenPrice < projectCurrentPrice) {
            project.currentTokenPrice = projectCurrentPrice;
            await project.save();
        }

        if (!investment || !project) {
            throw new Error("No investment found!");
        }

        return NextResponse.json({
            success: true,
            investment: investment,
        }, { status: 200 });

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};