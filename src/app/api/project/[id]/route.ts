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
