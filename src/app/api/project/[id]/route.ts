import Project from "@/models/Projects";
import { connectToDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import type { NextRequest, } from "next/server";

type Params = {
    [key: string]: string;
};


export const GET = async (request: NextRequest, { params }: Params) => {
    try {
        console.log(params);

        connectToDb();
        // const posts = await Project.findById();
        return NextResponse.json(params);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};
