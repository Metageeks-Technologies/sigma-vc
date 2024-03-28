import Investment from "@/models/Investment";
import { connectToDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Project from "@/models/Projects";
import type { NextRequest } from "next/server";

type Params = {
    [key: string]: {
        id: string
    };
};

export const PATCH = async (request: NextRequest, { params }: Params) => {
    try {
        const body = await request.json();
        const { askAmount } = body;

        connectToDb();
        const investment = await Investment.findOneAndUpdate({ projectID: params.id }, { askAmount, saleStatus: true }, { new: true });
        const project = await Project.findById(params.id);
        project.numberOfSeller += 1;
        await project.save();

        return NextResponse.json({
            success: true,
            investment: investment,
        }, { status: 200 });

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const GET = async (request: NextRequest, { params }: Params) => {
    try {

        connectToDb();
        const investment = await Investment.find({ saleStatus: true, projectID: params.id });

        return NextResponse.json({
            success: true,
            investment: investment,
        }, { status: 200 });

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};
