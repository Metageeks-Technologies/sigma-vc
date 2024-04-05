export const dynamic = 'force-dynamic'
import Investment from "@/models/Investment";
import { connectToDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const userAddress = searchParams.get("user_address");
        const projectId = searchParams.get("project_id");

        connectToDb();

        const investment = await Investment.findOne({ investorAddress: userAddress, projectID: projectId });

        return NextResponse.json({
            success: true,
            investment,
        });

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};