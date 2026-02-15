'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const done = searchParams.get('done');
  const email = searchParams.get('email');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(done ? 'done' : 'idle');
  const [inputEmail, setInputEmail] = useState(email || '');

  const handleUnsubscribe = async () => {
    if (!inputEmail) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail }),
      });
      if (res.ok) {
        setStatus('done');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F9FAFB',
      fontFamily: 'Arial, Helvetica, sans-serif',
      padding: '24px',
    }}>
      <div style={{
        maxWidth: 480,
        width: '100%',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: 22,
          fontWeight: 'bold',
          color: '#1B2A4A',
          letterSpacing: 0.5,
          marginBottom: 32,
        }}>
          <span style={{ color: '#C9A84C' }}>KAEL</span> RESEARCH
        </p>

        {status === 'done' ? (
          <>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 28,
              color: '#1B2A4A',
              marginBottom: 16,
            }}>
              You&apos;ve been unsubscribed
            </h1>
            <p style={{ color: '#666', fontSize: 16, lineHeight: 1.6 }}>
              Sorry to see you go. If you change your mind, you can always
              resubscribe at{' '}
              <a href="https://kaelresearch.com" style={{ color: '#C9A84C' }}>
                kaelresearch.com
              </a>.
            </p>
          </>
        ) : (
          <>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 28,
              color: '#1B2A4A',
              marginBottom: 16,
            }}>
              Unsubscribe
            </h1>
            <p style={{ color: '#666', fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
              Enter your email to unsubscribe from the Kael Research newsletter.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <input
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  padding: '10px 16px',
                  fontSize: 15,
                  border: '1px solid #E5E7EB',
                  borderRadius: 6,
                  width: 260,
                  outline: 'none',
                }}
              />
              <button
                onClick={handleUnsubscribe}
                disabled={status === 'loading'}
                style={{
                  padding: '10px 20px',
                  fontSize: 15,
                  backgroundColor: '#1B2A4A',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  opacity: status === 'loading' ? 0.6 : 1,
                }}
              >
                {status === 'loading' ? 'Processing...' : 'Unsubscribe'}
              </button>
            </div>
            {status === 'error' && (
              <p style={{ color: '#DC2626', marginTop: 12, fontSize: 14 }}>
                Something went wrong. Please try again.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FAFB',
      }}>
        <p>Loading...</p>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
