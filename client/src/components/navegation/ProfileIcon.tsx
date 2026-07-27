import { useAuth } from "../../hooks/useAuth";

import NavigationItem from "./NavigationItem";

import { CgProfile } from "react-icons/cg";

export default function ProfileIcon() {
	const { profile } = useAuth();
	const profilePhoto = profile?.photo_url;
	const size = profilePhoto ? "1.75rem" : "1.5rem";

	return (
		<NavigationItem
			tag="profile"
			size={size}
			{...(profilePhoto ? { image: profilePhoto } : { icon: CgProfile })}
		/>
	);
}
