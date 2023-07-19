import React, { useState } from 'react';
import clsx from 'clsx';
import { Modal } from '../../Modal';

import logoPng from '../../../images/logo.png';
import { Button } from '../../Button';

type SignInJoinModalMode = 'sign-in' | 'join' | 'join-to-save' | 'join-to-vote';
type Credentials = { username?: string; email: string; password: string };

type PublicSignInJoinModalProps = {
	className?: string;
	initialMode?: SignInJoinModalMode;
	message?: string;
	onClose: () => void;
};

type InternalSignInJoinModalProps = {
	onSignIn: (value: Credentials) => void;
	onJoin: (value: Credentials) => void;
	error?: string | null;
};

const titles: Record<SignInJoinModalMode, string> = {
	'sign-in': 'Sign In',
	join: 'Join',
	'join-to-save': 'Join to save your level',
	'join-to-vote': 'Join to vote on this level',
};

function Input({
	label,
	type,
	value,
	onChange,
	pattern,
	patternMessage,
}: {
	label: string;
	type: 'password' | 'text';
	value: string | undefined;
	onChange: (value: string) => void;
	pattern?: string;
	patternMessage?: string;
}) {
	const patternProp = pattern
		? { pattern, title: patternMessage ?? 'invalid' }
		: {};

	return (
		<>
			<label htmlFor={type} className="w-full text-xs mt-2 text-gray-400">
				{label}
			</label>
			<input
				id={type}
				name={type}
				className="p-1 text-black w-full"
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				{...patternProp}
				required
			/>
		</>
	);
}

const BLANK_CREDENTIALS = {
	email: '',
	password: '',
};

function SignInJoinModal({
	onClose,
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

	const isJoining = mode.startsWith('join');

	function setMode(newMode: SignInJoinModalMode) {
		if (newMode !== mode) {
			_setMode(newMode);
			setCredentials(BLANK_CREDENTIALS);
		}
	}

	const title = titles[mode];

	const aClassName = 'text-blue-400 underline cursor-pointer';

	const logoImg = (
		<img
			className="block w-20 mx-auto py-6"
			src={logoPng.src}
			alt="smaghetti logo"
		/>
	);

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

	const upperArea =
		mode === 'join-to-save' ? (
			<div className="p-4 bg-gray-200 text-gray-900 text-sm space-y-2 mb-4">
				You need an account to save your level. Accounts are free. If you
				don&apos;t want an account, your level is still saved locally to your
				browser.
			</div>
		) : mode === 'join-to-vote' ? (
			<div className="p-4 bg-gray-200 text-gray-900 text-sm space-y-2 mb-4">
				You need an account to vote on levels. Accounts are free.
			</div>
		) : (
			logoImg
		);

	return (
		<Modal
			className="w-20"
			isOpen
			title={title}
			onRequestClose={onClose}
			onXClick={onClose}
			flexWidth
		>
			<div className="flex flex-col items-center w-80 -mx-4">
				{upperArea}
				{isJoining && (
					<div className="px-4 py-2 text-sm">
						joining means you agree to our{' '}
						<a className={aClassName} href="/privacy" target="_blank">
							privacy policy
						</a>
						, our{' '}
						<a className={aClassName} href="/tos" target="_blank">
							terms of service
						</a>
						)
					</div>
				)}
				{(message || error) && (
					<div
						className={clsx('w-full text-center py-2 my-4', {
							'bg-yellow-100 text-yellow-900': !!message,
							'bg-red-100 text-red-900': !!error,
						})}
					>
						{error || message}
					</div>
				)}
				<form
					className="flex flex-col w-44"
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						if (mode === 'sign-in') {
							onSignIn(credentials);
						} else {
							onJoin(credentials);
						}
					}}
				>
					<Input
						label="username"
						type="text"
						pattern="[^@]+"
						patternMessage="@ symbols are not allowed"
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
					<Button className="mt-4">submit</Button>
				</form>
				<div className="pt-6 text-sm text-gray-300">{toggle}</div>
			</div>
		</Modal>
	);
}

export { SignInJoinModal };
export type { SignInJoinModalMode, Credentials, PublicSignInJoinModalProps };
