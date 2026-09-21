


"use client"
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/context/MessagesContext';
import { ArrowRight, Link, Sparkles, Send, Wand2, Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function Hero() {
    const [userInput, setUserInput] = useState('');
    const [isEnhancing, setIsEnhancing] = useState(false);
    const { messages, setMessages } = useContext(MessagesContext);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();

    const onGenerate = async (input) => {
        const msg = {
            role: 'user',
            content: input
        }
        setMessages(msg);
        const workspaceID = await CreateWorkspace({
            messages: [msg]
        });
        router.push('/workspace/' + workspaceID);
    }

    const enhancePrompt = async () => {
        if (!userInput) return;

        setIsEnhancing(true);
        try {
            const response = await fetch('/api/enhance-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userInput }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let enhancedText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if (data.chunk) {
                                enhancedText += data.chunk;
                                setUserInput(enhancedText);
                            }
                            if (data.done && data.enhancedPrompt) {
                                setUserInput(data.enhancedPrompt);
                            }
                        } catch (e) {
                            // Skip invalid JSON
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error enhancing prompt:', error);
        } finally {
            setIsEnhancing(false);
        }
    };

    const onSuggestionClick = (suggestion) => {
        setUserInput(suggestion);
    };

    // Framer Motion orchestration — one staggered entrance on load,
    // nothing re-fires on every re-render.
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 18 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className="min-h-screen bg-[#08080C] relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_24px]" />
            <motion.div
                aria-hidden
                className="absolute left-1/2 top-[-120px] h-[600px] w-[900px] -translate-x-1/2 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(124,92,255,0.22) 0%, rgba(236,72,153,0.10) 45%, transparent 70%)',
                    filter: 'blur(10px)',
                }}
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 180px 40px #08080C' }}
            />

            <div className="container mx-auto px-4 py-20 relative z-10">
                <motion.div
                    className="flex flex-col items-center justify-center space-y-14"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Hero Header */}
                    <div className="text-center space-y-7 max-w-3xl">
                        <motion.div
                            variants={item}
                            className="inline-flex items-center justify-center gap-2 bg-white/[0.04] rounded-full px-5 py-2 border border-white/10 backdrop-blur-sm"
                        >
            
                            <span className="text-[13px] text-zinc-300 font-medium tracking-wide">
                                Software development, accelerated by AI.
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={item}
                            className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05]"
                        >
                            "Build the unbuildable."{' '}
                            <span className="text-transparent bg-clip-text bg-[linear-gradient(120deg,#8B7CFF_0%,#E879F9_60%,#FDA4AF_100%)]">
                                "From wild idea to working code."
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={item}
                            className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed"
                        >
                            "From idea to production — powered by AI."
"Ship faster. Code smarter. Build with AI."
                        </motion.p>
                    </div>

                    {/* Input Section */}
                    <motion.div
                        variants={item}
                        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                        whileHover={{ borderColor: 'rgba(139,124,255,0.35)' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-6">
                            <div className="flex gap-4">
                                <textarea
                                    placeholder="Describe your vision..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    className="w-full bg-transparent border border-white/10 rounded-xl p-5 text-zinc-100 placeholder-zinc-500 focus:border-[#8B7CFF]/60 focus:ring-2 focus:ring-[#8B7CFF]/15 outline-none text-base h-40 resize-none transition-all duration-300"
                                    disabled={isEnhancing}
                                />
                                <div className="flex flex-col gap-2">
                                    <AnimatePresence>
                                        {userInput && (
                                            <motion.div
                                                key="actions"
                                                initial={{ opacity: 0, x: 8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 8 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex flex-col gap-2"
                                            >
                                                <motion.button
                                                    onClick={enhancePrompt}
                                                    disabled={isEnhancing}
                                                    whileHover={{ scale: isEnhancing ? 1 : 1.05 }}
                                                    whileTap={{ scale: isEnhancing ? 1 : 0.95 }}
                                                    className={`flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl px-4 py-4 transition-colors duration-200 ${isEnhancing ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                >
                                                    {isEnhancing ? (
                                                        <Loader2 className="h-6 w-6 animate-spin text-[#B9A6FF]" />
                                                    ) : (
                                                        <Wand2 className="h-6 w-6 text-[#B9A6FF]" />
                                                    )}
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => onGenerate(userInput)}
                                                    disabled={isEnhancing}
                                                    whileHover={{ scale: isEnhancing ? 1 : 1.05 }}
                                                    whileTap={{ scale: isEnhancing ? 1 : 0.95 }}
                                                    className={`flex items-center justify-center bg-[linear-gradient(120deg,#8B7CFF,#E879F9)] rounded-xl px-4 py-4 transition-shadow duration-200 shadow-[0_0_0_0_rgba(139,124,255,0)] hover:shadow-[0_0_24px_2px_rgba(139,124,255,0.35)] ${isEnhancing ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                >
                                                    <Send className="h-6 w-6 text-white" />
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Link className="h-5 w-5 text-zinc-500 hover:text-zinc-300 transition-colors duration-200" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Suggestions Grid */}
                    <motion.div variants={item} className="w-full max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {Lookup?.SUGGSTIONS.map((suggestion, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => onSuggestionClick(suggestion)}
                                    whileHover={{ y: -2, borderColor: 'rgba(139,124,255,0.4)' }}
                                    transition={{ duration: 0.2 }}
                                    className="group text-left p-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 rounded-xl transition-colors duration-200"
                                >
                                    <span className="text-zinc-400 group-hover:text-zinc-200 text-sm leading-relaxed transition-colors duration-200">
                                        {suggestion}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Hero;