import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      patientName,
      contactNumber,
      address,
      preferredDate,
      email,
      doctor,
      age,
      shift,
    } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    if (!patientName || !contactNumber || !address || !preferredDate) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const appointmentBooking = await prisma.appointmentBooking.create({
      data: {
        patientName: patientName,
        age: age,
        contactNumber: contactNumber,
        address: address,
        doctorAttending: doctor,
        preferedDate: new Date(preferredDate),
        userEmail: email,
        preferredShift: shift,
      },
    });

    console.log(appointmentBooking);

    return NextResponse.json(
      { Message: "Doctor Appointment booking has been successfully done" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") ?? undefined;

  try {
    const appointmentData = await prisma.appointmentBooking.findMany({
      where: {
        userEmail: email,
      },
    });

    if (!appointmentData) {
      return NextResponse.json(
        { message: "No appointment found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: appointmentData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch appointment data" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { email, doctorName } = await req.json();

  try {
    const request = await prisma.appointmentBooking.findFirst({
      where: {
        userEmail: email,
        doctorAttending: doctorName,
      },
    });

    if (!request) {
      return NextResponse.json(
        { message: "There is no such request in the database" },
        { status: 404 }
      );
    }
    await prisma.appointmentBooking.delete({
      where: {
        id: request.id,
      },
    });

    return NextResponse.json(
      { message: "Request Deleted Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed to delete the request" },
      { status: 500 }
    );
  }
}
