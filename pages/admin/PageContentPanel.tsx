import { useState, useEffect } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { getDocument, setDocument } from '../../lib/firebase';

type FieldType = 'text' | 'textarea' | 'image_url';

interface Field {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  rows?: number;
}

interface Section {
  title: string;
  fields: Field[];
}

interface PageConfig {
  id: string;
  label: string;
  sections: Section[];
  defaults: Record<string, string>;
}

const hero = (
  title: string,
  subtitle: string,
  description: string,
  bg_image: string,
): Section => ({
  title: 'Hero Section',
  fields: [
    { key: 'hero_title', label: 'Title', type: 'text', placeholder: title },
    { key: 'hero_subtitle', label: 'Subtitle Badge', type: 'text', placeholder: subtitle },
    { key: 'hero_description', label: 'Description', type: 'textarea', rows: 2, placeholder: description },
    { key: 'hero_bg_image', label: 'Background Image URL', type: 'image_url', placeholder: bg_image },
  ],
});

const heroDefs = (title: string, subtitle: string, description: string, bg_image: string) => ({
  hero_title: title,
  hero_subtitle: subtitle,
  hero_description: description,
  hero_bg_image: bg_image,
});

const PAGES: PageConfig[] = [
  {
    id: 'home',
    label: 'Home',
    sections: [
      hero(
        'Dominion Faith International Ministry',
        'Welcome to DFIM',
        'Join a community of faith-filled believers growing in purpose, power, and dominion.',
        'https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      {
        title: "Pastor's Welcome",
        fields: [
          { key: 'welcome_pastor_name', label: 'Pastor Name', type: 'text', placeholder: 'Pst. Dr. Paul C. Igwe' },
          { key: 'welcome_pastor_title', label: 'Pastor Title', type: 'text', placeholder: 'General Overseer' },
          { key: 'welcome_pastor_image', label: 'Pastor Photo URL', type: 'image_url' },
          { key: 'welcome_p1', label: 'Paragraph 1', type: 'textarea', rows: 3 },
          { key: 'welcome_p2', label: 'Paragraph 2', type: 'textarea', rows: 3 },
          { key: 'welcome_p3', label: 'Paragraph 3', type: 'textarea', rows: 3 },
          { key: 'welcome_scripture', label: 'Scripture Quote', type: 'textarea', rows: 2 },
        ],
      },
      {
        title: 'Statistics',
        fields: [
          { key: 'stat_years', label: 'Years of Ministry', type: 'text', placeholder: '20+' },
          { key: 'stat_locations', label: 'Church Locations', type: 'text', placeholder: '5+' },
          { key: 'stat_lives', label: 'Lives Transformed', type: 'text', placeholder: '1000s' },
          { key: 'stat_ministers', label: 'Ministers Raised', type: 'text', placeholder: '50+' },
        ],
      },
      {
        title: 'Service Times',
        fields: [
          { key: 'svc1_label', label: 'Service 1 — Label', type: 'text', placeholder: '1st Service' },
          { key: 'svc1_day', label: 'Service 1 — Day', type: 'text', placeholder: 'Sunday' },
          { key: 'svc1_time', label: 'Service 1 — Time', type: 'text', placeholder: '7:00 AM – 9:00 AM' },
          { key: 'svc2_label', label: 'Service 2 — Label', type: 'text', placeholder: '2nd Service' },
          { key: 'svc2_day', label: 'Service 2 — Day', type: 'text', placeholder: 'Sunday' },
          { key: 'svc2_time', label: 'Service 2 — Time', type: 'text', placeholder: '10:00 AM – 12:30 PM' },
          { key: 'svc3_label', label: 'Service 3 — Label', type: 'text', placeholder: 'Midweek Service' },
          { key: 'svc3_day', label: 'Service 3 — Day', type: 'text', placeholder: 'Wednesday' },
          { key: 'svc3_time', label: 'Service 3 — Time', type: 'text', placeholder: '5:00 PM – 7:00 PM' },
          { key: 'svc4_label', label: 'Service 4 — Label', type: 'text', placeholder: 'Prayer & Power Night' },
          { key: 'svc4_day', label: 'Service 4 — Day', type: 'text', placeholder: 'Friday' },
          { key: 'svc4_time', label: 'Service 4 — Time', type: 'text', placeholder: '5:00 PM – 7:00 PM' },
        ],
      },
      {
        title: 'Address & CTA',
        fields: [
          { key: 'main_address', label: 'Main Address Line 1', type: 'text', placeholder: '1 Dominion Avenue, Onireke' },
          { key: 'main_address_sub', label: 'Main Address Line 2', type: 'text', placeholder: 'Opposite Ojo Military Cantonment, Lagos, Nigeria' },
          { key: 'cta_title', label: 'CTA Heading', type: 'text', placeholder: 'Ready to Begin Your Champion Journey?' },
          { key: 'cta_description', label: 'CTA Description', type: 'textarea', rows: 2 },
        ],
      },
    ],
    defaults: {
      ...heroDefs(
        'Dominion Faith International Ministry',
        'Welcome to DFIM',
        'Join a community of faith-filled believers growing in purpose, power, and dominion.',
        'https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      welcome_pastor_name: 'Pst. Dr. Paul C. Igwe',
      welcome_pastor_title: 'General Overseer',
      welcome_pastor_image: 'https://images.pexels.com/photos/8468/church-faith-religion-photography.jpg?auto=compress&cs=tinysrgb&w=800',
      welcome_p1: 'Welcome to Dominion Faith International Ministry — a place built on the unshakeable Word of God and the transforming power of the Holy Spirit.',
      welcome_p2: 'For over two decades, we have been committed to raising believers who do not just survive life but dominate it. Champions are not born — they are made. And God has called each one of you for greatness.',
      welcome_p3: 'Whether you are joining us for the first time or you have been a part of this family for years, I want you to know that there is a place for you here. Our doors are open, our hearts are wide, and heaven is backing us.',
      welcome_scripture: '"For God has not given us a spirit of fear, but of power and of love and of a sound mind." — 2 Timothy 1:7',
      stat_years: '20+',
      stat_locations: '5+',
      stat_lives: '1000s',
      stat_ministers: '50+',
      svc1_label: '1st Service', svc1_day: 'Sunday', svc1_time: '7:00 AM – 9:00 AM',
      svc2_label: '2nd Service', svc2_day: 'Sunday', svc2_time: '10:00 AM – 12:30 PM',
      svc3_label: 'Midweek Service', svc3_day: 'Wednesday', svc3_time: '5:00 PM – 7:00 PM',
      svc4_label: 'Prayer & Power Night', svc4_day: 'Friday', svc4_time: '5:00 PM – 7:00 PM',
      main_address: '1 Dominion Avenue, Onireke',
      main_address_sub: 'Opposite Ojo Military Cantonment, Lagos, Nigeria',
      cta_title: 'Ready to Begin Your Champion Journey?',
      cta_description: 'Take the first step. Visit us, connect with a House Fellowship, or reach out — we would love to walk this journey with you.',
    },
  },
  {
    id: 'about',
    label: 'About',
    sections: [
      hero(
        'Our Story',
        'About DFIM',
        'Over two decades of raising champions in faith, purpose, and Kingdom dominion.',
        'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      {
        title: 'Our Story',
        fields: [
          { key: 'story_title', label: 'Section Title', type: 'text', placeholder: 'Building a Church That Transforms Nations' },
          { key: 'story_p1', label: 'Paragraph 1', type: 'textarea', rows: 3 },
          { key: 'story_p2', label: 'Paragraph 2', type: 'textarea', rows: 3 },
          { key: 'story_p3', label: 'Paragraph 3', type: 'textarea', rows: 3 },
          { key: 'story_tagline', label: 'Tagline Quote', type: 'text', placeholder: 'A Place Where Champions Are Made.' },
          { key: 'story_image', label: 'Section Image URL', type: 'image_url' },
          { key: 'story_years', label: 'Years Badge Text', type: 'text', placeholder: '20+' },
        ],
      },
    ],
    defaults: {
      ...heroDefs(
        'Our Story',
        'About DFIM',
        'Over two decades of raising champions in faith, purpose, and Kingdom dominion.',
        'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      story_title: 'Building a Church That Transforms Nations',
      story_p1: 'Dominion Faith International Ministry (DFIM) was founded over two decades ago with a simple but powerful mandate: to raise a generation of believers who walk in their God-given dominion, unapologetically advancing the Kingdom of God wherever they go.',
      story_p2: 'From a small gathering of faith-hungry believers in Port Harcourt, Rivers State, DFIM has grown into a thriving multi-branch ministry with a presence across Nigeria. Our growth is not measured in numbers alone, but in the transformation of lives — families restored, destinies discovered, and communities impacted.',
      story_p3: 'We are a Word-based, Spirit-led, faith-driven church. Every service, every program, and every initiative is undergirded by the conviction that the Church of Jesus Christ is the most powerful institution on earth.',
      story_tagline: 'A Place Where Champions Are Made.',
      story_image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800',
      story_years: '20+',
    },
  },
  {
    id: 'vision',
    label: 'Vision & Mission',
    sections: [
      hero(
        'Vision & Mission',
        'Why We Exist',
        'Our direction is clear, our mandate is divine, and our purpose is eternal.',
        'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      {
        title: 'Our Vision',
        fields: [
          { key: 'vision_heading', label: 'Section Heading', type: 'text', placeholder: 'Raising a Generation of Champions' },
          { key: 'vision_statement', label: 'Vision Statement (blockquote)', type: 'textarea', rows: 3 },
          { key: 'vision_description', label: 'Supporting Description', type: 'textarea', rows: 3 },
        ],
      },
      {
        title: 'Our Mission',
        fields: [
          { key: 'mission_heading', label: 'Section Heading', type: 'text', placeholder: 'How We Are Doing It' },
          { key: 'mission_statement', label: 'Mission Statement (blockquote)', type: 'textarea', rows: 3 },
          { key: 'mission_description', label: 'Supporting Description', type: 'textarea', rows: 3 },
          { key: 'mission_image', label: 'Section Image URL', type: 'image_url' },
        ],
      },
    ],
    defaults: {
      ...heroDefs(
        'Vision & Mission',
        'Why We Exist',
        'Our direction is clear, our mandate is divine, and our purpose is eternal.',
        'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      vision_heading: 'Raising a Generation of Champions',
      vision_statement: 'To raise a generation of champions — men and women who walk in the fullness of their God-given dominion and advance the Kingdom of God across every sphere of society.',
      vision_description: 'We see a church that goes beyond the four walls — a community of empowered believers transforming their homes, workplaces, cities, and nations. We see champions in every boardroom, classroom, hospital ward, and government house.',
      mission_heading: 'How We Are Doing It',
      mission_statement: 'To preach the undiluted Word of God, make disciples, build lives, and release believers into their kingdom assignments — locally and globally.',
      mission_description: 'We accomplish our mission through dynamic worship services, intentional discipleship, the School of Ministry, House Care Fellowships, and strategic community outreach. Every program and initiative is laser-focused on transforming lives.',
      mission_image: 'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
  {
    id: 'leadership',
    label: 'Leadership',
    sections: [
      hero(
        'Leadership Team',
        'Our Shepherds',
        'Called, equipped, and sent — our leaders are committed to serving God and His people with excellence.',
        'https://images.pexels.com/photos/2774546/pexels-photo-2774546.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      {
        title: 'General Overseer',
        fields: [
          { key: 'go_name', label: 'Full Name', type: 'text', placeholder: 'Pst. Dr. Paul C. Igwe' },
          { key: 'go_title', label: 'Title', type: 'text', placeholder: 'General Overseer & Founder' },
          { key: 'go_image', label: 'Photo URL', type: 'image_url' },
          { key: 'go_scripture_focus', label: 'Scripture Focus', type: 'text', placeholder: 'Ephesians 4:11-12' },
          { key: 'go_bio1', label: 'Bio Paragraph 1', type: 'textarea', rows: 3 },
          { key: 'go_bio2', label: 'Bio Paragraph 2', type: 'textarea', rows: 3 },
          { key: 'go_bio3', label: 'Bio Paragraph 3', type: 'textarea', rows: 3 },
          { key: 'go_quote', label: 'Personal Quote', type: 'textarea', rows: 2 },
        ],
      },
    ],
    defaults: {
      ...heroDefs(
        'Leadership Team',
        'Our Shepherds',
        'Called, equipped, and sent — our leaders are committed to serving God and His people with excellence.',
        'https://images.pexels.com/photos/2774546/pexels-photo-2774546.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      go_name: 'Pst. Dr. Paul C. Igwe',
      go_title: 'General Overseer & Founder',
      go_image: 'https://images.pexels.com/photos/8468/church-faith-religion-photography.jpg?auto=compress&cs=tinysrgb&w=800',
      go_scripture_focus: 'Ephesians 4:11-12',
      go_bio1: 'Pst. Dr. Paul C. Igwe is the visionary founder and General Overseer of Dominion Faith International Ministry. Called into ministry over two decades ago, he has dedicated his life to raising champions — believers who walk in the fullness of their God-given authority.',
      go_bio2: 'A prolific teacher of the Word, Pst. Dr. Igwe has ministered across Nigeria and beyond, igniting revival fires and building generational foundations wherever he goes. His ministry is characterized by deep biblical teaching, prophetic accuracy, and a genuine passion for discipleship.',
      go_bio3: 'He is a loving husband and father, and together with his wife, they lead the DFIM family with grace, wisdom, and uncommon dedication.',
      go_quote: 'The Church is the most powerful institution on earth. We are here to prove it, one champion at a time.',
    },
  },
  {
    id: 'give',
    label: 'Give',
    sections: [
      hero(
        'Give Online',
        'Kingdom Giving',
        'Every gift you sow is an investment in the Kingdom of God. Thank you for your faithfulness.',
        'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      {
        title: 'Scripture Banner',
        fields: [
          { key: 'give_scripture', label: 'Scripture Text', type: 'textarea', rows: 2 },
          { key: 'give_scripture_ref', label: 'Scripture Reference', type: 'text', placeholder: 'Luke 6:38' },
        ],
      },
      {
        title: 'Bank Account 1',
        fields: [
          { key: 'bank1_name', label: 'Bank Name', type: 'text', placeholder: 'First Bank Nigeria' },
          { key: 'bank1_account_name', label: 'Account Name', type: 'text', placeholder: 'Dominion Faith Intl Ministry' },
          { key: 'bank1_account_number', label: 'Account Number', type: 'text', placeholder: '1234567890' },
        ],
      },
      {
        title: 'Bank Account 2',
        fields: [
          { key: 'bank2_name', label: 'Bank Name', type: 'text', placeholder: 'Access Bank' },
          { key: 'bank2_account_name', label: 'Account Name', type: 'text', placeholder: 'Dominion Faith Intl Ministry' },
          { key: 'bank2_account_number', label: 'Account Number', type: 'text', placeholder: '0987654321' },
        ],
      },
      {
        title: 'Bank Account 3',
        fields: [
          { key: 'bank3_name', label: 'Bank Name', type: 'text', placeholder: 'GTBank' },
          { key: 'bank3_account_name', label: 'Account Name', type: 'text', placeholder: 'DFIM Missions Fund' },
          { key: 'bank3_account_number', label: 'Account Number', type: 'text', placeholder: '1122334455' },
        ],
      },
    ],
    defaults: {
      ...heroDefs(
        'Give Online',
        'Kingdom Giving',
        'Every gift you sow is an investment in the Kingdom of God. Thank you for your faithfulness.',
        'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      give_scripture: '"Give, and it shall be given to you: good measure, pressed down, shaken together, and running over..."',
      give_scripture_ref: 'Luke 6:38',
      bank1_name: 'First Bank Nigeria',
      bank1_account_name: 'Dominion Faith Intl Ministry',
      bank1_account_number: '1234567890',
      bank2_name: 'Access Bank',
      bank2_account_name: 'Dominion Faith Intl Ministry',
      bank2_account_number: '0987654321',
      bank3_name: 'GTBank',
      bank3_account_name: 'DFIM Missions Fund',
      bank3_account_number: '1122334455',
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    sections: [
      hero(
        'Contact Us',
        "We'd Love to Hear From You",
        'Reach out, ask a question, or visit us. Our doors and hearts are always open.',
        'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      {
        title: 'Contact Information',
        fields: [
          { key: 'contact_address', label: 'Address', type: 'text', placeholder: '1 Dominion Avenue, Onireke, Opposite Ojo Military Cantonment' },
          { key: 'contact_address_sub', label: 'City / Region', type: 'text', placeholder: 'Lagos, Nigeria' },
          { key: 'contact_phone', label: 'Phone Number', type: 'text', placeholder: '+234 703 454 3971' },
          { key: 'contact_phone_hours', label: 'Phone Hours', type: 'text', placeholder: 'Mon – Sat, 8am – 6pm' },
          { key: 'contact_email', label: 'Email Address', type: 'text', placeholder: 'info@dfim.org' },
          { key: 'contact_email_note', label: 'Email Note', type: 'text', placeholder: 'We reply within 24 hours' },
          { key: 'contact_service_times', label: 'Service Times Line 1', type: 'text', placeholder: 'Sun: 7am & 10am' },
          { key: 'contact_service_times_sub', label: 'Service Times Line 2', type: 'text', placeholder: 'Wed & Fri: 5pm' },
        ],
      },
    ],
    defaults: {
      ...heroDefs(
        'Contact Us',
        "We'd Love to Hear From You",
        'Reach out, ask a question, or visit us. Our doors and hearts are always open.',
        'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ),
      contact_address: '1 Dominion Avenue, Onireke, Opposite Ojo Military Cantonment',
      contact_address_sub: 'Lagos, Nigeria',
      contact_phone: '+234 703 454 3971',
      contact_phone_hours: 'Mon – Sat, 8am – 6pm',
      contact_email: 'info@dfim.org',
      contact_email_note: 'We reply within 24 hours',
      contact_service_times: 'Sun: 7am & 10am',
      contact_service_times_sub: 'Wed & Fri: 5pm',
    },
  },
  // Hero-only pages
  {
    id: 'ministries', label: 'Ministries',
    sections: [hero('Our Ministries', 'Kingdom Work', 'Every arm of DFIM exists with a singular purpose — transforming lives and advancing the Kingdom of God.', 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1600')],
    defaults: heroDefs('Our Ministries', 'Kingdom Work', 'Every arm of DFIM exists with a singular purpose — transforming lives and advancing the Kingdom of God.', 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1600'),
  },
  {
    id: 'school-of-ministry', label: 'School of Ministry',
    sections: [hero('School of Ministry', 'Equipping Ministers', "Where God's call meets professional training. Equipping you for effective Kingdom service.", 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600')],
    defaults: heroDefs('School of Ministry', 'Equipping Ministers', "Where God's call meets professional training.", 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600'),
  },
  {
    id: 'departments', label: 'Departments',
    sections: [hero('Departments', 'Serve Your Calling', 'Find your place of service. Every department is a ministry, and every member matters.', 'https://images.pexels.com/photos/1184512/pexels-photo-1184512.jpeg?auto=compress&cs=tinysrgb&w=1600')],
    defaults: heroDefs('Departments', 'Serve Your Calling', 'Find your place of service. Every department is a ministry, and every member matters.', 'https://images.pexels.com/photos/1184512/pexels-photo-1184512.jpeg?auto=compress&cs=tinysrgb&w=1600'),
  },
  {
    id: 'house-fellowship', label: 'House Fellowship',
    sections: [hero('House Care Fellowship', 'The Church in Your Home', 'Community, discipleship, and kingdom impact — one home at a time.', 'https://images.pexels.com/photos/3812437/pexels-photo-3812437.jpeg?auto=compress&cs=tinysrgb&w=1600')],
    defaults: heroDefs('House Care Fellowship', 'The Church in Your Home', 'Community, discipleship, and kingdom impact — one home at a time.', 'https://images.pexels.com/photos/3812437/pexels-photo-3812437.jpeg?auto=compress&cs=tinysrgb&w=1600'),
  },
  {
    id: 'media', label: 'Media',
    sections: [hero('Media Center', 'His Word, Everywhere', 'Access sermons, messages, and photos from DFIM. Let the Word of God follow you everywhere.', 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1600')],
    defaults: heroDefs('Media Center', 'His Word, Everywhere', 'Access sermons, messages, and photos from DFIM.', 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1600'),
  },
  {
    id: 'events', label: 'Events',
    sections: [hero('Upcoming Events', 'Mark Your Calendar', 'Life-changing gatherings designed to build, inspire, and release you into your destiny.', 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1600')],
    defaults: heroDefs('Upcoming Events', 'Mark Your Calendar', 'Life-changing gatherings designed to build, inspire, and release you into your destiny.', 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1600'),
  },
  {
    id: 'blog', label: 'Blog',
    sections: [hero('Blog', 'Words of Life', 'Articles, devotionals, and teachings to nourish your faith and ignite your purpose.', 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600')],
    defaults: heroDefs('Blog', 'Words of Life', 'Articles, devotionals, and teachings to nourish your faith and ignite your purpose.', 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600'),
  },
  {
    id: 'locations', label: 'Locations',
    sections: [hero('Our Locations', 'Find Us Near You', 'DFIM is spreading across Nigeria. Find a branch near you and join the family.', 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1600')],
    defaults: heroDefs('Our Locations', 'Find Us Near You', 'DFIM is spreading across Nigeria. Find a branch near you and join the family.', 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=1600'),
  },
];

function FieldInput({ field, value, onChange }: { field: Field; value: string; onChange: (key: string, val: string) => void }) {
  const cls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white resize-none';
  if (field.type === 'textarea') {
    return (
      <textarea
        rows={field.rows || 3}
        className={cls}
        value={value}
        onChange={e => onChange(field.key, e.target.value)}
        placeholder={field.placeholder}
      />
    );
  }
  return (
    <input
      type="text"
      className={cls}
      value={value}
      onChange={e => onChange(field.key, e.target.value)}
      placeholder={field.placeholder}
    />
  );
}

export default function PageContentPanel() {
  const [selectedPage, setSelectedPage] = useState<PageConfig | null>(null);
  const [content, setContent] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (!selectedPage) return;
    setSaved(false);
    setSaveError('');
    setActiveSection(0);
    getDocument<Record<string, string>>('page_content', selectedPage.id)
      .then(data => setContent(data ? { ...selectedPage.defaults, ...data } : { ...selectedPage.defaults }))
      .catch(() => setContent({ ...selectedPage.defaults }));
  }, [selectedPage]);

  const save = async () => {
    if (!selectedPage) return;
    setSaving(true);
    setSaveError('');
    try {
      await setDocument('page_content', selectedPage.id, content);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setSaveError(`Save failed: ${msg}`);
      console.error('[PageContentPanel] Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const section = selectedPage ? selectedPage.sections[activeSection] : null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Page Content</h2>
      <p className="text-gray-500 text-sm mb-6">Edit all sections of each page. Select a page to get started.</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page List */}
        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl overflow-hidden self-start">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPage(p)}
              className={`w-full flex items-center justify-between px-5 py-3.5 text-left border-b border-gray-50 last:border-0 transition-colors ${selectedPage?.id === p.id ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-700 hover:bg-gray-50'}`}
            >
              <span className="text-sm">{p.label}</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="lg:col-span-3">
          {!selectedPage ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400">
              <p className="text-lg font-medium mb-1">Select a page</p>
              <p className="text-sm">Choose a page from the list to edit its content.</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{selectedPage.label}</h3>
                    <p className="text-xs text-gray-400">/{selectedPage.id === 'home' ? '' : selectedPage.id}</p>
                  </div>
                  <button
                    onClick={save}
                    disabled={saving}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${saved ? 'bg-green-500 text-white' : saveError ? 'bg-red-500 text-white' : 'bg-amber-500 hover:bg-amber-400 text-slate-900'}`}
                  >
                    <Check size={14} /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                  </button>
                </div>
                {saveError && (
                  <p className="text-red-500 text-xs mt-2">{saveError}</p>
                )}
              </div>

              {/* Section Tabs */}
              {selectedPage.sections.length > 1 && (
                <div className="flex overflow-x-auto border-b border-gray-100">
                  {selectedPage.sections.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSection(i)}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeSection === i ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-slate-700'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Fields */}
              {section && (
                <div className="p-6">
                  {/* Hero live preview */}
                  {section.title === 'Hero Section' && (
                    <div
                      className="rounded-xl overflow-hidden h-28 relative mb-6"
                      style={{
                        backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.7) 100%), url('${content.hero_bg_image || selectedPage.defaults.hero_bg_image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                          {content.hero_subtitle || selectedPage.defaults.hero_subtitle}
                        </p>
                        <p className="text-white font-bold text-lg leading-tight">
                          {content.hero_title || selectedPage.defaults.hero_title}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5">
                    {section.fields.map((field) => (
                      <div key={field.key}>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                          {field.label}
                        </label>
                        <FieldInput field={field} value={content[field.key] ?? ''} onChange={handleChange} />
                        {field.type === 'image_url' && content[field.key] && (
                          <img
                            src={content[field.key]}
                            alt="preview"
                            className="mt-2 h-16 rounded-lg object-cover border border-gray-100"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
