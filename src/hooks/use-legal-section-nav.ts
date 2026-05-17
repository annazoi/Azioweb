'use client';

import { useLenis } from 'lenis/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const SCROLL_OFFSET = 140;
const LENIS_SCROLL_DURATION_MS = 1300;
const NATIVE_SCROLL_DURATION_MS = 900;

export function useLegalSectionNav(sectionIdPrefix: string, sectionCount: number) {
	const lenis = useLenis();
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollLockRef = useRef(false);
	const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const getScrollY = useCallback(() => {
		return lenis?.scroll ?? window.scrollY;
	}, [lenis]);

	const getActiveSectionIndex = useCallback(() => {
		const scrollPos = getScrollY() + SCROLL_OFFSET;
		let current = 0;

		for (let index = 0; index < sectionCount; index++) {
			const el = document.getElementById(`${sectionIdPrefix}-${index}`);
			if (!el) continue;
			const sectionTop = el.getBoundingClientRect().top + getScrollY();
			if (sectionTop <= scrollPos) current = index;
		}

		return current;
	}, [getScrollY, sectionCount, sectionIdPrefix]);

	const updateActiveFromScroll = useCallback(() => {
		if (scrollLockRef.current) return;
		setActiveIndex(getActiveSectionIndex());
	}, [getActiveSectionIndex]);

	const unlockScroll = useCallback(() => {
		if (unlockTimerRef.current) {
			clearTimeout(unlockTimerRef.current);
			unlockTimerRef.current = null;
		}
		scrollLockRef.current = false;
		setActiveIndex(getActiveSectionIndex());
	}, [getActiveSectionIndex]);

	const scrollToSection = useCallback(
		(index: number) => {
			const el = document.getElementById(`${sectionIdPrefix}-${index}`);
			if (!el) return;

			if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

			scrollLockRef.current = true;
			setActiveIndex(index);

			const scheduleUnlock = (delayMs: number) => {
				unlockTimerRef.current = setTimeout(unlockScroll, delayMs);
			};

			if (lenis) {
				lenis.scrollTo(el, { offset: -120, duration: 1.1, onComplete: unlockScroll });
				scheduleUnlock(LENIS_SCROLL_DURATION_MS);
				return;
			}

			const top = el.getBoundingClientRect().top + window.scrollY - 120;
			window.scrollTo({ top, behavior: 'smooth' });
			scheduleUnlock(NATIVE_SCROLL_DURATION_MS);
		},
		[lenis, sectionIdPrefix, unlockScroll],
	);

	useEffect(() => {
		updateActiveFromScroll();

		if (lenis) {
			lenis.on('scroll', updateActiveFromScroll);
			return () => lenis.off('scroll', updateActiveFromScroll);
		}

		window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
		return () => window.removeEventListener('scroll', updateActiveFromScroll);
	}, [lenis, updateActiveFromScroll]);

	useEffect(() => {
		return () => {
			if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
		};
	}, []);

	return { activeIndex, scrollToSection };
}
