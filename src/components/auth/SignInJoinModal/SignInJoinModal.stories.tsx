import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { SignInJoinModal } from './SignInJoinModal';

const meta: Meta = {
	title: 'SignInJoinModal',
	component: SignInJoinModal,
};

export default meta;

export const Basic = () => {
	return <SignInJoinModal onSignIn={() => {}} onJoin={() => {}} />;
};

export const Join = () => {
	return (
		<SignInJoinModal initialMode="join" onSignIn={() => {}} onJoin={() => {}} />
	);
};

export const JoinToSave = () => {
	return (
		<SignInJoinModal
			initialMode="join-to-save"
			onSignIn={() => {}}
			onJoin={() => {}}
		/>
	);
};

export const HasError = () => {
	return (
		<SignInJoinModal
			error="user does not exist"
			onSignIn={() => {}}
			onJoin={() => {}}
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
		/>
	);
};

export const HasMessage = () => {
	return (
		<SignInJoinModal
			message="please check your email"
			onSignIn={() => {}}
			onJoin={() => {}}
		/>
	);
};
