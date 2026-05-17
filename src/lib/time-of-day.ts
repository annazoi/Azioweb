export type TimeOfDayTheme = {
	fill: string;
	glow: string;
	icon: string;
};

export function getHourInTimeZone(timeZone: string, date = new Date()) {
	return Number(
		new Intl.DateTimeFormat('en-GB', {
			hour: 'numeric',
			hour12: false,
			timeZone,
		}).format(date),
	);
}

export function isDaytimeHours(hour: number) {
	return hour >= 8 && hour < 22;
}

export function getTimeOfDayTheme(hour: number): TimeOfDayTheme {
	if (hour >= 5 && hour < 9) {
		return { fill: 'rgb(255, 214, 160)', glow: 'rgba(255, 160, 60, 0.18)', icon: '🌅' };
	}
	if (hour >= 9 && hour < 17) {
		return { fill: 'rgb(255, 255, 255)', glow: 'rgba(0, 85, 255, 0)', icon: '☀️' };
	}
	if (hour >= 17 && hour < 20) {
		return { fill: 'rgb(255, 178, 120)', glow: 'rgba(255, 100, 50, 0.14)', icon: '🌇' };
	}
	if (hour >= 20 && hour < 23) {
		return { fill: 'rgb(196, 178, 255)', glow: 'rgba(120, 90, 220, 0.16)', icon: '🌆' };
	}
	return { fill: 'rgb(168, 178, 255)', glow: 'rgba(80, 100, 200, 0.14)', icon: '🌙' };
}

export function formatLocalTime(timeZone: string, date = new Date()) {
	return date.toLocaleTimeString('en-GB', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		timeZone,
	});
}
