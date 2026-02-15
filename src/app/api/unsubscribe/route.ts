import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    const { error } = await supabase
      .from('waitlist')
      .delete()
      .eq('email', cleanEmail);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  const cleanEmail = email.toLowerCase().trim();

  const { error } = await supabase
    .from('waitlist')
    .delete()
    .eq('email', cleanEmail);

  if (error) {
    console.error('Supabase delete error:', error);
  }

  // Redirect to unsubscribe confirmation page
  return NextResponse.redirect(new URL('/unsubscribe?done=1', req.url));
}
