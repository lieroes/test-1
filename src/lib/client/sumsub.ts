import type { LevelName } from '$lib/types';
import snsWebSdk, { type SnsWebSdkBaseConfig } from '@sumsub/websdk';

interface LaunchWebSdkConfig {
	selector: string;
	accessToken: string;
	userId: string;
	levelName: LevelName;
	customization: SnsWebSdkBaseConfig;
	onApplicantStatusChangedHandler: (payload: any) => void;
}

export const launchWebSdk = (config: LaunchWebSdkConfig) => {
	console.log("Launching Web SDK with config:", config);
	const snsWebSdkInstance = snsWebSdk
		.init(config.accessToken, async () => {
			const newAccessToken = await getNewAccessToken(config.userId, config.levelName);
			console.log("New access token obtained:", newAccessToken);
			return newAccessToken;
		})
		.withConf({ ...config.customization })
		.withOptions({ addViewportTag: false, adaptIframeHeight: true })
		.on('idCheck.onApplicantStatusChanged', (payload) =>
			config.onApplicantStatusChangedHandler(payload)
		)
		.build();

	snsWebSdkInstance.launch(config.selector);
};

const getNewAccessToken = async (userId: string, levelName: LevelName) => {
	try {
		console.log("Requesting new access token with userId:", userId, "and levelName:", levelName);
		const newAccessTokenResponse = await fetch(`/api/refresh-identity-access-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId, levelName })
		});
		const responseJson = await newAccessTokenResponse.json();
		console.log("Response from access token endpoint:", responseJson);
		const { accessToken } = responseJson;
		return accessToken;
	} catch (error) {
		console.error("Error fetching new access token:", error);
		throw error;
	}
};
