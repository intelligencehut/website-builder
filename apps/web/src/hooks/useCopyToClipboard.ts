/**
 * Hook for copying text to clipboard
 */

import { useState } from 'react';

export function useCopyToClipboard(): [
  boolean,
  (text: string) => Promise<boolean>
] {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
      
      return true;
    } catch {
      setIsCopied(false);
      return false;
    }
  };

  return [isCopied, copyToClipboard];
}