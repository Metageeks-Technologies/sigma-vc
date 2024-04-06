export const dynamic = 'force-dynamic'
import Investment from "@/models/Investment";
import { connectToDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const userAddress = searchParams.get("user_address");
        connectToDb();

        const investments = await Investment.find({ investorAddress: userAddress }).populate("projectID", "name logo currentTokenPrice chain type updatedAt listingTokenPrice");

        return NextResponse.json({
            success: true,
            investments,
        });

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};