import Project from "@/models/Projects";
import { connectToDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const query = (status === "ALL" || !status) ? {} : { status };
        console.log(status, query);
        connectToDb();
        const projects = await Project.find(query);
        return NextResponse.json({
            success: true,
            projects,
        });
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const POST = async (request: NextRequest) => {
    try {

        const body = await request.json()
        connectToDb();
        const project = await Project.create(body);
        return NextResponse.json({
            success: true,
            project: project,
        }, { status: 201 });
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};