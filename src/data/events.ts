import conferenceImg from "@/assets/event-conference.jpg";
import prayerImg from "@/assets/event-prayer.jpg";
import youthImg from "@/assets/event-youth.jpg";
import marriageImg from "@/assets/event-marriage.jpg";
import mentorshipImg from "@/assets/mentorship.jpg";
import communityImg from "@/assets/community.jpg";
import callingImg from "@/assets/calling.jpg";
import courseBibleImg from "@/assets/course-bible.jpg";

export type EventItem = {
  slug: string;
  title: string;
  category: string;
  format: "Online" | "Offline";
  when: "Upcoming" | "Past";
  date: string;
  month: string;
  time: string;
  location: string;
  speakers: string;
  duration: string;
  description: string;
  image: string;
  tags: string[];
};

export const featuredEvent = {
  title: "Equipped 2026 — Leadership & Calling Conference",
  date: "Friday, 18 September 2026",
  time: "9:00 AM – 5:30 PM",
  venue: "Grace Convention Centre, Nairobi",
  deadline: "Registration closes 10 September 2026",
  seats: 62,
  startsAt: "2026-09-18T09:00:00Z",
  description:
    "Three keynote sessions, eight practical workshops and a night of worship — built to help you name your calling and take the next faithful step into it.",
  image: conferenceImg,
  tags: ["Conference", "Leadership", "Worship", "Discipleship"],
};

export const events: EventItem[] = [
  {
    slug: "leadership-workshop",
    title: "Leadership Foundations Workshop",
    category: "Leadership Training",
    format: "Offline",
    when: "Upcoming",
    date: "6 September 2026",
    month: "September",
    time: "10:00 AM – 3:00 PM",
    location: "Training Centre, Nairobi",
    speakers: "Pastor Daniel Okoye",
    duration: "5 hours",
    description:
      "Character before competence — a hands-on day on shepherding, delegation and leading from a place of rest.",
    image: mentorshipImg,
    tags: ["Leadership", "Workshop"],
  },
  {
    slug: "mission-conference",
    title: "Go & Tell Mission Conference",
    category: "Mission Outreach",
    format: "Offline",
    when: "Upcoming",
    date: "11 October 2026",
    month: "October",
    time: "8:30 AM – 6:00 PM",
    location: "Hope Chapel, Kampala",
    speakers: "Rev. Grace Mwangi · Pastor Daniel Okoye",
    duration: "Full day",
    description:
      "Sending sessions, field stories and practical training for believers stepping into local and global mission.",
    image: conferenceImg,
    tags: ["Conference", "Mission"],
  },
  {
    slug: "youth-revival",
    title: "Youth Revival Night",
    category: "Youth Conference",
    format: "Offline",
    when: "Upcoming",
    date: "14 November 2026",
    month: "November",
    time: "6:00 PM – 9:30 PM",
    location: "City Auditorium, Nairobi",
    speakers: "Pastor Samuel Lim",
    duration: "3.5 hours",
    description:
      "An evening of worship, testimony and Spirit-led ministry for teenagers and young adults.",
    image: youthImg,
    tags: ["Youth", "Worship"],
  },
  {
    slug: "midweek-prayer",
    title: "Midweek Prayer Gathering",
    category: "Prayer Gathering",
    format: "Online",
    when: "Upcoming",
    date: "Every Wednesday",
    month: "September",
    time: "7:00 PM – 8:00 PM",
    location: "Online · Zoom",
    speakers: "Prayer Team",
    duration: "1 hour",
    description:
      "A quiet hour of intercession for our courses, mentors and the people groups we are sent to.",
    image: prayerImg,
    tags: ["Prayer", "Online"],
  },
  {
    slug: "marriage-seminar",
    title: "Covenant Marriage Seminar",
    category: "Marriage Seminar",
    format: "Offline",
    when: "Upcoming",
    date: "5 December 2026",
    month: "December",
    time: "9:00 AM – 4:00 PM",
    location: "Lakeside Retreat, Naivasha",
    speakers: "Rev. Grace Mwangi",
    duration: "Full day",
    description:
      "A warm, honest day for couples on communication, forgiveness and building a home on Scripture.",
    image: marriageImg,
    tags: ["Retreat", "Workshop"],
  },
  {
    slug: "discipleship-workshop",
    title: "Discipleship in Everyday Life",
    category: "Discipleship Workshop",
    format: "Online",
    when: "Upcoming",
    date: "26 September 2026",
    month: "September",
    time: "4:00 PM – 6:00 PM",
    location: "Online · Live",
    speakers: "Pastor Samuel Lim",
    duration: "2 hours",
    description:
      "Simple, repeatable rhythms for discipling one person well — at home, at work and in your neighbourhood.",
    image: communityImg,
    tags: ["Workshop", "Online", "Discipleship"],
  },
  {
    slug: "pastors-summit",
    title: "Pastors & Planters Summit",
    category: "Pastors Summit",
    format: "Offline",
    when: "Past",
    date: "22 May 2026",
    month: "May",
    time: "9:00 AM – 5:00 PM",
    location: "Training Centre, Nairobi",
    speakers: "Pastor Daniel Okoye",
    duration: "Full day",
    description:
      "A gathering of 120 shepherds for renewal, peer counsel and practical help with church health.",
    image: callingImg,
    tags: ["Conference", "Leadership"],
  },
  {
    slug: "bible-study-intensive",
    title: "Bible Study Intensive",
    category: "Bible Study",
    format: "Offline",
    when: "Past",
    date: "8 March 2026",
    month: "March",
    time: "10:00 AM – 2:00 PM",
    location: "Training Centre, Nairobi",
    speakers: "Rev. Grace Mwangi",
    duration: "4 hours",
    description:
      "Learning to read a passage in context, teach it faithfully and let it reshape how we live.",
    image: courseBibleImg,
    tags: ["Workshop", "Discipleship"],
  },
];

export const timeline = [
  { month: "September", title: "Leadership Workshop", detail: "Character, calling and shepherding." },
  { month: "October", title: "Mission Conference", detail: "Sending sessions and field stories." },
  { month: "November", title: "Youth Revival Night", detail: "Worship, testimony and ministry." },
  { month: "December", title: "Christmas Outreach", detail: "Serving our city together." },
];