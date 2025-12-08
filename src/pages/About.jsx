import { Info } from "lucide-react"
import SwitchThemeButtonHomeAbout from "@/components/mycomponents/switchThemeButtons/SwitchThemeButtonHomeAbout"
import { useAuth } from "@/contexts/AuthContext"
import { Navigate } from "react-router"

const About = () => {
    const { isAuthenticated } = useAuth()
    if (isAuthenticated) return <Navigate to="/" />
    return (
        <div className="bg-background-home">
            <div className="mx-auto w-17/20 sm:text-center min-h-[calc(100dvh-141.6px)] lg:min-h-[calc(100dvh-149.6px)] pt-10 pb-14 lg:pt-14 lg:pb-18">
                <h1 className="font-heading text-[40px] sm:text-[54px] lg:text-[68px] leading-tight mb-4 lg:mb-8">Everyone has a story to tell</h1>
                <p className="text-xl lg:text-2xl leading-relaxed">
                    In a world overflowing with noise, filters, and fleeting trends, Write Space was born out of a simple idea — to bring words back to the center. It’s not just a platform; it’s a quiet corner of the internet built for people who still believe in the power of writing. Write Space is where your thoughts breathe freely. It’s designed for thinkers, creators, storytellers, and anyone who feels most alive when putting words together. Whether you’re writing a late-night reflection, a short poem, a long essay, or simply a line that means something to you — this is your space to create without noise, judgment, or distraction.
                    <br />
                    At its core, Write Space celebrates authentic expression. We believe that writing doesn’t need perfection — it needs honesty. That’s why every element of Write Space is crafted to help you focus on what matters: your words. The interface is clean, minimal, and thoughtfully built to keep you in flow. Dark and light themes adapt to your mood. Your posts, drafts, and thoughts live together in a simple layout that feels natural, not technical.
                    <br />
                    But Write Space isn’t just about solitude — it’s also about connection. Behind every sentence lies a story, and behind every story, a person. Here, you can explore what others have written, follow writers who inspire you, and build genuine connections through ideas. It’s a community that values depth over drama and creativity over competition.
                    <br />
                    We built Write Space for the kind of people who pause to observe, who think before they speak, who find beauty in a well-written sentence. For the ones who don’t write for likes, but for clarity. For those who believe words can heal, transform, and start revolutions in silence.
                    <br />
                    Every post you write becomes a part of something larger — a collective space of thoughts, perspectives, and emotions. It’s not about going viral; it’s about being real.
                    <br />
                    So, take a deep breath. Forget the rush. Open your Write Space. Type something honest. Watch your words find their rhythm, and let them remind you of who you are.
                    <br />
                    Write Space isn’t here to change the internet — it’s here to slow it down. To remind us that we still have time to think, to feel, and to write. Because sometimes, all we need is a blank page and the courage to fill it.
                </p>
            </div>
            <div className="border-t border-t-foreground flex justify-center">
                <div className="h-15 lg:h-17 w-17/20 flex items-center sm:justify-center gap-3 lg:gap-4">
                    <Info className="lg:w-7 lg:h-7" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
                    <SwitchThemeButtonHomeAbout />
                </div>
            </div>
        </div>
    )
}

export default About