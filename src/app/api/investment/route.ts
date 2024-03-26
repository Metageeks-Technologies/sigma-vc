import Investment from "@/models/Investment";
import { connectToDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { projectID, investedAmount } = body;
        connectToDb();
        const existingInvestment = await Investment.findOne({ projectID });
        if (existingInvestment) {
            existingInvestment.investedAmount += investedAmount;
            await existingInvestment.save();
            return NextResponse.json({
                success: true,
                investment: existingInvestment,
            }, { status: 201 });
        } else {
            const investment = await Investment.create(body);
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