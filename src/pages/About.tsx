import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '@/components/ui/PageTransition'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function About() {
  return (
    <PageTransition>
      <article className="pt-32 pb-section">
        <div className="max-w-wide mx-auto px-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-content mx-auto"
          >
            {/* Header */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-6"
            >
              About
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-display-lg mb-12"
            >
              I've started more businesses than I can count, lost everything twice, 
              designed beer cans for a living, watched 250 movies last year, and somehow 
              ended up building software for jazz clubs and film festivals.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-display text-display-sm text-text-muted mb-16"
            >
              I don't know what to call that, but I'm done apologizing for it.
            </motion.p>

            {/* Main Content */}
            <motion.div
              variants={containerVariants}
              className="prose-custom"
            >
              <motion.div variants={itemVariants}>
                <h2>The Short Version</h2>
                <p>
                  I'm Andy Petek. I've been an entrepreneur for fifteen years across beverage, 
                  media, design, and now technology. I run Nimbus Labs, where I build apps and 
                  software for arts organizations, nonprofits, and the beverage industry. I also 
                  still design beer cans because I'm one of the best in the country at it and 
                  some things are too good to give up entirely.
                </p>
                <p>
                  Everything I do falls under <em>Daydreamer</em>—a name that's less a company and 
                  more a personality. It's how I think about work: equal parts ambition and 
                  imagination, serious about craft but not about titles.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2>The Longer Version</h2>
                <p>
                  I started my first business in my twenties. Then another. Then another. Some 
                  worked, most didn't, all of them taught me something. I owned a cidery. Ran a 
                  podcast network. Built a PR agency. Consulted for companies across six continents 
                  on everything from brand strategy to product development.
                </p>
                <p>
                  The through line has always been <em>creative business</em>—helping people build 
                  things that matter, whether that's a beverage brand, a membership program, or a 
                  company culture. I think about business the way a designer thinks about design: 
                  as a craft that rewards obsession, iteration, and taste.
                </p>
                <p>
                  These days I'm focused on technology. Not because I suddenly became a tech person, 
                  but because I realized the communities I care about—small breweries, arts nonprofits, 
                  film festivals—need better tools than they have. So I started building them.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2>The Honest Version</h2>
                <p>
                  I'm a solopreneur. I've never had more than a few employees at once, and most of 
                  the time it's just me plus a rotating cast of collaborators, contractors, and 
                  occasionally interns. I've managed to do work that looks like it comes from a 
                  30-person agency because I care too much and sleep too little.
                </p>
                <p>
                  I've also hit rock bottom more than I've hit big success. That's the part nobody 
                  talks about—the years where you're not sure if you're being persistent or just 
                  stubborn, where quitting sounds responsible and keeping going sounds delusional. 
                  I kept going. Not because I'm special, but because somewhere along the way this 
                  stopped being what I do and became who I am.
                </p>
                <p>
                  My resume is unemployable. No HR system knows what to do with someone who's done 
                  all this. That used to feel like a liability. Now it feels like the only honest 
                  proof I have that I'm the kind of person who will figure it out no matter what.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2>What I'm Building Now</h2>
                <p>
                  <strong>Nimbus Labs</strong> is my technology company. We build apps and websites—primarily 
                  for arts organizations, nonprofits, and the beverage industry. Our core product is a 
                  loyalty and membership platform designed specifically for the businesses I know best.
                </p>
                <p>
                  I'm also developing a nonprofit arm that provides free tech solutions to community 
                  organizations. Partly because it's the right thing to do, partly because it gets me 
                  into the rooms I want to be in—arts boards, film festivals, cultural institutions.
                </p>
                <p>
                  On the side, I'm finally publishing the books I've been writing for years. Business 
                  frameworks, beverage industry insights, and eventually maybe something more personal 
                  about what all of this actually costs.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2>What I Actually Care About</h2>
                <p>
                  Film. I watch 250+ movies a year. It's not a personality trait, it's a genuine 
                  obsession with storytelling, craft, and the weird magic of how moving images make 
                  us feel things.
                </p>
                <p>
                  The beverage industry. I spent years in it and never fully left. There's something 
                  about the intersection of craft, community, and commerce that keeps pulling me back.
                </p>
                <p>
                  Small businesses and the people who run them. The ones who bet everything on an idea 
                  and are now figuring out how to make it work. I've been that person more times than 
                  I can count. I like helping other people through it.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2>Getting in Touch</h2>
                <p>
                  If you want to work together, book me for something, or just say hello—the best way 
                  is through my <Link to="/media">media page</Link> or LinkedIn. I read everything, though 
                  I can't always respond to everything.
                </p>
                <p>
                  And if you're another entrepreneur in the middle of figuring it out, wondering if you 
                  should keep going—you probably should. Not because it gets easier, but because the 
                  alternative is living with the question of what would have happened if you'd stayed.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </article>
    </PageTransition>
  )
}
