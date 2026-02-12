import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://kaelresearch.com',
  'https://www.kaelresearch.com',
];

export function checkCors(req: NextRequest): NextResponse | null {
  const origin = req.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return null;
}
