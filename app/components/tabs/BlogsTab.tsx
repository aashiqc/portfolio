import { useRef, useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import gsap from 'gsap';

const blogs = [
    {
        title: "Optimizing the Void: React Performance at Scale",
        date: "2024-03-15",
        readTime: "5 min read",
        snippet: "Deep dive into memoization, virtual DOM diffing strategies, and preventing unnecessary re-renders in complex dashboards.",
        tags: ["React", "Performance"]
    },
    {
        title: "Building Digital Gardens in 3D",
        date: "2024-02-10",
        readTime: "8 min read",
        snippet: "How to leverage Three.js and R3F to create immersive web experiences that don't melt GPUs.",
        tags: ["Three.js", "WebGL"]
    },
    {
        title: "The Ethics of AI Cognition",
        date: "2024-01-22",
        readTime: "6 min read",
        snippet: "Exploring the boundaries of LLMs and the future of human-AI collaboration in software engineering.",
        tags: ["AI", "Philosophy"]
    }
];

export default function BlogsTab() {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".blog-row",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="p-8 h-full overflow-y-auto bg-paper">
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
                {blogs.map((blog, i) => (
                    <div key={i} className="blog-row group relative bg-white border-2 border-black rounded-lg p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                            <h3 className="font-black text-lg text-ink-primary group-hover:text-orange-600 transition-colors">
                                {blog.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                                <Clock size={12} />
                                <span>{blog.readTime}</span>
                            </div>
                        </div>

                        <p className="text-ink-secondary text-sm mb-4 leading-relaxed">
                            {blog.snippet}
                        </p>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                            <div className="flex gap-2">
                                {blog.tags.map(t => (
                                    <span key={t} className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-[10px] font-bold text-gray-600 uppercase">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <span className="flex items-center gap-1 text-sm font-bold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                Read Article <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
