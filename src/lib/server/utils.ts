import crypto from 'crypto';

export const generateUserAuthToken = (): string => {
	return crypto.randomUUID();
};
