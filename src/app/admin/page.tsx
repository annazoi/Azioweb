import { getAllAppointments } from '@/app/actions/booking';
import AdminDashboard from './AdminDashboard';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Admin Dashboard | Azioweb',
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ pw?: string }> }) {
	const { pw } = await searchParams;

	// Simple protection as requested (e.g. /admin?pw=admin123)
	const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

	if (pw !== ADMIN_PASSWORD) {
		return (
			<div className="min-h-screen bg-[#0d0d12] flex flex-col items-center justify-center p-4 selection:bg-[#6b58ff]/30">
				<div className="w-full max-w-[440px]">
					<form className="bg-[#141418] p-10 sm:p-12 rounded-[2rem] border border-white/[0.03] shadow-2xl flex flex-col w-full relative z-10">
						<div className="mb-3">
							<span className="text-[10px] font-bold tracking-[0.25em] text-[#6b58ff] uppercase">
								Logiqdev System
							</span>
						</div>
						<h1 className="text-4xl font-extrabold text-white tracking-tight mb-10">
							Admin Portal
						</h1>

						<div className="flex flex-col mb-8">
							<label className="text-[10px] font-bold tracking-[0.1em] text-slate-500 uppercase mb-3">
								Enter Access Code
							</label>
							<input
								name="pw"
								type="password"
								className="w-full bg-white rounded-xl px-6 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6b58ff]/30 transition-all font-bold text-lg"
							/>
						</div>

						<button className="w-full py-4 bg-[#6b58ff] hover:bg-[#5a48e6] text-white font-bold rounded-xl shadow-[0_0_25px_rgba(107,88,255,0.35)] transition-all flex items-center justify-center gap-3 tracking-wide mb-8">
							ACCESS DASHBOARD
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						</button>

						<div className="flex items-center justify-between">
							<a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors tracking-widest uppercase">
								Lost Access?
							</a>
							<a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors tracking-widest uppercase">
								Request Support
							</a>
						</div>
					</form>

					<div className="mt-12 flex items-center justify-center gap-2 text-[#4a4a58]">
						<svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
						</svg>
						<span className="text-[10px] font-bold tracking-[0.25em] uppercase">End-to-end encrypted node</span>
					</div>
				</div>
			</div>
		);
	}

	const appointments = await getAllAppointments();

	return <AdminDashboard appointments={appointments} />;
}
