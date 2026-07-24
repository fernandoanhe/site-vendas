"use client";

import { useState, useEffect } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function useUtmParams(): URLSearchParams {
  const [utmParams, setUtmParams] = useState(() => new URLSearchParams());

  useEffect(() => {
    const current = new URLSearchParams(window.location.search);
    const utm = new URLSearchParams();
    for (const key of UTM_KEYS) {
      const val = current.get(key);
      if (val) utm.set(key, val);
    }
    if (utm.toString()) setUtmParams(utm);
  }, []);

  return utmParams;
}
