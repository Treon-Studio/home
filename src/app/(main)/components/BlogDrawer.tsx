'use client';

import { X } from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '~/src/components/ui/Drawer';

export type BlogData = {
  slug: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
};

export default function BlogDrawer({
  open,
  onOpenChange,
  fileName,
  blogs,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string | null;
  blogs: Record<string, BlogData>;
}) {
  const content = fileName ? blogs[fileName] : null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="min-h-[95%] max-h-[95%] lg:max-w-[75%]">
        <DrawerHeader className="relative">
          <DrawerClose className="absolute right-4 top-4 rounded-full p-1 text-text-primary/50 hover:text-text-primary transition-colors">
            <X className="h-5 w-5" />
          </DrawerClose>
          <div className="text-xs text-text-primary/50 font-mono">{fileName}</div>
          <DrawerTitle className="text-2xl">{content?.title}</DrawerTitle>
          <div className="text-sm text-text-primary/50">{content?.date}</div>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-8">
          {content && (
            <div
              className="prose prose-sm max-w-none text-text-primary"
              dangerouslySetInnerHTML={{ __html: content.contentHtml }}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
