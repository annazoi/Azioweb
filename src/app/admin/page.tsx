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
			<div className="min-h-screen bg-background flex items-center justify-center p-4">
				<form className="glass p-12 rounded-[3rem] border-white/10 max-w-sm w-full text-center">
					<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6 font-primary">
						Admin Portal
					</h1>
					<input
						name="pw"
						type="password"
						placeholder="Enter access code"
						className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-center focus:outline-none focus:border-primary/50 mb-6 font-medium"
					/>
					<button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-widest text-sm">
						Access Dashboard
					</button>
				</form>
			</div>
		);
	}

	const appointments = await getAllAppointments();

	return (
		<div className="min-h-screen bg-background pb-20 pt-10 px-4">
			<div className="mx-auto max-w-7xl">
				<AdminDashboard appointments={appointments} />
			</div>
		</div>
	);
}
