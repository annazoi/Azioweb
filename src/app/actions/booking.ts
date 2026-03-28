'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export async function getAppointmentsByDate(date: Date) {
	const startOfDay = new Date(date);
	startOfDay.setUTCHours(0, 0, 0, 0);

	const endOfDay = new Date(date);
	endOfDay.setUTCHours(23, 59, 59, 999);

	return await prisma.appointment.findMany({
		where: {
			date: {
				gte: startOfDay,
				lte: endOfDay,
			},
			status: {
				not: 'cancelled',
			},
		},
	});
}

export async function createAppointment(formData: {
	name: string;
	email: string;
	phone?: string;
	notes?: string;
	date: Date;
	time: string;
}) {
	try {
		const appointment = await prisma.appointment.create({
			data: {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				notes: formData.notes,
				date: new Date(formData.date),
				time: formData.time,
				status: 'pending',
			},
		});
		revalidatePath('/admin');
		return { success: true, appointment };
	} catch (error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
			return { success: false, error: 'This time slot is already booked.' };
		}

		return { success: false, error: 'Failed to create appointment.' };
	}
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
	try {
		await prisma.appointment.update({
			where: { id },
			data: { status },
		});
		revalidatePath('/admin');
		return { success: true };
	} catch (error) {
		return { success: false, error: 'Failed to update status.' };
	}
}

export async function deleteAppointment(id: string) {
	try {
		await prisma.appointment.delete({
			where: { id },
		});
		revalidatePath('/admin');
		return { success: true };
	} catch (error) {
		return { success: false, error: 'Failed to delete appointment.' };
	}
}

export async function getAllAppointments() {
	return await prisma.appointment.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});
}
