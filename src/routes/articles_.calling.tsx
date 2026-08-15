import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { motion } from "framer-motion";

export const Route = createFileRoute("/articles_/calling")({
  component: CallingArticle,
});

function CallingArticle() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav alwaysSolid />
      <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} className="flex-1 pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl px-6">
          <header className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep">
              Ministry & Calling
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-primary md:text-5xl">
              Stay Faithful to Your Calling
            </h1>
            <p className="mt-6 text-xl font-medium text-muted-foreground">
              How to discover God’s calling and run faithfully in it?
            </p>
          </header>

          <div className="prose prose-lg prose-teal mx-auto text-muted-foreground">
            <p className="mb-4">Ministry can take many forms—teaching Sunday School, serving in VBS, leading a prayer group, singing in the choir, or faithfully carrying out responsibilities given by a pastor. Yet beyond these activities, every believer must ask a deeper question:</p>
            <p className="mb-4 italic font-medium text-xl text-center text-primary">“What has God called me to do?”</p>
            <p className="mb-4">God has a specific calling for every individual. It may involve public ministry or behind-the-scenes work. This calling can encompass children, teenagers, young adults, families, women, or vulnerable people in need.</p>
            <p className="mb-4">Discovering that calling—and remaining faithful to it—are important parts of our walk with God.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">First, clarify your calling</h2>
            <p className="mb-4">The first step in discovering your calling is to spend time in God’s presence and in prayer.</p>
            <p className="mb-4">Pay attention to whether God has placed a continuing burden for a particular group of people in your heart. When God gives you a calling, He often places a corresponding burden within us.</p>
            <p className="mb-4">For instance, a desire for friends to know Christ may begin in the teenage years and later develop into a concern for teenagers, young adults, and families. As this desire grows, the direction of the ministry can become clearer.</p>
            <p className="mb-4">A calling comes from within; it is a burden God places in your heart.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">The calling remains unchanged, even when ministry methods change.</h2>
            <p className="mb-4">We are called to remain faithful to our calling, but the way we fulfil that calling may change.</p>
            <p className="mb-4">Today, you may serve through music. Tomorrow, you may lead worship, speak at a conference, participate in a drama, or use social media to communicate God's Word.</p>
            <p className="mb-4">The methods may change, but the core calling and the people God has placed on your heart should remain central.</p>
            <p className="mb-4">Romans 11:29 reminds us: <span className="italic font-medium">“For the gifts and the calling of God are irrevocable.”</span></p>
            <p className="mb-4">Consider Moses. God called him to lead the Israelites out of Egypt and towards the Promised Land. Although he was raised in a palace and later became a shepherd, his true concern was for his own people—the Israelites. Despite the numerous challenges and responsibilities along the journey, Moses remained focused on the central mission that God had given him.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">Run in One Lane</h2>
            <p className="mb-4">Today, there are countless opportunities to serve—music, worship, preaching, conferences, drama, social media and many others. But having the ability to do everything does not mean you are called to do everything.</p>
            <p className="mb-4">You do not have to run in every lane to finish a race well; you need to remain faithful in the lane God has given you.</p>
            <p className="mb-4">Once your calling becomes clear, it's essential to learn how to say “no” to opportunities that do not align with your calling. You might say, “This is a good ministry, but God has called me to something different.” Focus your time, energy, and talents on what God has entrusted to you.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">Opportunities Come with the Calling</h2>
            <p className="mb-4">When God calls someone to a particular ministry, He can also open doors through which that calling can be fulfilled. If God has placed a burden for teenagers in your heart, opportunities may arise through schools, churches, prayer groups or youth ministries where you can reach them.</p>
            <p className="mb-4">Therefore, pay attention to two things: The burden in your heart and the opportunities God continually places before you. Where these two come together, you may begin to recognise the direction of God's calling.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">God Also Gives the Plan for the Calling</h2>
            <p className="mb-4">When God called Moses, He didn’t just tell him to “go.” He also provided specific directions on what to do, whom to speak to, and how to lead the people. Similarly, when God calls you, He will reveal how you are to fulfil that calling.</p>
            <p className="mb-4">You may feel called to work with children, but you still need to ask: Where should I serve? In a church? In a school? Among children in my neighborhood?</p>
            <p className="mb-4">Bring these questions before God and wait in His presence. In His time, He will show the right path.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">Human advice alone is not enough</h2>
            <p className="mb-4">Seeking counsel from others is valuable when making ministry decisions. However, when it comes to God's calling, His voice must take precedence over human preference.</p>
            <div className="mb-4 italic pl-4 border-l-2 border-teal-deep">
              <p>“I like this.”</p>
              <p>“This seems like a good opportunity.”</p>
              <p>“I think this would be successful.”</p>
            </div>
            <p className="mb-4">These things alone cannot determine your calling.</p>
            <p className="mb-4">We are not the masters of ministry; we are servants of the Lord. He calls, and we obey. Therefore, spend time in God's presence. Pray. Fast. Listen.</p>
            <p className="mb-4">Ask:</p>
            <div className="mb-4 italic pl-4 border-l-2 border-teal-deep">
              <p>“Lord, what have You called me to do?</p>
              <p>Whom are You sending me to?</p>
              <p>Where? How? When?”</p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">The one who calls you is the one who will lead you</h2>
            <p className="mb-4">God does not call us and then leave us to accomplish the assignment on our own.</p>
            <ul className="mb-4 list-disc pl-6 space-y-1">
              <li>He is the One who calls.</li>
              <li>He is the One who leads.</li>
              <li>He is the One who gives the plan.</li>
              <li>And He is the One who provides the grace, gifts and resources we need.</li>
            </ul>
            <p className="mb-4">Don't be afraid of your calling. While your assignment may seem small to others, if it is God's calling, it holds great significance in His eyes. Focus on the ministry that God has entrusted to you, rather than trying to take on every ministry. Be faithful in your work.</p>

            <div className="mt-16 rounded-[2rem] bg-cream p-12 text-center shadow-sm border border-border/40">
              <h3 className="font-serif text-3xl font-bold text-primary">In Summary</h3>
              <div className="flex justify-center w-full">
                <ul className="mt-8 space-y-3 text-lg font-medium text-teal-deep text-left list-disc pl-6">
                  <li>Discover your calling.</li>
                  <li>Remain faithful to it.</li>
                  <li>Learn to say "no" to distractions.</li>
                  <li>Seek God's direction.</li>
                  <li>Trust in His grace and provision.</li>
                  <li>Run in one lane and stay true to your calling.</li>
                </ul>
              </div>
              <p className="mt-8 text-xl font-medium text-primary">Because in the end, what matters is not how many things we accomplish, but this:</p>
              <p className="mt-4 text-2xl font-semibold text-teal-deep">Did we faithfully fulfil the ONE CALLING that God called us to undertake?</p>
            </div>
          </div>
        </article>
      </motion.main>
    </div>
  );
}
