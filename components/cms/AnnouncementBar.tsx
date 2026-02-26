import { getMockSiteSettings } from '@/lib/mock-data';
import { X } from 'lucide-react';

export function AnnouncementBar() {
  const settings = getMockSiteSettings();

  if (!settings.announcementBarEnabled) {
    return null;
  }

  return (
    <div className="bg-accent text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-sm font-medium text-center">
          {settings.announcementBarText}
        </p>
      </div>
    </div>
  );
}
