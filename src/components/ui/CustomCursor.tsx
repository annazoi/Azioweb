'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor Component
 * A premium, smooth animated cursor that replaces the default browser pointer.
 * Features:
 * - Smooth lerp (interpolation) movement for the outer ring
 * - Instant movement for the inner dot
 * - Interactive states for buttons, links, and data-hover elements
 * - Responsive: automatically hides on touch devices
 */
export const CustomCursor = () => {
	const cursorRef = useRef<HTMLDivElement>(null);
	const dotRef = useRef<HTMLDivElement>(null);
	const [isHovering, setIsHovering] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Detect touch device
		const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		setIsMobile(touchDevice);
		if (touchDevice) return;

		const cursor = cursorRef.current;
		const dot = dotRef.current;
		if (!cursor || !dot) return;

		let mouseX = 0;
		let mouseY = 0;
		let cursorX = 0;
		let cursorY = 0;

		const onMouseMove = (e: MouseEvent) => {
			if (!isVisible) setIsVisible(true);
			mouseX = e.clientX;
			mouseY = e.clientY;

			// Inner dot follows instantly for precision
			dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
		};

		const animate = () => {
			// Lerp effect for smooth lag behind the mouse
			const lerpScale = 0.15;
			cursorX += (mouseX - cursorX) * lerpScale;
			cursorY += (mouseY - cursorY) * lerpScale;

			cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

			requestAnimationFrame(animate);
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const isInteractive =
				target.tagName === 'BUTTON' ||
				target.tagName === 'A' ||
				target.closest('button') ||
				target.closest('a') ||
				target.hasAttribute('data-hover') ||
				target.closest('[data-hover]');

			setIsHovering(!!isInteractive);
		};

		const handleMouseLeave = () => setIsVisible(false);
		const handleMouseEnter = () => setIsVisible(true);

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mouseleave', handleMouseLeave);
		document.addEventListener('mouseenter', handleMouseEnter);

		const animationId = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('mouseenter', handleMouseEnter);
			cancelAnimationFrame(animationId);
		};
	}, [isVisible]);

	if (isMobile) return null;

	return (
		<div
			className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
		>
			{/* Outer Circle (The Ring) */}
			<div
				ref={cursorRef}
				className={`fixed top-0 left-0 h-5 w-5 -ml-2.5 -mt-2.5 rounded-full border-2 border-primary transition-all duration-300 ease-out will-change-transform ${
					isHovering
						? 'opacity-0 scale-100'
						: 'opacity-100 scale-100 bg-transparent border-primary/70'
				}`}
			/>
			{/* Inner Dot */}
			<div
				ref={dotRef}
				className="fixed top-0 left-0 h-1.5 w-1.5 -ml-[3px] -mt-[3px] bg-primary rounded-full will-change-transform"
			/>
		</div>
	);
};
