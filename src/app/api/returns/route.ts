export const dynamic = 'force-dynamic'
import Project from "@/models/Projects";
import Investment from "@/models/Investment";
import { connectToDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get("project_id");
        connectToDb();

        const project = await Project.findById(projectId);

        const result = await Investment.aggregate([
            { $match: { projectID: new mongoose.Types.ObjectId(projectId || "") } },
            {
                $group: {
                    _id: "$investorAddress",
                    totalInvestment: { $sum: "$investedAmount" }
                }
            }
        ]);

        // onsole.log(result);


        return NextResponse.json({
            statusCode: 200,
            projectID: projectId,
            investments: result.map(item => ({ address: item._id, amount: (((project.totalTokenSupply / project.amountToRaise) * item.totalInvestment)).toFixed(4) }))
        });

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};
