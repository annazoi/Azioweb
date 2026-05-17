'use client';

import { useEffect, useState } from 'react';
import { formatLocalTime, getHourInTimeZone, getTimeOfDayTheme } from '@/lib/time-of-day';

export function useLocalTime(timeZone: string) {
	const [tick, setTick] = useState(0);

	useEffect(() => {
		const id = window.setInterval(() => setTick((n) => n + 1), 30000);
		return () => window.clearInterval(id);
	}, []);

	const date = new Date();
	const time = formatLocalTime(timeZone, date);
	const hour = getHourInTimeZone(timeZone, date);
	const theme = getTimeOfDayTheme(hour);

	return { time, hour, theme, tick };
}
