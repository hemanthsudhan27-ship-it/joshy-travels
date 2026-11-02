import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, service, travelDates, travelersCount, message } = body;

    // Basic validation
    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required fields." },
        { status: 400 }
      );
    }

    // Generate unique reference number
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `JJ-${timestamp}-${random}`;

    // Log the enquiry on the server console (will connect to Prisma in Phase 4)
    console.log(`[ENQUIRY RECEIVED] Ref: ${referenceId}`, {
      fullName,
      phone,
      email,
      service,
      travelDates,
      travelersCount,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: "Enquiry successfully recorded. A travel coordinator will be in touch shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ENQUIRY ERROR]", error);
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again or reach out directly on WhatsApp." },
      { status: 500 }
    );
  }
}

