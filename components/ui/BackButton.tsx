'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}
