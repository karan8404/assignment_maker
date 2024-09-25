import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import { Buffer } from 'buffer';

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body to extract text
    const body = await req.json();
    const text: string = body.text;

    // Create a new jsPDF instance (A4 paper size)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    // Set margins and max width for the text
    const pageWidth = pdf.internal.pageSize.getWidth(); // Get the page width
    const margin = 20; // Margin from the edges
    const maxLineWidth = pageWidth - 2 * margin; // Calculate the maximum width for the text

    // Split the text into lines that fit within the maxLineWidth
    const lines = pdf.splitTextToSize(text, maxLineWidth);

    // Add the wrapped text to the PDF at position (margin, 30px)
    pdf.text(lines, margin, 30);

    // Convert the PDF to an arraybuffer
    const pdfData = pdf.output('arraybuffer');

    // Create a buffer from the arraybuffer
    const pdfBuffer = Buffer.from(pdfData);

    // Send the PDF as a response with appropriate headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="generated_text.pdf"',
      },
    });
  } catch (error) {
    // Handle errors
    return new NextResponse(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
    });
  }
}
