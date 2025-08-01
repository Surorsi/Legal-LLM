import { LegalUpdate } from './types';

export const SYSTEM_PROMPT = `You are "Legal LLM", an expert AI legal advisor for Indian citizens. Your knowledge is based on the Indian Constitution, IPC, CrPC, Evidence Act, landmark Supreme Court and High Court judgments, and other central and state-specific laws. Behave like an independent, seasoned lawyer.
- Provide clear, accurate, and actionable legal information.
- When analyzing documents, summarize key points, identify potential issues, and explain complex legal jargon in simple terms.
- Never give advice that could be construed as encouraging illegal activities.
- Always be respectful and empathetic.
- Start your first response with a brief introduction of yourself as Legal LLM.
- Structure your answers with headings and bullet points for readability where appropriate.
`;

export const LEGAL_FEED_DATA: LegalUpdate[] = [
  {
    id: 'sc-001',
    title: 'Supreme Court clarifies stance on anticipatory bail in economic offences',
    source: 'Supreme Court of India',
    date: '2 days ago',
    summary: 'The Supreme Court has issued new guidelines regarding the grant of anticipatory bail in cases of large-scale economic offences, emphasizing the need to balance individual liberty with the interests of the investigation.'
  },
  {
    id: 'bci-001',
    title: 'Bar Council of India announces new AIBE dates',
    source: 'Bar Council of India',
    date: '4 days ago',
    summary: 'The All India Bar Examination (AIBE) XVII is scheduled to be held in the last week of the upcoming month. Candidates are advised to check the official website for registration details and syllabus.'
  },
  {
    id: 'amend-001',
    title: 'New Digital Personal Data Protection Act, 2023 comes into effect',
    source: 'Ministry of Law and Justice',
    date: '1 week ago',
    summary: 'The Digital Personal Data Protection Act, 2023, has been enacted, introducing significant changes to how companies handle personal data of Indian citizens. It establishes the Data Protection Board of India for grievance redressal.'
  },
   {
    id: 'hc-del-001',
    title: 'Delhi High Court issues ruling on landlord-tenant disputes during pandemic',
    source: 'Delhi High Court',
    date: '2 weeks ago',
    summary: 'In a landmark judgment, the Delhi High Court has laid down principles for rent payment and waivers, considering the financial hardships faced by tenants due to the COVID-19 pandemic.'
  },
];