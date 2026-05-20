import type { Ministry } from '@/types/ministry'

export const MINISTRIES: Ministry[] = [
  // ── Youth ──────────────────────────────────────────────────────
  {
    id: 'youth-ministry',
    name: 'Youth Ministry',
    category: 'youth',
    description:
      'A dynamic community for young people aged 18–35, built on the Word of God and the leading of the Holy Spirit. We raise champions who carry the Kingdom into every sphere of influence.',
    meetingTime: 'Saturdays, 4:00 PM',
    location: 'Main Auditorium',
    leader: { name: 'Bro. Emmanuel Okafor', role: 'Youth Leader' },
    contact: { email: 'youth@dominionfaith.com', phone: '+234 800 000 0001' },
    featured: true,
  },
  {
    id: 'teens-ministry',
    name: 'Teens Ministry',
    category: 'youth',
    description:
      'Discipling teenagers aged 13–17 in the ways of God. We create a safe, fun, and faith-filled space where teens grow in identity, purpose, and the Word.',
    meetingTime: 'Sundays, 9:00 AM',
    location: 'Youth Hall',
    leader: { name: 'Sis. Joy Adeleke', role: 'Teens Coordinator' },
    contact: { email: 'teens@dominionfaith.com' },
  },
  {
    id: 'sunday-school',
    name: 'Sunday School Ministry',
    category: 'youth',
    description:
      'Systematic biblical education for all age groups. Our Sunday School classes ground members in Scripture, doctrine, and Christian living through well-structured curriculum.',
    meetingTime: 'Sundays, 8:30 AM',
    location: 'Classrooms Block',
    leader: { name: 'Dcn. Samuel Idowu', role: 'Sunday School Director' },
    contact: { email: 'sundayschool@dominionfaith.com' },
  },

  // ── Women ──────────────────────────────────────────────────────
  {
    id: 'women-department',
    name: 'Women Department',
    category: 'women',
    description:
      'Empowering women to walk in dignity, purpose, and spiritual authority. We provide mentorship, fellowship, and practical teaching for women in every season of life.',
    meetingTime: 'First Saturday, 10:00 AM',
    location: 'Fellowship Hall',
    leader: { name: 'Dcss. Grace Nwachukwu', role: "Women's Director" },
    contact: { email: 'women@dominionfaith.com', phone: '+234 800 000 0002' },
    featured: true,
  },

  // ── Men ────────────────────────────────────────────────────────
  {
    id: 'men-department',
    name: 'Men Department',
    category: 'men',
    description:
      'Building men of integrity, responsibility, and godly leadership. We equip men to lead in their homes, communities, and marketplace with Kingdom values.',
    meetingTime: 'Last Saturday, 8:00 AM',
    location: 'Main Auditorium',
    leader: { name: 'Dcn. Peter Eze', role: "Men's Director" },
    contact: { email: 'men@dominionfaith.com', phone: '+234 800 000 0003' },
    featured: true,
  },

  // ── Children ───────────────────────────────────────────────────
  {
    id: 'children-department',
    name: 'Children Department',
    category: 'children',
    description:
      "A vibrant, safe, and Spirit-filled environment for children aged 2–12. We plant the Word of God early and raise children who know who they are in Christ.",
    meetingTime: 'Sundays, 9:00 AM',
    location: "Children's Chapel",
    leader: { name: 'Sis. Blessing Afolabi', role: "Children's Coordinator" },
    contact: { email: 'children@dominionfaith.com' },
    featured: true,
  },

  // ── Music ──────────────────────────────────────────────────────
  {
    id: 'dominion-voice',
    name: 'Dominion Voice',
    category: 'music',
    description:
      'The worship and music ministry of DFIM — choir, worship team, and instrumentalists. Dominion Voice leads the congregation into the authentic presence of God every service.',
    meetingTime: 'Thursdays, 6:00 PM (rehearsal)',
    location: 'Sanctuary',
    leader: { name: 'Bro. Daniel Ola', role: 'Worship Director' },
    contact: { email: 'worship@dominionfaith.com', phone: '+234 800 000 0004' },
    featured: true,
  },

  // ── Serve ──────────────────────────────────────────────────────
  {
    id: 'hospital-prison-ministry',
    name: 'Hospital & Prison Ministry',
    category: 'serve',
    description:
      'Taking the light of Christ to the most vulnerable. We minister to patients in hospitals and inmates in prisons, bringing healing, hope, and the gospel where it is needed most.',
    meetingTime: 'Third Saturday, 10:00 AM',
    location: 'Outreach (various)',
    leader: { name: 'Dcss. Comfort Obi', role: 'Outreach Coordinator' },
    contact: { email: 'outreach@dominionfaith.com', phone: '+234 800 000 0006' },
    featured: true,
  },
  {
    id: 'evangelical-ministry',
    name: 'Evangelical Ministry',
    category: 'serve',
    description:
      'Fulfilling the Great Commission through street evangelism, door-to-door outreach, and open-air crusades. We are aggressive for souls because every life matters to God.',
    meetingTime: 'Saturdays, 8:00 AM',
    location: 'Community (various)',
    leader: { name: 'Bro. Stephen Dada', role: 'Evangelism Director' },
    contact: { email: 'evangelism@dominionfaith.com' },
  },
  {
    id: 'faith-clinic',
    name: 'Faith Clinic',
    category: 'serve',
    description:
      'A healing ministry combining the supernatural power of God with practical medical care. Faith Clinic prays for the sick, provides health consultations, and believes God for miracles.',
    meetingTime: 'Wednesdays, 5:00 PM',
    location: 'Faith Clinic Centre',
    leader: { name: 'Dr. Philip Adeyemi', role: 'Faith Clinic Director' },
    contact: { email: 'faithclinic@dominionfaith.com', phone: '+234 800 000 0007' },
    featured: true,
  },
  {
    id: 'house-fellowship',
    name: 'House Fellowship',
    category: 'serve',
    description:
      'The backbone of pastoral care at DFIM. House fellowships are small cell groups meeting weekly in homes across every district, providing community, accountability, and discipleship.',
    meetingTime: 'Weekdays (varies by zone)',
    location: 'Various homes across Lagos',
    leader: { name: 'Pastor Joshua', role: 'Senior Pastor' },
    contact: { email: 'housefellowship@dominionfaith.com', phone: '+234 703 454 3971' },
    featured: true,
  },
  {
    id: 'prayer-department',
    name: 'Prayer Department',
    category: 'serve',
    description:
      'The engine room of Dominion Faith. Our prayer team intercedes for the church, the nation, and the nations, running vigils and prayer chains that keep the fire of God burning.',
    meetingTime: 'Tuesdays & Fridays, 6:00 AM',
    location: 'Prayer Room',
    leader: { name: 'Dcn. Moses Taiwo', role: 'Prayer Coordinator' },
    contact: { email: 'prayer@dominionfaith.com', phone: '+234 800 000 0005' },
    featured: true,
  },
  {
    id: 'ushering-protocol',
    name: 'Ushering & Protocol',
    category: 'serve',
    description:
      'The first face of the church. Our ushers create a warm, orderly, and welcoming atmosphere for every service, serving with excellence and genuine love for the house of God.',
    meetingTime: 'Every Sunday from 7:30 AM',
    location: 'Main Sanctuary',
    leader: { name: 'Dcn. Abraham Bello', role: 'Chief Usher' },
    contact: { email: 'ushering@dominionfaith.com' },
  },
  {
    id: 'media-technical',
    name: 'Media & Technical Department',
    category: 'serve',
    description:
      'Powering the broadcast of the Word across screens and speakers. Our technical team handles sound, visuals, live streaming, and all AV operations so no word is ever lost.',
    meetingTime: 'Every Sunday from 7:30 AM',
    location: 'Media Booth',
    leader: { name: 'Bro. Victor Okon', role: 'Media Director' },
    contact: { email: 'media@dominionfaith.com' },
  },
  {
    id: 'sanctuary-department',
    name: 'Sanctuary Department',
    category: 'serve',
    description:
      'Responsible for the preparation, cleanliness, and beauty of the house of God. Our Sanctuary team ensures every service is held in a worthy and well-maintained environment.',
    meetingTime: 'Saturdays, 8:00 AM',
    location: 'Main Auditorium',
    leader: { name: 'Dcss. Ruth Amos', role: 'Sanctuary Coordinator' },
    contact: { email: 'sanctuary@dominionfaith.com' },
  },
  {
    id: 'drama-department',
    name: 'Drama Department',
    category: 'serve',
    description:
      'Communicating the gospel through the performing arts. Our drama team uses storytelling, mime, and stage performances to bring biblical truths to life in a compelling way.',
    meetingTime: 'Fridays, 5:00 PM',
    location: 'Multi-purpose Hall',
    leader: { name: 'Sis. Esther Fagbemi', role: 'Drama Director' },
    contact: { email: 'drama@dominionfaith.com' },
  },
  {
    id: 'deacon-deaconess',
    name: 'Deacon & Deaconess Board',
    category: 'serve',
    description:
      'Pillars of servant-leadership in Dominion Faith. The deacons and deaconesses support the pastoral team in ministry, welfare, and the day-to-day care of the congregation.',
    meetingTime: 'Monthly (date communicated internally)',
    location: 'Conference Room',
    leader: { name: 'Dcn. Femi Adeyinka', role: 'Head Deacon' },
    contact: { email: 'deacons@dominionfaith.com' },
  },
]
