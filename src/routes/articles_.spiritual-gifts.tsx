import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/articles_/spiritual-gifts")({
  component: SpiritualGiftsArticle,
});

function SpiritualGiftsArticle() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} className="flex-1 pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl px-6">
          <header className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep">
              Ministry & Calling
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-primary md:text-5xl">
              Spiritual Gifts: Essential Resources for Ministry
            </h1>
            <p className="mt-6 text-xl font-medium text-muted-foreground">
              Discovering God-given gifts & ministering in partnership with the holy spirit
            </p>
          </header>

          <div className="prose prose-lg prose-teal mx-auto text-muted-foreground">
            <p className="mb-4">Understanding our calling is important, but it is equally important to recognise the spiritual gifts God has given us to fulfil that calling.</p>
            <p className="mb-4">We may be gifted speakers, singers, worship leaders, teachers, or communicators. We may have many natural talents and abilities. Yet natural talent alone cannot turn a person’s heart toward Christ. Genuine transformation is ultimately the work of the Holy Spirit.</p>
            <p className="mb-4">When spiritual gifts operate through us, we learn not to depend merely on our abilities, but to depend on God as we serve.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">Spiritual Gifts—Resources Given by God</h2>
            <p className="mb-4">1 Corinthians 12 gives us a clear understanding of spiritual gifts. Though there are different kinds of ministry and different ways of serving, the same Holy Spirit is at work.</p>
            <p className="mb-4">God gives different gifts to different people, and each gift has a unique role in His Kingdom. We are not all gifted in the same way, nor are we expected to serve in the same manner.</p>
            <p className="mb-4">These gifts are not something we need to search for or obtain from somewhere outside ourselves. The Holy Spirit has already placed His gifts within His people. As we make room for Him and yield ourselves to His presence, He brings those gifts into operation. When we submit to the leading of the Holy Spirit, the gifts He has entrusted to us begin to emerge naturally, becoming evident in our lives, our service, and our ministries.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">The Holy Spirit’s Help in Difficult Seasons</h2>
            <p className="mb-4">The journey of ministry is not always easy. There are seasons when we face unexpected struggles, questions and deep challenges.</p>
            <p className="mb-4">During one such difficult season, a period of deep discouragement brought many questions:</p>
            <div className="mb-4 italic pl-4 border-l-2 border-teal-deep">
              <p>“Why did the Lord allow this?”</p>
              <p>“Why am I going through this?”</p>
              <p>“What is happening around me?”</p>
            </div>
            <p className="mb-4">Prayer continued, and efforts were made to bring different areas of life into order, yet the answers did not come immediately. At one point, there was a strong leading to set aside a week for fasting and prayer. During that season, praying in tongues, which had not been practised for some time, once again became an important part of the prayer life. Although the circumstances were still not fully understood, persevering in prayer brought a growing awareness of the Holy Spirit’s guidance, presence, and help.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">The Holy Spirit Intercedes for Us</h2>
            <p className="mb-4">There are moments when circumstances become so confusing that we do not even know what to pray or how to pray.</p>
            <p className="mb-4">In such moments, the Holy Spirit comes alongside us and helps us in our weakness. As Scripture teaches, there are times when we do not know how to pray as we ought, yet the Spirit helps us and intercedes for us.</p>
            <p className="mb-4">Those who have received the gift of praying in tongues should not regard it as insignificant or overlook its value. It can be a powerful spiritual resource that God has given for prayer, strengthening, and deeper communion with Him. As we learn to pray in partnership with the Holy Spirit, we can experience His sustaining grace and guidance, even in situations we do not fully understand.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">Do Not Neglect Your Spiritual Gifts</h2>
            <p className="mb-4">Natural abilities have their place in ministry, but they are not sufficient on their own. Talent may impress people, but it is the work of the Holy Spirit that transforms hearts and brings lasting spiritual fruit.</p>
            <p className="mb-4">Therefore, do not simply seek to discover your calling; seek also to understand the spiritual gifts God has entrusted to you. Develop them faithfully. Exercise them in prayer. Submit them to the leading of the Holy Spirit, and allow God to use them according to His purposes.</p>
            <p className="mb-4">Rather than relying entirely on our own abilities, let us learn to serve through the gifts God has given us and the grace He continually provides.</p>

            <div className="mt-16 rounded-[2rem] bg-cream p-12 text-center shadow-sm border border-border/40">
              <h3 className="font-serif text-3xl font-bold text-primary">In Summary</h3>
              <p className="mt-8 text-xl font-medium text-primary">Ultimately, we can rest in this truth:</p>
              <p className="mt-4 text-2xl font-semibold text-teal-deep">“The God who has called you has also placed within you the gifts and resources you need to fulfil that calling.”</p>
            </div>
          </div>
        </article>
      </motion.main>
    </div>
  );
}
