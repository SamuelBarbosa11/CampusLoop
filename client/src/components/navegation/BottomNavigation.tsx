import NavLink from "./NavLink";
import ProfileIcon from "./ProfileIcon";

import { VscHome } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";

export default function BottomNavigation() {
	return (
		<nav className="fixed -bottom-px z-10 flex justify-between items-center w-full pt-4 pb-5 px-6 sm:px-8 bg-(--navbar) backdrop-blur-md rounded-t-2xl border-t border-x border-(--mauve-40) overflow-hidden">
			<NavLink icon={VscHome} size="1.75rem" />
			<NavLink tag="search" icon={IoSearch} size="1.5rem" />
			<NavLink tag="announce" icon={IoAdd} size="2rem" />
			<NavLink tag="dashboard" icon={RiPlayListAddFill} size="1.5rem" />
			<ProfileIcon />
		</nav>
	);
}
