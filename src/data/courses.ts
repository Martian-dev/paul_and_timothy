import courseBibleImg from "@/assets/course-bible.jpg";
import courseTeachingImg from "@/assets/course-teaching.jpg";
import mentorshipImg from "@/assets/mentorship.jpg";
import callingImg from "@/assets/calling.jpg";
import equipmentImg from "@/assets/pttc-equipment.png";
import communityImg from "@/assets/pttc-community-learning.png";

export type CourseOutline = { title: string; body: string };

export type Course = {
  slug: string;
  img: string;
  tag: string;
  title: string;
  desc: string;
  summary: string;
  duration: string;
  lessons: string;
  level: string;
  outline: CourseOutline[];
  testimonials: { name: string; role: string; quote: string; img: string }[];
};

export const courses: Course[] = [
  {
    slug: "youth-teens-leadership",
    img: equipmentImg,
    tag: "Leadership Training",
    title: "Youth & Teens Leadership Training",
    desc: "A practical pathway for those serving young people — lead age-specific discipleship, plan meaningful gatherings, and mentor emerging leaders.",
    summary:
      "Young people need more than programmes — they need presence, purpose and patient investment. This training pathway equips you to lead age-specific discipleship, plan gatherings that truly matter, and raise up the next generation of servant-leaders in your church and community.",
    duration: "4 months",
    lessons: "16 lessons",
    level: "Foundational",
    outline: [
      {
        title: "Understanding the Next Generation",
        body: "How young people think, what they face, and how the Gospel speaks into their world today.",
      },
      {
        title: "Leading Age-Specific Discipleship",
        body: "Adapting your approach for children, teens, and young adults — each stage needs something different.",
      },
      {
        title: "Planning Meaningful Gatherings",
        body: "Moving beyond entertainment to create spaces where young people encounter God and grow in faith.",
      },
      {
        title: "Mentoring Emerging Leaders",
        body: "Identifying potential, walking alongside young leaders, and releasing them with confidence.",
      },
      {
        title: "Building a Sustainable Youth Ministry",
        body: "Structuring teams, involving parents, and avoiding burnout while staying faithful long-term.",
      },
    ],
    testimonials: [
      {
        name: "James K.",
        role: "Youth pastor, Lagos",
        quote: "This training changed how I see young people — not as a project, but as the church right now.",
        img: mentorshipImg,
      },
      {
        name: "Priscilla M.",
        role: "Sunday school leader",
        quote: "I finally have the tools and confidence to invest deeply in the teens I serve.",
        img: courseTeachingImg,
      },
    ],
  },
  {
    slug: "couples-ministry",
    img: communityImg,
    tag: "Specialised Ministry",
    title: "Couples Ministry Training",
    desc: "Apply biblical relationship principles, guide honest conversations, and support couples with care.",
    summary:
      "Marriage reflects the Gospel — and couples need communities that take that seriously. This pathway trains you to apply biblical relationship principles, facilitate honest conversations, and walk alongside couples through every season with grace and wisdom.",
    duration: "3 months",
    lessons: "12 lessons",
    level: "Intermediate",
    outline: [
      {
        title: "A Biblical Vision for Marriage",
        body: "Understanding God's design for marriage and how the Gospel shapes the way we relate.",
      },
      {
        title: "Guiding Honest Conversations",
        body: "Creating safe spaces where couples can talk openly about real struggles and real hope.",
      },
      {
        title: "Supporting Couples Through Crisis",
        body: "What to do when trust breaks down — practical wisdom for walking through the hardest seasons.",
      },
      {
        title: "Building a Couples Ministry",
        body: "Launching and sustaining a ministry that meets couples where they are, from engaged to decades in.",
      },
    ],
    testimonials: [
      {
        name: "David & Sarah R.",
        role: "Marriage mentors",
        quote: "We didn't just learn techniques — we learned how to be present with people in pain.",
        img: callingImg,
      },
      {
        name: "Mercy W.",
        role: "Women's group leader",
        quote: "The biblical foundations changed how I counsel my friends walking through tough seasons.",
        img: communityImg,
      },
    ],
  },
  {
    slug: "counselling-training",
    img: mentorshipImg,
    tag: "Care Ministry",
    title: "Counselling Training",
    desc: "Listen with wisdom and empathy, offer Scripture-rooted guidance, and recognise when to refer.",
    summary:
      "People carry burdens they rarely speak of. This pathway trains you to listen with wisdom and empathy, offer guidance deeply rooted in Scripture, and know when the most loving thing is to refer someone to specialist care. Faithful care starts here.",
    duration: "5 months",
    lessons: "18 lessons",
    level: "Intermediate",
    outline: [
      {
        title: "The Ministry of Listening",
        body: "Why listening — real, patient, unhurried listening — is the foundation of all care.",
      },
      {
        title: "Scripture-Rooted Guidance",
        body: "Using the Bible wisely in counsel, avoiding proof-texting while speaking truth with grace.",
      },
      {
        title: "Understanding Common Struggles",
        body: "Grief, anxiety, shame, addiction — recognising patterns and responding with care.",
      },
      {
        title: "Boundaries and Self-Care",
        body: "How to care for others without losing yourself — healthy limits that sustain long-term ministry.",
      },
      {
        title: "Knowing When to Refer",
        body: "Recognising the line between pastoral care and professional help, and making referrals well.",
      },
    ],
    testimonials: [
      {
        name: "Esther N.",
        role: "Church deaconess",
        quote: "I used to rush to fix people. Now I sit with them, and God does the work.",
        img: courseTeachingImg,
      },
      {
        name: "Michael O.",
        role: "Cell group leader",
        quote: "The referral framework gave me permission to not carry everything alone. That was freeing.",
        img: courseBibleImg,
      },
    ],
  },
  {
    slug: "kingdom-shakers",
    img: callingImg,
    tag: "Calling & Spiritual Gifts",
    title: "Kingdom Shakers (Knowing Your Call)",
    desc: "Identify your calling and gifts, discern a faithful next step, and build rhythms for spiritual growth.",
    summary:
      "You sense God is stirring something in your heart — but what is it, and what do you do next? This pathway helps you identify your spiritual gifts, test your calling through Scripture and community, and build the rhythms of spiritual growth that sustain a life of faithful service.",
    duration: "3 months",
    lessons: "14 lessons",
    level: "Foundational",
    outline: [
      {
        title: "The God Who Calls",
        body: "Understanding calling not as a career move but as a response to the voice of a living God.",
      },
      {
        title: "Identifying Your Gifts",
        body: "Discovering your spiritual gifts through Scripture, self-reflection, and honest community feedback.",
      },
      {
        title: "Discerning Your Next Step",
        body: "How to test what you are sensing — through prayer, counsel, Scripture and circumstance.",
      },
      {
        title: "Rhythms for Spiritual Growth",
        body: "Building sustainable habits of prayer, study and service that keep your roots deep.",
      },
      {
        title: "Stepping Out in Faith",
        body: "Moving from clarity to courage — taking the first step and staying faithful along the way.",
      },
    ],
    testimonials: [
      {
        name: "Grace K.",
        role: "Campus minister",
        quote: "I stopped running events and started walking with people. Everything changed.",
        img: callingImg,
      },
      {
        name: "Samuel O.",
        role: "New church volunteer",
        quote: "For the first time, I understood what God has wired me for. I am no longer sitting on the sidelines.",
        img: mentorshipImg,
      },
    ],
  },
  {
    slug: "one-to-one-evangelism",
    img: courseTeachingImg,
    tag: "Gospel Ministry",
    title: "One-to-one Evangelism",
    desc: "Share the Gospel clearly, respond to real questions, and follow up with new believers.",
    summary:
      "The Gospel is good news that changes everything — and it is most powerfully shared in the context of real relationship. This pathway trains you to share your faith clearly and naturally, respond to the honest questions people carry, and walk alongside new believers as they take their first steps.",
    duration: "3 months",
    lessons: "12 lessons",
    level: "Foundational",
    outline: [
      {
        title: "The Heart Behind Evangelism",
        body: "Moving from duty to delight — rediscovering the joy of sharing what you have found in Christ.",
      },
      {
        title: "Sharing the Gospel Clearly",
        body: "Simple, faithful, reproducible ways to explain the story of God from creation to new creation.",
      },
      {
        title: "Responding to Real Questions",
        body: "What to say when people push back — doubt, suffering, other faiths, and honest scepticism.",
      },
      {
        title: "Building Genuine Relationships",
        body: "Evangelism starts with presence and trust — how to be a faithful witness in everyday life.",
      },
      {
        title: "Following Up with New Believers",
        body: "The first weeks after faith — helping someone take root in Scripture, prayer and community.",
      },
    ],
    testimonials: [
      {
        name: "Daniel M.",
        role: "Pastor, Nairobi",
        quote: "I learned how to share my faith without pressure — just honesty and love.",
        img: mentorshipImg,
      },
      {
        name: "Ruth A.",
        role: "Marketplace believer",
        quote: "My colleagues started asking me questions. This training taught me what to do with that open door.",
        img: courseTeachingImg,
      },
    ],
  },
  {
    slug: "writing",
    img: courseBibleImg,
    tag: "Communication Ministry",
    title: "Writing",
    desc: "Shape a clear biblical message, structure stories and devotionals, and edit for your audience.",
    summary:
      "Words shape how people encounter truth. This pathway equips you to write with clarity and conviction — from devotionals and blog posts to articles and social media — shaping a clear biblical message that serves your readers and honours God's story.",
    duration: "4 months",
    lessons: "14 lessons",
    level: "Intermediate",
    outline: [
      {
        title: "Writing as Ministry",
        body: "Why words matter — understanding the power and responsibility of the written word in service of the Gospel.",
      },
      {
        title: "Shaping a Clear Message",
        body: "From idea to outline — how to move from a scattered thought to a focused, biblical message.",
      },
      {
        title: "Structuring Stories and Devotionals",
        body: "The craft of narrative and reflection — engaging your reader while staying faithful to the text.",
      },
      {
        title: "Editing for Your Audience",
        body: "How to revise with purpose — cutting clutter, sharpening language, and writing for the people you serve.",
      },
      {
        title: "Publishing and Platform",
        body: "Getting your writing out — practical guidance on blogs, social media, and building a faithful voice.",
      },
    ],
    testimonials: [
      {
        name: "Peter L.",
        role: "Blog writer",
        quote: "I went from overthinking every sentence to finishing and publishing. The frameworks were practical.",
        img: callingImg,
      },
      {
        name: "Miriam T.",
        role: "Church communications",
        quote: "Our church newsletter used to be an afterthought. Now people actually read it.",
        img: mentorshipImg,
      },
    ],
  },
  {
    slug: "bible-exposition",
    img: courseBibleImg,
    tag: "Module One",
    title: "Bible Exposition",
    desc: "A guided exploration of Genesis to Revelation — see the redemptive story as one whole.",
    summary: "Understand the overarching narrative of Scripture. This module takes you from Genesis to Revelation, tracing the redemptive work of God and equipping you to read, interpret, and teach the Bible with clarity and faithful context.",
    duration: "4 months",
    lessons: "16 lessons",
    level: "Foundational",
    outline: [
      { title: "The Shape of the Biblical Narrative", body: "Understanding the Bible as one unified story pointing to Christ." },
      { title: "Reading the Old Testament", body: "Navigating law, history, poetry, and prophecy." },
      { title: "The Gospels and the Kingdom", body: "The life, death, and resurrection of Jesus as the climax of history." },
      { title: "The Epistles and the Church", body: "Applying apostolic teaching to the life of the early and modern church." },
      { title: "Faithful Interpretation", body: "Principles for studying the text accurately and avoiding common pitfalls." },
    ],
    testimonials: [
      { name: "Sarah L.", role: "Small Group Leader", quote: "For the first time, the Old Testament makes sense to me. It's all connected.", img: courseTeachingImg },
      { name: "John M.", role: "Elder", quote: "This module gave me a framework to teach the Bible faithfully.", img: mentorshipImg }
    ]
  },
  {
    slug: "foundations-of-discipleship",
    img: courseTeachingImg,
    tag: "Module Two",
    title: "Foundations of Discipleship",
    desc: "Learn to make disciples the way Jesus did — relationally, patiently, reproducibly.",
    summary: "Jesus didn't just teach crowds; He invested deeply in a few. This module explores the biblical model of disciple-making, equipping you to build intentional relationships and guide others toward spiritual maturity.",
    duration: "3 months",
    lessons: "12 lessons",
    level: "Foundational",
    outline: [
      { title: "The Call to Make Disciples", body: "Unpacking the Great Commission and the heart of discipleship." },
      { title: "The Model of Jesus", body: "How Jesus selected, invested in, and sent out His disciples." },
      { title: "Life-on-Life Ministry", body: "Moving beyond programs to authentic, relational discipleship." },
      { title: "Handling Resistance and Growth", body: "Navigating the ups and downs of walking with someone." },
    ],
    testimonials: [
      { name: "David K.", role: "Youth Leader", quote: "I learned how to stop performing and start investing.", img: callingImg }
    ]
  },
  {
    slug: "called-to-lead",
    img: mentorshipImg,
    tag: "Module Three",
    title: "Called to Lead",
    desc: "Practical formation for spiritual leadership, character and endurance in ministry.",
    summary: "True leadership in the Kingdom is about character before competency. This module focuses on the inner life of the leader, spiritual disciplines, and the practical wisdom needed for long-term endurance in ministry.",
    duration: "4 months",
    lessons: "14 lessons",
    level: "Intermediate",
    outline: [
      { title: "The Character of a Leader", body: "Why integrity, humility, and holiness matter more than gifting." },
      { title: "Spiritual Disciplines for Leaders", body: "Maintaining your own soul while caring for others." },
      { title: "Leading Through Conflict", body: "Handling disagreements and difficult people with grace." },
      { title: "Vision and Endurance", body: "Staying faithful over the long haul without burning out." },
    ],
    testimonials: [
      { name: "Rachel P.", role: "Ministry Director", quote: "This course saved me from burnout and renewed my love for serving.", img: communityImg }
    ]
  },
  {
    slug: "sent-to-the-nations",
    img: callingImg,
    tag: "Module Four",
    title: "Sent to the Nations",
    desc: "For those wired for mission — discern where and how to go.",
    summary: "God's heart is for all nations. Whether you are called across the street or across the globe, this module helps you discern your role in global mission, understand cross-cultural realities, and step out in faith.",
    duration: "3 months",
    lessons: "10 lessons",
    level: "Advanced",
    outline: [
      { title: "God's Heart for the Nations", body: "Tracing the missional thread throughout Scripture." },
      { title: "Cross-Cultural Realities", body: "Understanding culture, worldview, and contextualization." },
      { title: "The Role of the Local Church", body: "How churches send and support workers faithfully." },
      { title: "Discerning Your Go", body: "Practical steps for preparing to move into cross-cultural ministry." },
    ],
    testimonials: [
      { name: "Michael O.", role: "Missionary", quote: "An invaluable foundation before stepping onto the field.", img: equipmentImg }
    ]
  }
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);