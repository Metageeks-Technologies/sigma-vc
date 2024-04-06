import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;


export const POST = async (request: NextRequest) => {
    const s3Client = new S3Client({
        region: region || "",
        credentials: {
            accessKeyId: accessKeyId || "",
            secretAccessKey: secretAccessKey || "",
        },
    });
    const body = await request.json()
    const { uuid, fileName } = body;
    const s3key = `logos/${uuid}-${fileName}`
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: s3key,
    });
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return NextResponse.json({
        success: true,
        url: signedUrl,
        s3key
    });
};