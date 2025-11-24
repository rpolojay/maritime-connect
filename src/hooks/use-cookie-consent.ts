'use client';

import { useState, useEffect } from 'react';

const CONSENT_LOCAL_STORAGE_KEY = 'cookie_consent_is_given';

type Consent = 'granted' | 'denied' | null;

export function useCookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    try {
      const storedConsent = window.localStorage.getItem(CONSENT_LOCAL_STORAGE_KEY);
      if (storedConsent === 'true') {
        setConsent('granted');
      } else if (storedConsent === 'false') {
        setConsent('denied');
      } else {
        setConsent(null);
      }
    } catch (e) {
      console.error('Could not read cookie consent from local storage', e);
      setConsent(null);
    }
  }, []);

  const giveConsent = (isGranted: boolean) => {
    try {
      window.localStorage.setItem(CONSENT_LOCAL_STORAGE_KEY, String(isGranted));
      setConsent(isGranted ? 'granted' : 'denied');
    } catch (e) {
      console.error('Could not save cookie consent to local storage', e);
    }
  };

  return {
    consent,
    giveConsent,
    isLoading: consent === null && typeof window !== 'undefined'
  };
}
