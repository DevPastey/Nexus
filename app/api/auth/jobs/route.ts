import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const session = await auth()

    if(!session?.user || !session?.user.id ) {
        return NextResponse.redirect(new URL("/auth/signin", req.url))
    }


    try {
        const data = await req.json()

        const job = await prisma.job.create({
            data: {
                ...data,
                postedById: session.user.id
            }
        })
        console.log(job)
        return NextResponse.json(job)
    } catch (error) {
        console.error("Erro creating job:", error);
        return new NextResponse("Internal server error", {status: 500})
    }
}