'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createAppointment, getAppointmentsByDate } from '@/app/actions/booking';
import galaxy from '@/assets/uploads/galaxy.png';
import Image from 'next/image';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const TIME_SLOTS = [
	{ label: '09:00 AM', value: '09:00' },
	{ label: '10:00 AM', value: '10:00' },
	{ label: '11:00 AM', value: '11:00' },
	{ label: '01:30 PM', value: '13:30' },
	{ label: '02:30 PM', value: '14:30' },
	{ label: '04:00 PM', value: '16:00' },
	{ label: '05:00 PM', value: '17:00' },
	{ label: '06:00 PM', value: '18:00' },
];

const isSameDay = (d1: Date, d2: Date) =>
	d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

const formatShort = (date: Date) => ({
	weekday: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
	day: date.getDate(),
	month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date),
});

const formatSelected = (date: Date) =>
	new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);

export default function BookPage() {
	const [selectedDate, setSelectedDate] = useState<Date>(() => {
		const d = new Date();
		d.setHours(0, 0, 0, 0);
		return d;
	});

	const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
	const [bookedSlots, setBookedSlots] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		notes: '',
	});

	const next14Days = Array.from({ length: 7 }).map((_, i) => {
		const d = new Date();
		d.setHours(0, 0, 0, 0);
		d.setDate(d.getDate() + i);
		return d;
	});

	const fetchAvailability = useCallback(async () => {
		const appointments = await getAppointmentsByDate(selectedDate);
		const times = appointments.map((a: { time: string }) => a.time);
		setBookedSlots(times);
		if (selectedSlot && times.includes(selectedSlot)) {
			setSelectedSlot(null);
		}
	}, [selectedDate, selectedSlot]);

	useEffect(() => {
		fetchAvailability();
	}, [fetchAvailability]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedSlot) return;

		setIsLoading(true);
		setError(null);

		const result = await createAppointment({
			name: formData.name,
			email: formData.email,
			phone: '',
			notes: formData.notes,
			date: selectedDate,
			time: selectedSlot,
		});

		setIsLoading(false);

		if (result.success) {
			setIsSuccess(true);
		} else {
			setError(result.error || 'Something went wrong. Please try again.');
		}
	};

	const selectedSlotLabel = TIME_SLOTS.find((s) => s.value === selectedSlot)?.label ?? null;

	return (
		<div className="min-h-screen text-white" style={{ backgroundColor: '#111318', fontFamily: 'Inter, sans-serif' }}>
			<Navbar />

			{/* Main */}
			<main className="pt-32 pb-5 px-6 max-w-7xl mx-auto">
				{isSuccess ? (
					<SuccessState date={selectedDate} slot={selectedSlotLabel} />
				) : (
					<>
						{/* Hero */}
						<div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden z-0 pointer-events-none">
							<Image src={galaxy} alt="Galaxy" className="w-full h-full object-cover grayscale opacity-30" />
							<div
								className="absolute inset-0"
								style={{
									background:
										'linear-gradient(to right, #111318 0%, transparent 20%, transparent 80%, #111318 100%), linear-gradient(to bottom, #111318 0%, transparent 20%, transparent 80%, #111318 100%)',
								}}
							/>
						</div>
						<section className="relative z-10 max-w-3xl mb-12">
							<h1
								className="font-black leading-[0.95] mb-6"
								style={{ fontSize: 'clamp(2.5rem, 6vw, 2.5rem)', letterSpacing: '-0.04em' }}
							>
								Schedule a <span style={{ color: 'var(--secondary)' }}>Discovery Call.</span>
							</h1>
							<p
								className="text-sm md:text-[1rem] leading-relaxed font-medium max-w-xl"
								style={{ color: '#CCC3D7' }}
							>
								Choose a date and time that works best for you. Let&apos;s discuss your next project and build
								something extraordinary.
							</p>
						</section>

						{/* Booking Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-11 gap-12 items-start">
							{/* Left: Date + Time */}
							<div className="lg:col-span-7 relative z-10 space-y-12">
								{/* Date Picker */}
								<div className="space-y-6">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-bold uppercase tracking-[0.1em]" style={{ color: '#D3BBFF' }}>
											Select Date
										</h3>
										<span className="text-sm font-medium" style={{ color: '#CCC3D7' }}>
											{formatShort(selectedDate).month} {new Date().getFullYear()}
										</span>
									</div>

									<div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
										{next14Days.map((date) => {
											const info = formatShort(date);
											const active = isSameDay(selectedDate, date);

											return (
												<button
													key={date.toISOString()}
													onClick={() => setSelectedDate(date)}
													className="flex-shrink-0 w-20 h-24 rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer border-2"
													style={
														active
															? {
																	background: 'var(--secondary)',
																	borderColor: 'var(--secondary)',
																	boxShadow: '0 0 20px rgba(var(--secondary),0.3)',
																}
															: {
																	background: '#1a1b21',
																	borderColor: 'transparent',
																	opacity: 0.6,
																}
													}
													onMouseEnter={(e) => {
														if (!active) e.currentTarget.style.opacity = '1';
													}}
													onMouseLeave={(e) => {
														if (!active) e.currentTarget.style.opacity = '0.6';
													}}
												>
													<span
														className="text-xs font-bold uppercase tracking-widest mb-1"
														style={{ color: active ? 'white' : '#CCC3D7' }}
													>
														{info.weekday}
													</span>
													<span
														className="text-xl font-black"
														style={{ color: active ? 'white' : '#e2e2e9' }}
													>
														{info.day}
													</span>
												</button>
											);
										})}
									</div>
								</div>

								{/* Time Slots */}
								<div className="space-y-6">
									<h3 className="text-sm font-bold uppercase tracking-[0.1em]" style={{ color: '#D3BBFF' }}>
										Available Slots
									</h3>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
										{TIME_SLOTS.map((slot) => {
											const isBooked = bookedSlots.includes(slot.value);
											const now = new Date();
											const isToday = isSameDay(selectedDate, now);
											const slotHour = parseInt(slot.value.split(':')[0]);
											const isPast = isToday && slotHour <= now.getHours();
											const disabled = isBooked || isPast;
											const active = selectedSlot === slot.value;

											return (
												<button
													key={slot.value}
													disabled={disabled}
													onClick={() => setSelectedSlot(slot.value)}
													className="py-4 px-6 rounded-xl text-center font-bold transition-all duration-300 cursor-pointer"
													style={
														active
															? {
																	background: 'var(--secondary)',
																	color: 'white',
																	boxShadow: '0 4px 15px rgba(var(--secondary),0.3)',
																	border: 'none',
																}
															: disabled
																? {
																		background: '#0c0e13',
																		color: '#4a4455',
																		border: '1px solid transparent',
																		cursor: 'not-allowed',
																		textDecoration: 'line-through',
																	}
																: {
																		background: '#0c0e13',
																		color: '#e2e2e9',
																		border: '1px solid rgba(74,68,85,0.2)',
																	}
													}
													onMouseEnter={(e) => {
														if (!disabled && !active) {
															(e.currentTarget as HTMLButtonElement).style.background = '#33353a';
														}
													}}
													onMouseLeave={(e) => {
														if (!disabled && !active) {
															(e.currentTarget as HTMLButtonElement).style.background = '#0c0e13';
														}
													}}
												>
													{slot.label}
												</button>
											);
										})}
									</div>
								</div>
							</div>

							{/* Right: Form Card */}
							<aside className="lg:col-span-4 relative z-10 sticky top-28">
								<div
									className="rounded-xl p-8 border relative overflow-hidden shadow-2xl -mt-[6rem]"
									style={{ background: '#1a1b21', borderColor: 'rgba(74,68,85,0.1)' }}
								>
									{/* Glow bg */}
									<div
										className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none"
										style={{ background: 'rgba(109,40,217,0.15)', filter: 'blur(80px)' }}
									/>

									<h2 className="text-3xl font-black tracking-tight mb-8" style={{ color: '#e2e2e9' }}>
										Almost There.
									</h2>

									<div className="space-y-6">
										{/* Selected Slot Summary */}
										<div
											className="rounded-xl p-4 flex items-start gap-4"
											style={{ background: 'rgba(12,14,19,0.5)', alignItems: 'center' }}
										>
											<svg
												width="24"
												height="24"
												fill="none"
												stroke="#D3BBFF"
												strokeWidth="1.5"
												viewBox="0 0 24 24"
												className="flex-shrink-0 mt-0.5"
											>
												<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
												<line x1="16" y1="2" x2="16" y2="6" />
												<line x1="8" y1="2" x2="8" y2="6" />
												<line x1="3" y1="10" x2="21" y2="10" />
											</svg>
											<div>
												<p
													className="text-xs font-bold uppercase tracking-widest mb-1"
													style={{ color: '#CCC3D7' }}
												>
													Selected Slot
												</p>
												<p className="font-bold" style={{ color: '#e2e2e9' }}>
													{selectedSlot
														? `${formatSelected(selectedDate)} • ${selectedSlotLabel}`
														: 'No slot selected yet'}
												</p>
											</div>
										</div>

										{/* Form */}
										<form onSubmit={handleSubmit} className="space-y-4">
											<div>
												<label
													className="block mb-2 px-1 text-[10px] font-black uppercase tracking-widest"
													style={{ color: '#CCC3D7' }}
												>
													Full Name
												</label>
												<input
													required
													type="text"
													placeholder="Enter your name"
													value={formData.name}
													onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
													className="w-full rounded-xl p-4 text-sm transition-all outline-none"
													style={{
														background: '#0c0e13',
														border: '1px solid transparent',
														color: '#e2e2e9',
													}}
													onFocus={(e) => {
														e.currentTarget.style.borderColor = '#D3BBFF';
														e.currentTarget.style.boxShadow = '0 0 0 4px rgba(211,187,255,0.08)';
													}}
													onBlur={(e) => {
														e.currentTarget.style.borderColor = 'transparent';
														e.currentTarget.style.boxShadow = 'none';
													}}
												/>
											</div>

											<div>
												<label
													className="block mb-2 px-1 text-[10px] font-black uppercase tracking-widest"
													style={{ color: '#CCC3D7' }}
												>
													Email Address
												</label>
												<input
													required
													type="email"
													placeholder="Enter your email"
													value={formData.email}
													onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
													className="w-full rounded-xl p-4 text-sm transition-all outline-none"
													style={{
														background: '#0c0e13',
														border: '1px solid transparent',
														color: '#e2e2e9',
													}}
													onFocus={(e) => {
														e.currentTarget.style.borderColor = '#D3BBFF';
														e.currentTarget.style.boxShadow = '0 0 0 4px rgba(211,187,255,0.08)';
													}}
													onBlur={(e) => {
														e.currentTarget.style.borderColor = 'transparent';
														e.currentTarget.style.boxShadow = 'none';
													}}
												/>
											</div>

											<div>
												<label
													className="block mb-2 px-1 text-[10px] font-black uppercase tracking-widest"
													style={{ color: '#CCC3D7' }}
												>
													Project Details
												</label>
												<textarea
													rows={3}
													placeholder="Tell us about your vision..."
													value={formData.notes}
													onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
													className="w-full rounded-xl p-4 text-sm transition-all outline-none resize-none"
													style={{
														background: '#0c0e13',
														border: '1px solid transparent',
														color: '#e2e2e9',
													}}
													onFocus={(e) => {
														e.currentTarget.style.borderColor = '#D3BBFF';
														e.currentTarget.style.boxShadow = '0 0 0 4px rgba(211,187,255,0.08)';
													}}
													onBlur={(e) => {
														e.currentTarget.style.borderColor = 'transparent';
														e.currentTarget.style.boxShadow = 'none';
													}}
												/>
											</div>

											{error && (
												<div
													className="text-sm font-medium p-4 rounded-xl"
													style={{
														color: '#ffb4ab',
														background: 'rgba(147,0,10,0.2)',
														border: '1px solid rgba(255,180,171,0.2)',
													}}
												>
													{error}
												</div>
											)}

											<button
												type="submit"
												disabled={isLoading || !selectedSlot}
												className="w-full py-5 rounded-xl font-black uppercase text-sm tracking-widest mt-4 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed "
												style={{
													background: 'var(--secondary)',
													color: 'white',
													cursor: 'pointer',
													boxShadow: '0 8px 30px rgba(var(--secondary),0.4)',
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.background = 'var(--primary)';
													e.currentTarget.style.color = 'white';
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.background = 'var(--secondary)';
													e.currentTarget.style.color = 'white';
												}}
											>
												{isLoading ? 'Booking...' : 'Confirm Booking'}
											</button>
										</form>
									</div>
								</div>
							</aside>
						</div>
					</>
				)}
			</main>

			{/* Footer */}
			<Footer />

			{/* Background Decoration */}
			<div className="fixed top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none overflow-hidden">
				<img src={galaxy.src} alt="Background" className="w-full h-full object-cover grayscale" />
			</div>
		</div>
	);
}

function SuccessState({ date, slot }: { date: Date; slot: string | null }) {
	const formatted = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);

	return (
		<div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
			<div
				className="w-24 h-24 rounded-full flex items-center justify-center"
				style={{ background: 'rgba(109,40,217,0.2)', border: '1px solid rgba(211,187,255,0.3)' }}
			>
				<svg width="48" height="48" fill="none" stroke="#D3BBFF" strokeWidth="1.5" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h2 className="text-4xl font-black" style={{ color: '#e2e2e9', letterSpacing: '-0.04em' }}>
				You&apos;re Confirmed.
			</h2>
			<p className="text-lg max-w-sm leading-relaxed" style={{ color: '#CCC3D7' }}>
				Your discovery call is booked for <span style={{ color: '#D3BBFF', fontWeight: 700 }}>{formatted}</span>
				{slot && (
					<>
						{' '}
						at <span style={{ color: '#D3BBFF', fontWeight: 700 }}>{slot}</span>
					</>
				)}
				. Check your email for confirmation.
			</p>
			<Link
				href="/"
				className="mt-8 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
				style={{
					background: 'rgba(255,255,255,0.05)',
					border: '1px solid rgba(255,255,255,0.1)',
					color: '#e2e2e9',
				}}
			>
				Return to Website
			</Link>
		</div>
	);
}
