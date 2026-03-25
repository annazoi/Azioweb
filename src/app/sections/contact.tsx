'use client';
import Textarea from '@/components/ui/textarea';
import Input from '@/components/ui/input';
import { motion } from 'framer-motion';
import StatusMessage from '@/components/ui/StatusMessage';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
	});
	const [status, setStatus] = useState<Status>('idle');

	const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, [field]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('sending');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			if (res.ok) {
				setStatus('success');
				setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
			} else {
				setStatus('error');
			}
		} catch {
			setStatus('error');
		}
	};

	return (
		<div
			id="contact"
			className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 flex flex-col lg:flex-col gap-6 lg:gap-16 mb-20"
		>
			<h3 className="header text-left text-gradient">Get In Touch</h3>
			<div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
				<div className="flex-1 flex flex-col gap-8 text-center lg:text-left">
					<div className="flex flex-col gap-4">
						<h2 className="text-4xl lg:text-5xl font-extrabold text-white">
							Let's build something <span className="text-gradient">amazing</span> together.
						</h2>
					</div>
					<p className="text-slate-400 text-lg leading-relaxed">
						Ready to transform your ideas into reality? Tell us about your project, and our team will get back to you with a comprehensive proposal.
					</p>
					<div className="flex flex-col gap-4 mt-4">
						<a
							href="mailto:hello@azioweb.com"
							className="text-xl font-semibold text-white hover:text-primary transition-colors"
						>
							hello@azioweb.com
						</a>
					</div>
				</div>

				<motion.div
					className="flex-1"
					animate={{ y: [0, -12, 0] }}
					transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
				>
					<form
						onSubmit={handleSubmit}
						className="glass p-8 lg:p-12 rounded-[3rem] shadow-2xl border-white/5 relative overflow-hidden group/form"
					>
						<div className="flex flex-col gap-8 relative z-10">
							<div className="flex flex-col sm:flex-row gap-8">
								<Input
									name="First name"
									label="First name *"
									value={form.firstName}
									required
									onChange={handleChange('firstName')}
								/>
								<Input
									name="Last name"
									label="Last name *"
									value={form.lastName}
									required
									onChange={handleChange('lastName')}
								/>
							</div>
							<div className="flex flex-col sm:flex-row gap-8">
								<Input
									name="Email address"
									label="Email address *"
									type="email"
									value={form.email}
									required
									onChange={handleChange('email')}
								/>
								<Input
									name="Phone number"
									label="Phone number"
									type="tel"
									value={form.phone}
									onChange={handleChange('phone')}
								/>
							</div>
							<div>
								<Textarea
									name="Your message"
									label="Message *"
									value={form.message}
									required
									onChange={handleChange('message')}
								/>
							</div>

							{status === 'success' && (
								<StatusMessage type="success" message="✅ Message sent! We'll get back to you within 24 hours." />
							)}
							{status === 'error' && (
								<StatusMessage
									type="error"
									message="❌ Something went wrong. Please try again or email us directly."
								/>
							)}

							<button
								type="submit"
								disabled={status === 'sending'}
								className="bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/80 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 mt-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
							>
								{status === 'sending' ? 'Sending…' : 'Send Message'}
							</button>
						</div>
						<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity" />
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default Contact;
