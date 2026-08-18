import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, HelpCircle, Plus } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Paul & Timothy Training Centre" },
      {
        name: "description",
        content:
          "Answers about the Ministry Calling Assessment, training courses, mentorship and how to get started.",
      },
      { property: "og:title", content: "FAQs — Paul & Timothy Training Centre" },
      {
        property: "og:description",
        content: "Common questions about assessments, courses, mentorship and joining the centre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqsPage,
});

const faqs = [
  {
    q: "1. Should I wait to start ministry if my spouse isn't saved yet?",
    a: (
      <div className="space-y-3">
        <p>You can begin as soon as you are saved.</p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>Paul started sharing the Gospel immediately after his conversion (Acts 9:19–20)</li>
          <li>The Samaritan woman ran straight back to her village with the good news (John 4:28–29, 39)</li>
          <li>If your spouse restricts you, wait for God to open that door; but don't mistake waiting for stopping</li>
          <li>You can always begin where you already are: your home, your workplace, your neighbourhood</li>
        </ul>
      </div>
    ),
  },
  {
    q: "2. Is it right to command the devil to be bound and thrown into hell in our daily prayers?",
    a: (
      <div className="space-y-3">
        <p>We don't have the authority to cast Satan or his demons into hell. But we are far from powerless.</p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>We resist him, and he flees (James 4:7; 1 Peter 5:8–9)</li>
          <li>We bind his actions, cancel his plans through the Word of God, and overcome by the blood of Christ (Revelation 12:11–12)</li>
          <li>Jesus has already defeated him at the cross and placed authority in our hands (Hebrews 2:14; Colossians 2:15)</li>
          <li>We fight with the full armour God has given us (Ephesians 6:10–20)</li>
        </ul>
        <p>The victory is already won. Our part is to stand in it.</p>
      </div>
    ),
  },
  {
    q: "3. How do I stay consistent in ministry when I have no one walking with me?",
    a: (
      <div className="space-y-3">
        <p className="italic">Full question: "I feel a strong desire to distribute tracts in the villages we visit for Sunday services, but I haven't done it because I lack companionship — and I feel guilty about that."</p>
        <p>First, recognise where the desire came from. It's from the Lord. Surrender it back to Him and commit to obeying whatever He asks. "Commit thy way unto the Lord; trust also in him; and he shall bring it to pass." (Psalm 37:5)</p>
        <p>Second, pray for it. Ministry isn't easy, and the enemy will use distraction and fear to keep you from ever starting. Ask God for the strength and grace to finish what He's given you. "My grace is sufficient for thee: for my strength is made perfect in weakness." (2 Corinthians 12:9)</p>
        <p>Third, find one person. Just one. Share the burden, and invite them to walk alongside you so you can strengthen each other. Jesus sent His disciples out two by two. We were never meant to do this alone (Luke 10:1).</p>
        <p>Finally, make it a discipline. Fix a day, a date and a time. Guilt won't build consistency; a decision will. "For when I preach the gospel, I cannot boast, since I am compelled to preach. Woe to me if I do not preach the gospel!" (1 Corinthians 9:16–17)</p>
      </div>
    ),
  },
  {
    q: "4. My calling is clear, but my circumstances don't support it. Should I pursue it now or wait?",
    a: (
      <div className="space-y-3">
        <p className="italic">Full question: "My calling is to serve in children's and teen ministry, and I feel clear and confident about it. But my current life and financial circumstances don't seem to support it. Is this a season to wait and prepare?"</p>
        <p>Calling should not be delayed. Delayed obedience is disobedience. "Therefore to him that knoweth to do good, and doeth it not, to him it is sin." (James 4:17) "To obey is better than sacrifice." (1 Samuel 15:22)</p>
        <p>Circumstances will never be ideal. If you keep watching the weather, you'll never sow. "Whoever watches the wind will not plant; whoever looks at the clouds will not reap." (Ecclesiastes 11:4)</p>
        <p>Start with prayer. Surrender yourself, and ask God for the courage to begin. "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee." (Isaiah 41:10)</p>
        <p>Then start small — in your church, your neighbourhood, your own family. "Do not despise these small beginnings." (Zechariah 4:10) "He that is faithful in that which is least is faithful also in much." (Luke 16:10)</p>
        <p>Open a door where you are. A monthly prayer cell at home is a beginning, and God will widen it. "For where two or three are gathered together in my name, there am I in the midst of them." (Matthew 18:20) "I have set before thee an open door, and no man can shut it." (Revelation 3:8)</p>
        <p>Start faithfully rather than waiting for perfect conditions. "In the morning sow thy seed, and in the evening withhold not thine hand." (Ecclesiastes 11:6)</p>
      </div>
    ),
  },
  {
    q: "5. How do I know God's calling on my life? Does He speak directly, or through other people?",
    a: (
      <div className="space-y-3">
        <p>Both, and usually in more than one way at once. Look for these signs together rather than in isolation:</p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><strong>A growing burden.</strong> A love for a particular group of people, or a particular cause, that won't leave you alone (Nehemiah 1:3–4; Matthew 9:36).</li>
          <li><strong>Scripture that speaks directly to your situation,</strong> often the same passages returning to you more than once (Joshua 1:1–9)</li>
          <li><strong>Doors and opportunities opening</strong> to serve the very people your heart is already burdened for (1 Samuel 16–17)</li>
          <li><strong>Affirmation from spiritual leaders:</strong> pastors, prophets and ministers who confirm what you're sensing (Acts 13:2)</li>
          <li><strong>A season of brokenness.</strong> God often lets you feel pain so you can recognise it in others. Your own struggles frequently become the bridge to the people you're called to (1 Samuel 22:1–2).</li>
          <li><strong>Gifts that match the call.</strong> Your spiritual gifts and natural abilities will complement what God is asking of you.</li>
          <li><strong>A thirst to learn.</strong> You'll find yourself hungry to understand that particular ministry (Nehemiah 1:2–3)</li>
          <li><strong>A willingness to sacrifice</strong> your time, comfort and reputation - and to leave your comfort zone to reach them (Romans 8:36–39)</li>
          <li><strong>Visible fruit.</strong> God uses you among those people, and you see real transformation in their lives (Matthew 7:16)</li>
        </ul>
      </div>
    ),
  },
  {
    q: "6. How do I know I've received an anointing?",
    a: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>It begins when you surrender your life to God and ask Him to lead it - the way an athlete yields to a coach</li>
          <li>God becomes Lord of your life, not just a presence in it</li>
          <li>You begin to bear spiritual fruit</li>
          <li>You start sharing the Gospel with others</li>
        </ul>
      </div>
    ),
  },
  {
    q: "7. Is speaking in tongues a genuine gift of the Holy Spirit?",
    a: (
      <div className="space-y-3">
        <p className="italic">Full question: "Some people say speaking in tongues is simply an expression of the subconscious mind rather than the work of the Holy Spirit. How do we understand this biblically?"</p>
        <p>It is both a sign and a gift of the Holy Spirit. Scripture gives it several purposes:</p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>To edify and build up the believer</li>
          <li>To reveal God's will for others</li>
          <li>To engage in spiritual battle</li>
        </ul>
        <p>(1 Corinthians 12 and 14)</p>
      </div>
    ),
  },
  {
    q: "8. How can I tell whether someone speaking in tongues is truly speaking by the Holy Spirit?",
    a: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>Look at their life. It should align with the Word of God (Matthew 7:15–20).</li>
          <li>Be discerning. The enemy disguises himself as an angel of light, and deception can imitate the genuine gift. (2 Corinthians 11:14)</li>
        </ul>
      </div>
    ),
  },
  {
    q: "9. Will non-believers who do good deeds go to heaven, or only those who are baptised?",
    a: (
      <div className="space-y-3">
        <p>Good deeds alone do not lead anyone to heaven. Salvation comes through accepting Christ and being baptised.</p>
        <p>"Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved." (Acts 4:12)</p>
      </div>
    ),
  },
  {
    q: "10. How do I know whether a vision is from God or from the enemy?",
    a: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>A God-given vision prepares you for what is coming, and it gives you hope</li>
          <li>God confirms and interprets it through His Word</li>
          <li>The enemy's dreams produce fear and confusion, because they are built on lies</li>
        </ul>
      </div>
    ),
  }
];

function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
      <section className="gradient-hero pt-36 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <HelpCircle className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" /> Resources · FAQs
          </span>
          <h1 className="font-serif text-[1.8rem] sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] whitespace-nowrap tracking-tight">Questions people bring us.</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Honest questions about calling, ministry and walking with God — answered from Scripture. If your question isn't here, ask us.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-3 px-6 py-16">
        {faqs.map((f, i) => (
          <motion.div
            key={f.q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-serif text-base font-semibold text-primary md:text-lg">
                {f.q}
              </span>
              <Plus
                className={`h-5 w-5 shrink-0 text-teal-deep transition-transform duration-300 ${
                  open === i ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="mt-10 rounded-4xl gradient-hero px-8 py-10 text-center text-white">
          <h2 className="font-serif text-2xl font-bold">Still have a question?</h2>
          <p className="mt-2 text-sm text-white/75">
            If your question isn't here, reach out and ask us directly.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            Ask a question <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      </motion.main>
    </div>
  );
}