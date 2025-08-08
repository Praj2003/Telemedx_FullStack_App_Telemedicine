import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    const count = await prisma.user.count();
    const appointments = await prisma.appointmentBooking.count();
    const labtests = await prisma.labTestBooking.count();

    return NextResponse.json({ users, count,appointments,labtests });
    
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      {
        status: 500,
      }
    );
  }
}
