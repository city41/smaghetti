import React, { useState } from 'react';
import clsx from 'clsx';
import { Modal } from '../../Modal';

import logoPng from '../../../images/logo.png';

type SignInJoinModalMode = 'sign-in' | 'join';
type Credentials = { username?: string; email: string; password: string };

type PublicSignInJoinModalProps = {
	className?: string;
	initialMode?: SignInJoinModalMode;
	message?: string;
	onCancel?: () => void;
};

type InternalSignInJoinModalProps = {
	onSignIn: (value: Credentials) => void;
	onJoin: (value: Credentials) => void;
	error?: string | null;
};

const titles: Record<SignInJoinModalMode, string> = {
	'sign-in': 'Sign In',
	join: 'Join',
};

function Input({
	label,
	type,
	value,
	onChange,
}: {
	label: string;
	type: 'email' | 'password' | 'text';
	value: string | undefined;
	onChange: (value: string) => void;
}) {
	return (
		<label className="w-full text-xs my-2 text-gray-400">
			<div className="pb-0.5">{label}</div>
			<input
				className="p-2 text-black w-full"
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</label>
	);
}

const BLANK_CREDENTIALS = {
	email: '',
	password: '',
};

function SignInJoinModal({
	onCancel,
	initialMode = 'sign-in',
	message,
	onSignIn,
	onJoin,
	error,
}: PublicSignInJoinModalProps & InternalSignInJoinModalProps) {
	const [mode, _setMode] = useState<SignInJoinModalMode>(initialMode);
	const [credentials, setCredentials] = useState<Credentials>(
		BLANK_CREDENTIALS
	);

	function setMode(newMode: SignInJoinModalMode) {
		if (newMode !== mode) {
			_setMode(newMode);
			setCredentials(BLANK_CREDENTIALS);
		}
	}

	const title = titles[mode];

	const aClassName = 'text-blue-400 underline cursor-pointer';

	const toggle =
		mode === 'sign-in' ? (
			<>
				No account?{' '}
				<a className={aClassName} onClick={() => setMode('join')}>
					create one
				</a>
			</>
		) : (
			<>
				Already a member?{' '}
				<a className={aClassName} onClick={() => setMode('sign-in')}>
					sign in
				</a>
			</>
		);

	return (
		<Modal
			className="w-20"
			isOpen
			title={title}
			onRequestClose={onCancel}
			onXClick={onCancel}
			flexWidth
		>
			<div className="flex flex-col items-center w-80 -mx-4">
				<img
					className="block w-20 mx-auto py-6"
					src={logoPng}
					alt="smaghetti logo"
				/>
				{mode === 'join' && (
					<div className="p-2 text-sm">
						joining means you agree to our{' '}
						<a className={aClassName} href="/privacy" target="_blank">
							privacy policy
						</a>
					</div>
				)}
				{(message || error) && (
					<div
						className={clsx('w-full text-center py-2', {
							'bg-yellow-100 text-yellow-900': !!message,
							'bg-red-100 text-red-900': !!error,
						})}
					>
						{error || message}
					</div>
				)}
				<form className="flex flex-col w-44">
					{mode === 'join' && (
						<Input
							label="username"
							type="text"
							value={credentials.username}
							onChange={(newValue) => {
								setCredentials((c) => {
									return {
										...c,
										username: newValue,
									};
								});
							}}
						/>
					)}
					<Input
						label="email"
						type="email"
						value={credentials.email}
						onChange={(newValue) => {
							setCredentials((c) => {
								return {
									...c,
									email: newValue,
								};
							});
						}}
					/>
					<Input
						label="password"
						type="password"
						value={credentials.password}
						onChange={(newValue) => {
							setCredentials((c) => {
								return {
									...c,
									password: newValue,
								};
							});
						}}
					/>
					<input
						type="submit"
						className="w-full p-2 mt-4 bg-green-500 text-white"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							if (mode === 'sign-in') {
								onSignIn(credentials);
							} else {
								onJoin(credentials);
							}
						}}
					/>
				</form>
				<div className="pt-6 text-sm text-gray-300">{toggle}</div>
			</div>
		</Modal>
	);
}

export { SignInJoinModal };
export type { SignInJoinModalMode, Credentials, PublicSignInJoinModalProps };
