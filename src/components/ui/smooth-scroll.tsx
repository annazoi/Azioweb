'use client';

import { cancelFrame, frame } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import 'lenis/dist/lenis.css';

const LENIS_OPTIONS = {
	lerp: 0.1,
	autoRaf: false,
	smoothWheel: true,
	autoToggle: true,
	anchors: { offset: -88 },
} as const;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<LenisRef>(null);
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => setEnabled(!mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, []);

	useEffect(() => {
		if (!enabled) return;

		const onFrame = (data: { timestamp: number }) => {
			lenisRef.current?.lenis?.raf(data.timestamp);
		};

		frame.update(onFrame, true);

		return () => cancelFrame(onFrame);
	}, [enabled]);

	if (!enabled) {
		return <>{children}</>;
	}

	return (
		<ReactLenis root options={LENIS_OPTIONS} ref={lenisRef}>
			{children}
		</ReactLenis>
	);
}
