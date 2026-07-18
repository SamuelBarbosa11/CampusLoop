import NavLink from "./NavLink";

import { VscHome } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";

export default function BottomNavigation() {
	return (
		<nav className="fixed mx-2 -bottom-px z-10 flex justify-between items-center w-full pt-4 pb-5 px-6 sm:px-8 bg-(--navbar) backdrop-blur-md rounded-t-2xl border-t border-x border-(--mauve-40)">
			<NavLink tag="" icon={VscHome} size="2rem" />
			<NavLink tag="search" icon={IoSearch} size="1.5rem" />
			<NavLink tag="announce" icon={IoAdd} size="2rem" />
			<NavLink tag="dashboard" icon={RiPlayListAddFill} size="1.5rem" />
			<NavLink tag="profile" icon={CgProfile} size="1.5rem" />
		</nav>
	);
}
