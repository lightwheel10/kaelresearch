import { NextResponse } from 'next/server';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { Report } from './report';

export async function GET() {
  try {
    const buffer = await renderToBuffer(<Report />);
    const uint8 = new Uint8Array(buffer);
    return new NextResponse(uint8, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Kael-Research-AI-Code-Assistant-Market-2026.pdf"',
      },
    });
  } catch (err) {
    console.error('PDF generation error:', err);
    return NextResponse.json({ error: 'Failed to generate PDF', detail: String(err) }, { status: 500 });
  }
}
