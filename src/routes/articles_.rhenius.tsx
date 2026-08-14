import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { motion } from "framer-motion";

export const Route = createFileRoute("/articles_/rhenius")({
  component: RheniusArticle,
});

function RheniusArticle() {
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
              The Apostle of Tirunelveli
            </h1>
            <p className="mt-6 text-xl font-medium text-muted-foreground">
              The Unforgettable Ministry Journey of C. D. Rhenius
            </p>
          </header>

          <div className="relative mb-16 aspect-video overflow-hidden rounded-[2.5rem] bg-black shadow-xl">
             <iframe 
               src="https://www.youtube.com/embed/T8qtywlMvJw" 
               title="The Apostle of Tirunelveli"
               className="absolute inset-0 h-full w-full border-0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          </div>

          <div className="prose prose-lg prose-teal mx-auto text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">A Divine Calling That Began in the Life of a Young Boy</h2>
            <p className="mb-4">C. D. Rhenius was born in Germany in 1790 and lost his father at six. Due to family circumstances, he began working young on his uncle’s estate, where he observed his uncle and aunt's family life.</p>
            <p className="mb-4">Initially, Rhenius had little interest in Christianity, but observing a family's faith sparked his curiosity. This led him to accept Jesus Christ as his personal Saviour and commit his life to the Lord. He felt a clear calling to become a missionary, undeterred by his family's opposition or his mother's tears, firmly deciding to follow God's call.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">A Journey Towards India</h2>
            <p className="mb-4">After completing his theological education, Rhenius was ordained in 1812 and set out for India. Travelling by sea, he first arrived at Tranquebar (Tharangambadi).</p>
            <p className="mb-4">His eagerness to learn Tamil was remarkable; within five months, he could speak and write it fluently. After moving to George Town in Madras (Chennai), he began his ministry not just from church platforms but also in the streets, engaging with people directly. Recognizing the importance of education, he established a school and a worship place. For Rhenius, the Gospel was meant to be integrated into the everyday lives of people.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">Annie Ammal — A Partner in Ministry</h2>
            <p className="mb-4">During his time in Chennai, Rhenius met a supportive Dutch family, leading to his marriage with Annie Ammal, who became his devoted partner in ministry. They faced profound sorrow when their one-and-a-half-year-old child passed away. Despite this loss, Rhenius remained committed to his calling. Recognizing his dedication and the spiritual needs of the Tirunelveli region, the Church Missionary Society chose to send him there.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">A New Chapter in the Land of Tirunelveli</h2>
            <p className="mb-4">When Rhenius arrived in Tirunelveli, he began his ministry in Vannarpettai, where caste divisions were prominent in society and the Church. One day, he noticed seminary students eating separately due to caste differences, which troubled him deeply. Believing caste discrimination had no place in the Church, Rhenius appointed individuals from diverse social backgrounds to teaching roles and included various communities in ministry as catechists.</p>
            <p className="mb-4">For him, the Gospel was not only about saving individuals; it was also about breaking down the walls that divided people.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">The Gospel Worker Who Travelled on Horseback</h2>
            <p className="mb-4">Rhenius had a vision for the people of Tirunelveli to know Jesus Christ. He travelled on horseback from village to village, preaching the Gospel, establishing churches, and strengthening believers. Historical accounts indicate he helped establish 371 churches in the Tirunelveli district. In 1825 alone, over 3,000 people in about 90 villages accepted Jesus as their personal Savior. Rhenius established 107 Christian schools in the Tirunelveli district, showing that the Gospel could transform individuals, families, communities, and generations.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">Not Just Churches—A Vision for a Community</h2>
            <p className="mb-4">Those who embraced the Gospel often faced significant opposition, leading to expulsion from their villages. Concerned for their well-being, Rhenius purchased the village of Puliyankurichi in 1828 to create such a settlement. With financial support from Germany and a benefactor named Lord Donner, the settlement was named Dohnavur. Over time, Dohnavur became a significant site in the history of Christianity in South India. He also mobilised ordinary believers for ministry. He established various associations within the churches, including the Mango Association and the Pilgrim Association.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">Unwavering Commitment in the Face of Opposition</h2>
            <p className="mb-4">Rhenius’s strong stand against caste discrimination was not accepted by everyone. Opposition against him increased, and eventually the CMS dismissed him from its service. He did not give up. He continued to run the race he God had placed before him.</p>
            <p className="mb-4">In 1838, Rhenius died after suffering from ill health. His body was buried at believed Adaikalapuram in Tirunelveli, in the heart of the community.</p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-4">A Challenge to the Church Today</h2>
            <p className="mb-4">“Can one person really make such a significant difference?”</p>
            <p className="mb-4">Today, God has given the Church many opportunities to serve, such as Sunday schools, youth ministries, and prayer groups. But when we encounter inequality, what do we do? Are we willing to speak up and seek change when the Church contradicts God’s purposes? Each of us is placed where we are for a reason, so we must ask ourselves if His vision is being fulfilled through our lives.</p>
            <p className="mb-4">The life of Rhenius gives a powerful answer to the question: “What can I do if I am only one person?” He began as one man. But his obedience touched thousands of lives. Through the churches he helped establish, generations came to know the Lord.</p>
            <p className="mb-4">A person may not possess great resources, but when that person embraces a God-given vision and commits wholeheartedly to it, God can use that life to transform an entire generation.</p>

            <div className="mt-16 rounded-[2rem] bg-cream p-12 text-center shadow-sm border border-border/40">
              <h3 className="font-serif text-3xl font-bold text-primary">The Question for Us</h3>
              <div className="mt-8 space-y-4">
                <p className="text-2xl font-medium text-teal-deep">“What can I do?”</p>
                <p className="text-2xl font-medium text-teal-deep">“Where has God placed me?”</p>
                <p className="text-2xl font-medium text-teal-deep">“What must I do to fulfil the vision He has given me there?”</p>
              </div>
            </div>
          </div>
        </article>
      </motion.main>
    </div>
  );
}
