import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { motion } from "framer-motion";

export const Route = createFileRoute("/articles_/scudder")({
  component: ScudderArticle,
});

function ScudderArticle() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav alwaysSolid />
      <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} className="flex-1 pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl px-6">
          <header className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep">
              History & Calling
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-primary md:text-5xl">
              A Cry for Help… A Calling… A Legacy
            </h1>
            <p className="mt-6 text-xl font-medium text-muted-foreground">
              The Unforgettable Journey of Dr Ida Sophia Scudder
            </p>
          </header>

          <div className="relative mb-16 aspect-video overflow-hidden rounded-[2.5rem] bg-black shadow-xl">
             <iframe 
               src="https://www.youtube.com/embed/wf3FGHqdi2w" 
               title="A Cry for Help… A Calling… A Legacy"
               className="absolute inset-0 h-full w-full border-0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          </div>

          <div className="prose prose-lg prose-teal mx-auto text-muted-foreground">
            <p className="mb-4">One night. Three women. Three deaths.<br/>And a 20-year-old woman whose life was changed forever.</p>
            <p className="mb-4">On a stormy night in South India, Ida Scudder was quietly reading in her small home when a desperate man knocked on the door. He explained that his wife was in severe labour and pleaded for help. Ida offered to call her father, who was a doctor, but the man refused. Due to his social customs, he would not allow a male doctor to attend to his wife.</p>
            <p className="mb-4">That night, two more men came with the same desperate request for help for women in childbirth. Ida could do nothing. The next day, she learned that all three women had died.</p>
            <p className="mb-4 italic font-medium">One question stayed with her: “What if these women had had a woman doctor?”</p>
            <p className="mb-4">That question changed the direction of her life.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">A girl who decided never to become a missionary</h2>
            <p className="mb-4">Ida Sophia Scudder was born on December 9, 1870, in Thiruvananthapuram, to Dr. John Scudder and Sophia Scudder, medical missionaries serving in India.</p>
            <p className="mb-4">Raised in a missionary family, she did not want to follow in their footsteps. The suffering she witnessed during the 1876–78 famine made missionary life seem filled with hardship. She declared, "I will never become a missionary," dreaming instead of a peaceful family life. However, God had other plans for her.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">One night… one question… a new calling</h2>
            <p className="mb-4">At 20, Ida returned to India due to her mother’s illness. After a heartbreaking night marked by the deaths of three women, she felt called to action. Inspired by their tragedy, she decided to become a doctor to ensure that Indian women received the medical care they needed.</p>
            <p className="mb-4">The missionary life she once rejected had now become her calling from God.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">A Medical Journey That Broke Barriers</h2>
            <p className="mb-4">Ida studied medicine at Cornell University during a period when it was still unusual for women to enter the medical profession. While she was studying, she communicated the medical needs of Indian women to churches and fellow students and began raising support for healthcare initiatives in India.</p>
            <p className="mb-4">Her appeal touched the heart of a donor who gave $10,000 in memory of his wife toward medical work among women in India. Ida returned to India with a renewed determination to serve.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">A small dream born in Vellore</h2>
            <p className="mb-4">Ida returned to India to work in the Vellore region with her father. Her goal was to establish a small hospital for free medical care. After her father's passing in 1900, she continued her mission and opened a hospital in Vellore, offering free treatment to nearby villagers.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">“One doctor is not enough!”</h2>
            <p className="mb-4">Ida realised that one doctor could not meet the overwhelming healthcare needs caused by diseases like cholera, leprosy, and plague. To address this, she started training nurses and recognised the urgent need for more women doctors in India. Her conviction led her to advocate for women's medical education, paving the way for a significant movement in medical training.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">She expected three applications… 151 came!</h2>
            <p className="mb-4">Ida encouraged women to pursue medical education, hoping for at least three applications. Instead, 151 applications were received, leading to the selection of seventeen women for training. This vision ultimately resulted in the establishment of the Christian Medical College, Vellore, in 1928, transforming medical education and healthcare.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">Not just in the hospital… but among the people</h2>
            <p className="mb-4">Ida believed that medical ministry should extend beyond hospitals. Through her "Roadside Clinic," she brought medical care to villages and streets while sharing the love of Jesus Christ. For Ida, providing medical services and sharing her faith were inseparable.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">From a small hospital… to 2,000 beds</h2>
            <p className="mb-4">Ida travelled internationally to raise support for a growing medical initiative, gathering support from around 40 churches and raising approximately $2 million for its development. The hospital expanded into a major institution with about 2,000 beds.</p>
            <p className="mb-4">Initially focused on women's healthcare, the ministry evolved into a comprehensive medical education and healthcare service for all. This vision led to the establishment of Christian Medical College, Vellore (CMC Vellore).</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">A dedication that lasted until the age of 90</h2>
            <p className="mb-4">Ida Scudder dedicated her life to medical service and her faith in God. At 85, she went to Kodaikanal to rest, and the Government of Tamil Nadu honoured her with a commemorative postage stamp. At 90, she collapsed unexpectedly, ending her remarkable journey. Her legacy continues in medicine, missions, and the lives she touched.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">When a cry becomes a calling</h2>
            <p className="mb-4">The story of Ida Scudder is not just about a hospital or a medical missionary; it's a tale of divine calling. Once claiming, “I will never become a missionary,” she ultimately dedicated her life to God’s work.</p>
            <p className="mb-4">Her journey began with a cry for help at her doorstep. The suffering she witnessed became a burden, which evolved into a calling and sparked a movement that transformed into a lasting legacy. What once seemed impossible became a reality through her complete surrender to God.</p>

            <div className="mt-16 rounded-[2rem] bg-cream p-12 text-center shadow-sm border border-border/40">
              <h3 className="font-serif text-3xl font-bold text-primary">A Challenge for Us Today</h3>
              <p className="mt-4 text-lg font-medium text-muted-foreground">Ida Scudder's life leaves us with a searching question:</p>
              <div className="mt-8 space-y-4">
                <p className="text-2xl font-medium text-teal-deep">“Could God be asking you to be the one who does something?”</p>
              </div>
              <p className="mt-8 text-muted-foreground">A need can become a burden. A burden can become a calling. And a surrendered life can become a blessing to generations.</p>
              <p className="mt-4 text-muted-foreground">Ida heard a cry and chose not to ignore it. She responded to the need she saw before her, and her one life became the beginning of a movement that touched countless lives.</p>
              <div className="mt-8 space-y-2">
                <p className="font-semibold text-primary">What is the cry knocking at your door today?</p>
                <p className="font-semibold text-primary">Is it simply a problem—or could it be God's calling?</p>
                <p className="font-semibold text-primary">Are you willing to answer?</p>
              </div>
            </div>
          </div>
        </article>
      </motion.main>
    </div>
  );
}
