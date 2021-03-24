import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { SignInJoinModal } from './SignInJoinModal';

const meta: Meta = {
	title: 'SignInJoinModal',
	component: SignInJoinModal,
};

export default meta;

export const Basic = () => {
	return (
		<SignInJoinModal onSignIn={() => {}} onJoin={() => {}} onClose={() => {}} />
	);
};

export const Join = () => {
	return (
		<SignInJoinModal
			initialMode="join"
			onSignIn={() => {}}
			onJoin={() => {}}
			onClose={() => {}}
		/>
	);
};

export const JoinToSave = () => {
	return (
		<SignInJoinModal
			initialMode="join-to-save"
			onSignIn={() => {}}
			onJoin={() => {}}
			onClose={() => {}}
		/>
	);
};

export const HasError = () => {
	return (
		<SignInJoinModal
			error="user does not exist"
			onSignIn={() => {}}
			onJoin={() => {}}
			onClose={() => {}}
		/>
	);
};

export const JoinHasError = () => {
	return (
		<SignInJoinModal
			initialMode="join"
			error="username already taken"
			onSignIn={() => {}}
			onJoin={() => {}}
			onClose={() => {}}
		/>
	);
};

export const HasMessage = () => {
	return (
		<SignInJoinModal
			message="please check your email"
			onSignIn={() => {}}
			onJoin={() => {}}
			onClose={() => {}}
		/>
	);
};
