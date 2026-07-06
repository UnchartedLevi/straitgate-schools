'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { AdmissionLink, General, School } from '@/lib/content';

type ChatMessage = {
  id: number;
  from: 'bot' | 'user';
  text: string;
};

interface ChatWidgetProps {
  general: General;
  schools: School[];
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    from: 'bot',
    text: 'Hi there! Welcome to Straitgate Schools. How can we help you today?',
  },
  {
    id: 2,
    from: 'bot',
    text: 'Ask about admissions, school fees, school locations, or visiting the campus.',
  },
];

const keywordGroups = {
  fees: ['fee', 'fees', 'tuition', 'price', 'cost', 'payment', 'pay'],
  location: ['location', 'address', 'where', 'map', 'direction', 'directions', 'located'],
  admission: ['admission', 'apply', 'application', 'form', 'register', 'enrol', 'enroll'],
  contact: ['contact', 'phone', 'number', 'call', 'whatsapp', 'email', 'mail'],
  schools: ['schools', 'campus', 'campuses', 'branches', 'section'],
  visit: ['visit', 'tour', 'appointment', 'open day', 'see the school'],
};

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s&-]/g, ' ');
}

function hasKeyword(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function schoolMatches(input: string, schools: School[]) {
  return schools.filter((school) => {
    const schoolText = normalize(`${school.name} ${school.initial} ${school.address}`);
    const schoolKeywords = ['magodo', 'magboro', 'forthright', 'college', 'high'].filter((keyword) =>
      schoolText.includes(keyword),
    );

    return schoolKeywords.some((keyword) => input.includes(keyword));
  });
}

function formatSchoolLocations(schools: School[]) {
  return schools.map((school) => `${school.name}: ${school.address}`).join('\n');
}

function formatAdmissionLinks(links: AdmissionLink[]) {
  return links.map((link) => `${link.name}: ${link.url}`).join('\n');
}

function getBotReply(message: string, general: General, schools: School[]) {
  const input = normalize(message);
  const matchedSchools = schoolMatches(input, schools);
  const targetSchools = matchedSchools.length ? matchedSchools : schools;
  const admissionLinks = general.admission_links ?? [];
  const phone = general.phone || general.whatsapp_phone || 'the admission office';

  if (hasKeyword(input, keywordGroups.fees)) {
    return `For current school fees, please contact the admission office so they can give you the correct fee details for the class and campus. You can call or WhatsApp ${phone}, or email ${general.email}.`;
  }

  if (hasKeyword(input, keywordGroups.location)) {
    return `${formatSchoolLocations(targetSchools)}\n\nYou can also check the map section on this website for directions.`;
  }

  if (hasKeyword(input, keywordGroups.admission)) {
    const links = formatAdmissionLinks(admissionLinks);
    return links
      ? `You can start an application through these admission links:\n${links}\n\nFor help choosing the right campus, contact the admission office on ${phone}.`
      : `For admissions, please contact the admission office on ${phone} or email ${general.email}.`;
  }

  if (hasKeyword(input, keywordGroups.contact)) {
    return `You can reach Straitgate Schools by phone or WhatsApp on ${phone}, or email ${general.email}.`;
  }

  if (hasKeyword(input, keywordGroups.schools)) {
    return `Our schools are:\n${schools.map((school) => school.name).join('\n')}\n\nAsk for a school's location if you want the address.`;
  }

  if (hasKeyword(input, keywordGroups.visit)) {
    return `You can arrange a visit by contacting the admission office on ${phone}. They can guide you on the best time to visit the campus.`;
  }

  return `I can help with admissions, school fees, school locations, contact details, and campus visits. For anything else, please contact the admission office on ${phone} or email ${general.email}.`;
}

export default function ChatWidget({ general, schools }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => {
      const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
      return [
        ...prev,
        { id: nextId, from: 'user', text },
        {
          id: nextId + 1,
          from: 'bot',
          text: getBotReply(text, general, schools),
        },
      ];
    });
    setDraft('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="fixed bottom-5 right-4 z-[100] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="flex h-[28rem] max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-2xl shadow-black/25 ring-1 ring-black/10">
          <div className="flex items-center justify-between gap-3 bg-primary px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">Straitgate Assistant</p>
                <p className="text-xs font-medium text-white/70">Instant guided replies</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-light px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.from === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <p
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm ${
                    message.from === 'user'
                      ? 'rounded-br-md bg-primary text-white'
                      : 'rounded-bl-md bg-white text-dark ring-1 ring-black/5'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-black/10 bg-white px-3 py-3"
          >
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type a message..."
              aria-label="Type a message"
              className="min-w-0 flex-1 rounded-full bg-light px-4 py-2.5 text-sm text-dark outline-none ring-1 ring-black/10 transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary-dark"
      >
        {open ? <XMarkIcon className="h-7 w-7" /> : <ChatBubbleLeftRightIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}
