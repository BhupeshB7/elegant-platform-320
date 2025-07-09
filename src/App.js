
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, User, Palette, PenTool, Mail, Send, CheckCircle, AlertTriangle, Loader2, ArrowRight, Twitter, Instagram, Linkedin, Menu, X } from 'lucide-react';

const useScrollSpy = (sectionRefs, options) => {
    const [activeSection, setActiveSection] = useState('');
    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        const { current: currentObserver } = observer;
        sectionRefs.forEach(ref => {
            if (ref.current) {
                currentObserver.observe(ref.current);
            }
        });

        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [sectionRefs, options]);

    return activeSection;
};

const PhotographerPortfolioPage = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('idle');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const projects = [
        { id: 1, title: 'Urban Elegance', category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1020&q=80' },
        { id: 2, title: 'Mountain Majesty', category: 'Landscape', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' },
        { id: 3, title: 'The Vows', category: 'Wedding', imageUrl: 'https://images.unsplash.com/photo-1523438996277-c20d62a148a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80' },
        { id: 4, title: 'Concrete Jungle', category: 'Architecture', imageUrl: 'https://images.unsplash.com/photo-1589995549219-75d343467dd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80' },
        { id: 5, title: 'Silent Witness', category: 'Nature', imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1874&q=80' },
        { id: 6, title: 'Candid Moments', category: 'Portrait', imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80' },
    ];

    const skills = [
        { icon: Camera, title: 'Portrait Photography', description: 'Crafting compelling stories through intimate and expressive portraits.' },
        { icon: Palette, title: 'Landscape & Nature', description: 'Capturing the breathtaking beauty and raw power of the natural world.' },
        { icon: PenTool, title: 'Advanced Retouching', description: 'Expert post-processing with Lightroom & Photoshop for flawless results.' },
        { icon: User, title: 'Client Collaboration', description: 'Working closely with clients to bring their creative vision to life.' },
    ];

    const blogPosts = [
        { id: 1, title: 'The Golden Hour: A Photographer\'s Best Friend', excerpt: 'Discover the magic of shooting during the golden hour and how to make the most of it...', imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' },
        { id: 2, title: '5 Composition Rules to Break for More Creative Shots', excerpt: 'Sometimes, the best photos come from breaking the rules. Here are five to try...', imageUrl: 'https://images.unsplash.com/photo-1542038784-56eD6D458854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1056&q=80' },
        { id: 3, title: 'A Guide to Choosing the Right Lens for Your Style', excerpt: 'From wide-angle to telephoto, we break down which lens is best for your work.', imageUrl: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1856&q=80' },
    ];

    const sectionIds = ['home', 'about', 'projects', 'skills', 'blog', 'contact'];
    const sectionRefs = sectionIds.map(() => useRef(null));
    const activeSection = useScrollSpy(sectionRefs, { rootMargin: '-50% 0px -50% 0px' });
    
    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'blog', label: 'Blog' },
        { id: 'contact', label: 'Contact' }
    ];

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    }, [errors]);

    const validateForm = () => {
        const newErrors = {};
        if (!formState.name.trim()) newErrors.name = 'Name is required.';
        if (!formState.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formState.subject.trim()) newErrors.subject = 'Subject is required.';
        if (!formState.message.trim()) newErrors.message = 'Message is required.';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmissionStatus('loading');
        setTimeout(() => {
            const success = Math.random() > 0.2; // Simulate success/failure
            if (success) {
                setSubmissionStatus('success');
                setFormState({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmissionStatus('error');
            }
        }, 2000);
    };

    const handleScrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false); // Close mobile menu after navigation
        }
    };

    return (
        <div className="bg-slate-900 text-slate-300 font-sans leading-relaxed">
            <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 transition-all duration-300">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#home" onClick={(e) => { e.preventDefault(); handleScrollTo('home'); }} className="text-2xl font-bold text-white tracking-wider">
                        <span className="text-emerald-400">A</span>LEX <span className="text-emerald-400">D</span>OE
                    </a>
                    <ul className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    onClick={(e) => { e.preventDefault(); handleScrollTo(link.id); }}
                                    className={`text-sm font-medium transition-colors duration-300 hover:text-emerald-400 ${activeSection === link.id ? 'text-emerald-400' : 'text-slate-300'}`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                     <button className="hidden lg:inline-block bg-emerald-500 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-emerald-600 transition-colors duration-300" onClick={() => handleScrollTo('contact')}>
                        Hire Me
                    </button>
                    <button
                        className="lg:hidden text-white focus:outline-none"
                        aria-label="Open navigation menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-menu"
                className={`fixed inset-0 z-50 bg-slate-950 transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex justify-end p-6">
                    <button
                        className="text-white focus:outline-none"
                        aria-label="Close navigation menu"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>
                <nav className="flex flex-col items-center justify-center flex-grow py-12">
                    <ul className="space-y-8">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    onClick={(e) => { e.preventDefault(); handleScrollTo(link.id); }}
                                    className="text-3xl font-semibold text-slate-300 hover:text-emerald-400 transition-colors duration-300 block py-2"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <button onClick={() => handleScrollTo('contact')} className="inline-flex items-center bg-emerald-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-emerald-600 transition-colors duration-300 shadow-lg shadow-emerald-500/20 mt-4 w-full justify-center">
                                Hire Me <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <main>
                <section id="home" ref={sectionRefs[0]} className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 1)), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')` }}>
                    <div className="text-center px-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in-down">Capturing Life, Creatively.</h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            I'm Alex Doe, a photographer specializing in freezing moments in time, turning fleeting emotions into lasting art.
                        </p>
                        <button onClick={() => handleScrollTo('projects')} className="inline-flex items-center bg-emerald-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-emerald-600 transition-colors duration-300 shadow-lg shadow-emerald-500/20 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                            View My Work <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </section>

                <section id="about" ref={sectionRefs[1]} className="py-20 md:py-32">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="animate-fade-in-right">
                                <img src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80" alt="Photographer Alex Doe" className="rounded-lg shadow-2xl w-full h-auto object-cover aspect-square" />
                            </div>
                            <div className="animate-fade-in-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
                                <p className="text-emerald-400 text-lg font-semibold mb-6">A Story in Every Frame</p>
                                <p className="mb-4">
                                    For over a decade, photography has been more than my profession; it's my way of seeing the world. I find beauty in the mundane, stories in the silence, and art in the authentic. My journey began with a simple film camera, and that passion for tangible, emotional imagery continues to drive my digital work today.
                                </p>
                                <p>
                                    I believe in collaboration, in understanding your vision and bringing it to life with technical skill and creative flair. Let's create something unforgettable together.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" ref={sectionRefs[2]} className="py-20 md:py-32 bg-slate-950">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Project Showcase</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">A selection of my favorite work across various disciplines.</p>
                        </div>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
                            {projects.map((project, index) => (
                                <div key={project.id} className="mb-8 break-inside-avoid group relative overflow-hidden rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                                    <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/70 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div>
                                            <span className="text-sm text-emerald-400 font-semibold">{project.category}</span>
                                            <h3 className="text-xl font-bold text-white mt-1">{project.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="skills" ref={sectionRefs[3]} className="py-20 md:py-32">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Expertise</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">The skills and tools I use to bring your vision to life.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                           {skills.map((skill, index) => (
                               <div key={index} className="bg-slate-800 p-8 rounded-lg text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                                   <div className="inline-block p-4 bg-emerald-500/10 rounded-full mb-6">
                                       <skill.icon className="h-10 w-10 text-emerald-400" />
                                   </div>
                                   <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
                                   <p className="text-slate-400 text-sm">{skill.description}</p>
                               </div>
                           ))}
                        </div>
                    </div>
                </section>

                <section id="blog" ref={sectionRefs[4]} className="py-20 md:py-32 bg-slate-950">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">From My Journal</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">Insights, stories, and tips from my journey in photography.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post, index) => (
                                <div key={post.id} className="bg-slate-800 rounded-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                                    <div className="overflow-hidden">
                                        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-3 h-14">{post.title}</h3>
                                        <p className="text-slate-400 text-sm mb-4 h-20">{post.excerpt}</p>
                                        <a href="#" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors duration-300 inline-flex items-center">
                                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="contact" ref={sectionRefs[5]} className="py-20 md:py-32">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Create Together</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">Have a project in mind? I'd love to hear about it.</p>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                                        <input type="text" id="name" name="name" value={formState.name} onChange={handleInputChange} className={`w-full bg-slate-800 border rounded-md p-3 text-white focus:outline-none focus:ring-2 transition ${errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:ring-emerald-500'}`} />
                                        {errors.name && <p className="text-rose-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Your Email</label>
                                        <input type="email" id="email" name="email" value={formState.email} onChange={handleInputChange} className={`w-full bg-slate-800 border rounded-md p-3 text-white focus:outline-none focus:ring-2 transition ${errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:ring-emerald-500'}`} />
                                        {errors.email && <p className="text-rose-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                                    <input type="text" id="subject" name="subject" value={formState.subject} onChange={handleInputChange} className={`w-full bg-slate-800 border rounded-md p-3 text-white focus:outline-none focus:ring-2 transition ${errors.subject ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:ring-emerald-500'}`} />
                                    {errors.subject && <p className="text-rose-500 text-sm mt-1">{errors.subject}</p>}
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                    <textarea id="message" name="message" rows="5" value={formState.message} onChange={handleInputChange} className={`w-full bg-slate-800 border rounded-md p-3 text-white focus:outline-none focus:ring-2 transition ${errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:ring-emerald-500'}`}></textarea>
                                    {errors.message && <p className="text-rose-500 text-sm mt-1">{errors.message}</p>}
                                </div>
                                <div className="text-center">
                                    <button type="submit" disabled={submissionStatus === 'loading'} className="inline-flex items-center justify-center bg-emerald-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-emerald-600 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed w-full md:w-auto">
                                        {submissionStatus === 'loading' ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <Send className="mr-2 h-5 w-5" />}
                                        {submissionStatus === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                            {submissionStatus === 'success' && (
                                <div className="mt-6 flex items-center p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-md">
                                    <CheckCircle className="h-6 w-6 mr-3" />
                                    <p>Your message has been sent successfully! I'll get back to you soon.</p>
                                </div>
                            )}
                            {submissionStatus === 'error' && (
                                <div className="mt-6 flex items-center p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-md">
                                    <AlertTriangle className="h-6 w-6 mr-3" />
                                    <p>Something went wrong. Please try again later.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-950 border-t border-slate-800">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Alex Doe. All Rights Reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300" aria-label="Twitter"><Twitter /></a>
                        <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300" aria-label="Instagram"><Instagram /></a>
                        <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300" aria-label="LinkedIn"><Linkedin /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PhotographerPortfolioPage;
