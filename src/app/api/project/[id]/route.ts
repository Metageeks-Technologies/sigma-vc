import Project from "@/models/Projects";
import { connectToDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import type { NextRequest, } from "next/server";

type Params = {
    [key: string]: {
        id: string
    };
};


export const GET = async (request: NextRequest, { params }: Params) => {
    try {
        console.log(params.id);

        connectToDb();
        // const post = await Project.findById(params);
        return NextResponse.json(params.id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const PATCH = async (request: NextRequest, { params }: Params) => {
    try {
        const body = await request.json();

        connectToDb();
        const project = await Project.findByIdAndUpdate(params.id, body, { new: true });

        return NextResponse.json({
            success: true,
            investment: project,
        }, { status: 200 });

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};
