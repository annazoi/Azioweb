'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDaysIcon, ClockIcon, CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { createAppointment, getAppointmentsByDate } from '@/app/actions/booking';

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

export default function BookPage() {
	const [selectedDate, setSelectedDate] = useState<Date>(() => {
		const d = new Date();
		d.setHours(0, 0, 0, 0);
		return d;
	});
	const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
	const [bookedSlots, setBookedSlots] = useState<string[]>([]);
	const [step, setStep] = useState(1); // 1: Date/Time, 2: Form, 3: Success
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		notes: '',
	});

	const next14Days = Array.from({ length: 14 }).map((_, i) => {
		const d = new Date();
		d.setHours(0, 0, 0, 0);
		d.setDate(d.getDate() + i);
		return d;
	});

	useEffect(() => {
		async function fetchAvailability() {
			const appointments = await getAppointmentsByDate(selectedDate);
			setBookedSlots(appointments.map((a: any) => a.time));
			if (selectedSlot && appointments.some((a: any) => a.time === selectedSlot)) {
				setSelectedSlot(null);
			}
		}
		fetchAvailability();
	}, [selectedDate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedSlot) return;

		setIsLoading(true);
		setError(null);

		const result = await createAppointment({
			...formData,
			date: selectedDate,
			time: selectedSlot,
		});

		setIsLoading(false);

		if (result.success) {
			setStep(3);
		} else {
			setError(result.error || 'Something went wrong.');
		}
	};

	const formatDateLabel = (date: Date) => {
		return {
			weekday: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
			day: date.getDate(),
			month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
			full: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date),
		};
	};

	const isSameDay = (d1: Date, d2: Date) => {
		return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
	};

	return (
		<div className="min-h-screen bg-background pb-20 pt-10 px-4">
			<div className="mx-auto max-w-4xl">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
				>
					<ArrowLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
					<span>Back to Home</span>
				</Link>

				{step === 1 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex flex-col gap-10"
					>
						<div className="text-center lg:text-left flex flex-col gap-4">
							<h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight">
								Schedule a <span className="text-gradient">Discovery Call.</span>
							</h1>
							<p className="text-slate-400 text-lg">
								Choose a date and time that works best for you. Let's discuss your next project.
							</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
							{/* Date Picker */}
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-widest text-sm">
									<CalendarDaysIcon className="size-5" />
									<span>Select Date</span>
								</div>
								<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-3">
									{next14Days.map((date) => {
										const info = formatDateLabel(date);
										const active = isSameDay(selectedDate, date);
										return (
											<button
												key={date.toISOString()}
												onClick={() => setSelectedDate(date)}
												className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-1 ${
													active
														? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
														: 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/10'
												}`}
											>
												<span className="text-xs uppercase font-bold opacity-60">{info.weekday}</span>
												<span className="text-xl font-bold">{info.day}</span>
												<span className="text-xs font-medium">{info.month}</span>
											</button>
										);
									})}
								</div>
							</div>

							{/* Time Slots */}
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-widest text-sm">
									<ClockIcon className="size-5" />
									<span>Available Times</span>
								</div>
								<div className="grid grid-cols-2 gap-3">
									{TIME_SLOTS.map((slot) => {
										const isBooked = bookedSlots.includes(slot);
										const now = new Date();
										const isToday = isSameDay(selectedDate, now);
										const isPast = isToday && parseInt(slot.split(':')[0]) <= now.getHours();
										const disabled = isBooked || isPast;

										return (
											<button
												key={slot}
												disabled={disabled}
												onClick={() => setSelectedSlot(slot)}
												className={`p-4 rounded-2xl border transition-all text-center font-bold ${
													selectedSlot === slot
														? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
														: disabled
															? 'bg-white/5 border-transparent text-slate-600 cursor-not-allowed line-through'
															: 'bg-white/5 border-white/10 text-white hover:border-white/30 hover:bg-white/10'
												}`}
											>
												{slot}
											</button>
										);
									})}
								</div>
								{selectedSlot && (
									<motion.button
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										onClick={() => setStep(2)}
										className="mt-6 w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] transition-all"
									>
										Confirm for {formatDateLabel(selectedDate).full} at {selectedSlot}
									</motion.button>
								)}
							</div>
						</div>
					</motion.div>
				)}

				{step === 2 && (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						className="glass p-8 lg:p-12 rounded-[3rem] border-white/10"
					>
						<button
							onClick={() => setStep(1)}
							className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 text-sm"
						>
							<ArrowLeftIcon className="size-4" /> Change Date/Time
						</button>
						<h2 className="text-3xl font-bold text-white mb-8">
							Tell us about your <span className="text-gradient">Project.</span>
						</h2>

						<form onSubmit={handleSubmit} className="flex flex-col gap-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="flex flex-col gap-2">
									<label className="text-slate-300 text-sm font-medium">Full Name *</label>
									<input
										required
										value={formData.name}
										onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
										className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label className="text-slate-300 text-sm font-medium">Email Address *</label>
									<input
										type="email"
										required
										value={formData.email}
										onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
										className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
									/>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-slate-300 text-sm font-medium">Phone (Optional)</label>
								<input
									value={formData.phone}
									onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
									className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-slate-300 text-sm font-medium">Notes / Project Idea</label>
								<textarea
									rows={4}
									value={formData.notes}
									onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
									className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none"
									placeholder="Tell us what you're building..."
								/>
							</div>

							{error && (
								<div className="text-red-400 text-sm font-medium bg-red-400/10 p-4 rounded-xl border border-red-400/20">
									{error}
								</div>
							)}

							<button
								type="submit"
								disabled={isLoading}
								className="mt-4 w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 transition-all font-xl"
							>
								{isLoading
									? 'Booking...'
									: `Schedule Call for ${formatDateLabel(selectedDate).month} ${formatDateLabel(selectedDate).day} @ ${selectedSlot}`}
							</button>
						</form>
					</motion.div>
				)}

				{step === 3 && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className="flex flex-col items-center justify-center gap-6 py-20 text-center"
					>
						<div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
							<CheckCircleIcon className="size-16 text-green-500" />
						</div>
						<h2 className="text-4xl font-extrabold text-white">Appointment Scheduled!</h2>
						<p className="text-slate-400 text-lg max-w-sm">
							We've received your request for {formatDateLabel(selectedDate).full} at {selectedSlot}. Check your
							email for confirmation.
						</p>
						<Link
							href="/"
							className="mt-8 bg-white/5 border border-white/10 px-8 py-4 rounded-full font-bold text-white hover:bg-white/10 transition-all"
						>
							Return to Website
						</Link>
					</motion.div>
				)}
			</div>
		</div>
	);
}
