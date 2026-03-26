'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getImageSrc: (page: number) => string;
  getImageAlt: (page: number) => string;
}

export function ImageViewerModal({
  isOpen,
  onClose,
  currentPage,
  totalPages,
  onPageChange,
  getImageSrc,
  getImageAlt,
}: ImageViewerModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'ArrowLeft' && currentPage > 1) {
        onPageChange(currentPage - 1);
      } else if (event.key === 'ArrowRight' && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, totalPages, onPageChange, onClose]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-[95vw] w-[95vw] max-h-[95vh] p-4 sm:p-6'>
        <DialogTitle className='sr-only'>
          {getImageAlt(currentPage)}
        </DialogTitle>
        <DialogDescription className='sr-only'>
          Magazine page {currentPage} of {totalPages}
        </DialogDescription>

        {/* Navigation Header */}
        <div className='flex items-center justify-between mb-4 px-2'>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            <ChevronLeft className='w-4 h-4' />
            Previous
          </button>

          <div className='text-center'>
            <h3 className='text-lg font-semibold text-text-primary'>
              Page {currentPage} of {totalPages}
            </h3>
          </div>

          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className='flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            Next
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>

        {/* Full Size Image */}
        <div className='flex justify-center items-center'>
          <div className='relative max-w-full max-h-[75vh]'>
            <Image
              src={getImageSrc(currentPage)}
              alt={getImageAlt(currentPage)}
              width={1200}
              height={1600}
              className='max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg'
              priority
            />
          </div>
        </div>

        {/* Keyboard Navigation Hint */}
        <div className='text-center text-xs text-secondary mt-4'>
          Use ← → arrow keys to navigate between pages • Press ESC to close
        </div>
      </DialogContent>
    </Dialog>
  );
}
