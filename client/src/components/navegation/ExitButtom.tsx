import { useState } from "react";
import clsx from "clsx";

import { useAuth } from "../../hooks/useAuth";

import { logout } from "../../services/auth.service";

import Text from "../Text";
import Spinner from "../Smalls/Spinner";
import { MdLogout } from "react-icons/md";

type ExitButtomProps = {
	className?: string;
	labelClassName?: string;
};

export default function ExitButtom({
	className,
	labelClassName,
}: ExitButtomProps) {
	const { isAuthenticated } = useAuth();

	const [loading, setLoading] = useState(false);

	async function handleLogout() {
		try {
			setLoading(true);
			await logout();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			{isAuthenticated && (
				<Text
					as="button"
					variant="label"
					className={clsx(
						[
							"flex justify-center items-center trasition duration-200 hover:text-(--primary) gap-2",
						],
						className
					)}
					onClick={() => handleLogout()}
				>
					{loading ? (
						<Spinner size=".75rem" />
					) : (
						<>
							<MdLogout />
							<Text variant="label" className={`${labelClassName}`}>
								sair
							</Text>
						</>
					)}
				</Text>
			)}
		</>
	);
}
