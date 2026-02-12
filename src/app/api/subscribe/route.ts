import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from '@/lib/email';
import { isRateLimited } from '@/lib/rate-limit';
import { isValidEmail } from '@/lib/validation';
import { checkCors } from '@/lib/cors';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const corsErr = checkCors(req);
    if (corsErr) return corsErr;

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { email } = await req.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', cleanEmail)
      .single();

    if (existing) {
      return NextResponse.json({ success: true, existing: true });
    }

    const { error } = await supabase
      .from('waitlist')
      .insert({ email: cleanEmail });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save email' }, { status: 500 });
    }

    // Send welcome email before returning (Vercel kills the function after response)
    try {
      await sendWelcomeEmail(cleanEmail);
    } catch (err) {
      console.error('Failed to send welcome email:', err);
      // Don't fail the request if email fails — waitlist entry is saved
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
