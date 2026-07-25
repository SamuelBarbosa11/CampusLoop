import { useAuth } from "../../hooks/useAuth";

import NavLink from "./NavLink";

import { CgProfile } from "react-icons/cg";

export default function ProfileIcon() {
	const { profile } = useAuth();
	const profilePhoto = profile?.photo_url;
	const size = profilePhoto ? "1.75rem" : "1.5rem";

	return (
		<NavLink
			tag="profile"
			size={size}
			{...(profilePhoto ? { image: profilePhoto } : { icon: CgProfile })}
		/>
	);
}
