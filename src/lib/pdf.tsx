import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { Report } from '@/app/api/pdf/report';

export async function generatePdfBuffer(): Promise<Buffer> {
  const buffer = await renderToBuffer(<Report />);
  return Buffer.from(buffer);
}
