import crypto from 'crypto';
import { SUMSUB_API_BASE, SUMSUB_SECRET, SUMSUB_TOKEN } from '$env/static/private';
import type { LevelName } from '$lib/types';

const generateHmacSha256 = (key: string, data: string): string => {
	const hmac = crypto.createHmac('sha256', key);
	hmac.update(data);
	return hmac.digest('hex');
};

export const getSumsubAccessToken = async (
	userId: string,
	levelName: LevelName,
	tokenTtl: number
) => {
	const reqMethod = 'POST';

	const endpoint = `/resources/accessTokens?userId=${userId}&levelName=${levelName}&ttlInSecs=${tokenTtl}`;
	const currentTimestamp = Math.floor(Date.now() / 1000);
	const signature = generateHmacSha256(SUMSUB_SECRET, `${currentTimestamp}${reqMethod}${endpoint}`);

	const reqUrl = `${SUMSUB_API_BASE}${endpoint}`;
	const reqHeaders = {
		'X-App-Token': SUMSUB_TOKEN,
		'X-App-Access-Sig': signature,
		'X-App-Access-Ts': String(currentTimestamp)
	};

	console.log('Request URL:', reqUrl);
	console.log('Request Headers:', reqHeaders);

	try {
		const accessTokenResponse = await fetch(reqUrl, {
			method: reqMethod,
			headers: reqHeaders
		});

		console.log('Response Status:', accessTokenResponse.status);
		console.log('Response Headers:', accessTokenResponse.headers);

		if (accessTokenResponse.ok) {
			const responseBody = await accessTokenResponse.text();
			console.log('Response Body:', responseBody);

			const { token } = JSON.parse(responseBody);
			console.log('Received Access Token:', token);
			return token;
		} else {
			const errorResponse = await accessTokenResponse.text();
			console.error('Error Response:', errorResponse);
			throw new Error('Failed to fetch access token');
		}
	} catch (error) {
		console.error('Error fetching access token:', error);
		throw error;
	}
};

export const getSumsubVerificationResult = async (userId: string) => {
	const reqMethod = 'GET';

	const endpoint = `/resources/applicants/-;externalUserId=${userId}/one`;
	const currentTimestamp = Math.floor(Date.now() / 1000);
	const signature = generateHmacSha256(SUMSUB_SECRET, `${currentTimestamp}${reqMethod}${endpoint}`);

	const reqUrl = `${SUMSUB_API_BASE}${endpoint}`;
	const reqHeaders = {
		'X-App-Token': SUMSUB_TOKEN,
		'X-App-Access-Sig': signature,
		'X-App-Access-Ts': String(currentTimestamp)
	};

	console.log('Request URL:', reqUrl);
	console.log('Request Headers:', reqHeaders);

	try {
		const verificationResultResponse = await fetch(reqUrl, {
			method: reqMethod,
			headers: reqHeaders
		});

		console.log('Response Status:', verificationResultResponse.status);
		console.log('Response Headers:', verificationResultResponse.headers);

		if (verificationResultResponse.ok) {
			const responseBody = await verificationResultResponse.text();
			console.log('Response Body:', responseBody);

			const verificationResult = JSON.parse(responseBody);
			console.log('Received Verification Result:', verificationResult);
			return verificationResult;
		} else {
			const errorResponse = await verificationResultResponse.text();
			console.error('Error Response:', errorResponse);
			throw new Error('Failed to fetch verification result');
		}
	} catch (error) {
		console.error('Error fetching verification result:', error);
		throw error;
	}
};
