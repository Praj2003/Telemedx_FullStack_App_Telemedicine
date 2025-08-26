import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const {
      patientName,
      contactNumber,
      address,
      selectedTest,
      preferredDate,
      email,
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

    if (
      !patientName ||
      !contactNumber ||
      !address ||
      !selectedTest ||
      !preferredDate
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const booking = await prisma.labTestBooking.create({
      data: {
        patientName: patientName,
        contactNumber: contactNumber,
        address: address,
        testType: selectedTest,
        preferedDate: new Date(preferredDate),
        userEmail: existingUser.email,
      },
    });

    return NextResponse.json(
      { Message: "Labtest booking has been successfully done" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const testData = await prisma.labTestBooking.findMany({
      where: {
        userEmail: email,
      },
    });

    if (!testData) {
      return NextResponse.json(
        { message: "No lab test booking found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: testData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lab test booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email, testType } = await req.json();

    const existingRequest = await prisma.labTestBooking.findFirst({
      where: {
        userEmail: email,
        testType: testType,
      },
    });

    if (!existingRequest) {
      return NextResponse.json(
        { message: "There is no such request in the database" },
        { status: 404 }
      );
    }

    await prisma.labTestBooking.delete({
      where: {
        id: existingRequest.id,
      },
    });

    return NextResponse.json(
      { message: "Request Has been deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message:
          "There is some error while deleting the request from the database",
      },
      { status: 500 }
    );
  }
}
