export const CACHE_KEYS = {
	FEED: (query: string) => `feed-${query}`,

	ANNOUNCES_ME: (query: string) => `announces-me-${query}`,

	PROFILE_ME: "profile-me",

	ANNOUNCES_PROFILE_PUBLIC: (id: string) => `announces-profile-${id}`,

	PROFILE_PUBLIC: (id: string) => `profile-${id}`,
};