import { MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function WhatsAppFloat() {
  return (
    <a
      href={COMPANY.whatsappGeneralUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nexera Smart on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
      style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  );
}
