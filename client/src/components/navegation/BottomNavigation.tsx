import NavigationItem from "./NavigationItem";
import ProfileIcon from "./ProfileIcon";

import { VscHome } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";

export default function BottomNavigation() {
	return (
		<nav className="fixed -bottom-px z-10 flex justify-between items-center w-full pt-4 pb-5 px-6 sm:px-8 bg-(--navbar) backdrop-blur-md rounded-t-2xl border-t border-x border-(--mauve-40) overflow-hidden">
			<NavigationItem icon={VscHome} size="1.75rem" />
			<NavigationItem tag="search" icon={IoSearch} size="1.5rem" />
			<NavigationItem tag="announce" icon={IoAdd} size="2rem" />
			<NavigationItem tag="dashboard" icon={RiPlayListAddFill} size="1.5rem" />
			<ProfileIcon />
		</nav>
	);
}
