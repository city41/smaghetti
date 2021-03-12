import React, { FunctionComponent } from 'react';
import useClipboard from 'react-use-clipboard';

import { FaTwitter, FaFacebook } from 'react-icons/fa';

import clsx from 'clsx';

type ShareLevelViaSocialMediaProps = {
	className?: string;
	levelUrl: string;
};

// const SharingLink = styled.a`
//   padding: 16px;
//
//   display: grid;
//   grid-template-columns: 72px 1fr;
//   align-items: center;
//
//   cursor: pointer;
//
//   text-decoration: none;
//
//   font-weight: bold;
//
//   & img {
//     justify-self: center;
//   }
//
//   & span {
//     justify-self: flex-start;
//   }
// `;
//
// const CopyLink = styled(SharingLink)`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//
//   background-color: var(--global-foreground-color);
//   color: var(--global-background-color);
//
//   position: relative;
//
//   & .notCopied {
//     visibility: visible;
//   }
//   & .copied {
//     position: absolute;
//     visibility: hidden;
//   }
//
//   &.hasCopied {
//     & .notCopied {
//       visibility: hidden;
//     }
//     & .copied {
//       visibility: visible;
//     }
//   }
// `;
//
// const TwitterLink = styled(SharingLink)`
//   background-color: #1da1f2;
//   color: white;
//
//   & svg {
//     font-size: 48px;
//   }
// `;
//
// const FacebookLink = styled(SharingLink)`
//   background-color: #3b5998;
//   color: white;
//
//   & svg {
//     font-size: 48px;
//   }
// `;

const ShareLevelViaTwitter: FunctionComponent<ShareLevelViaSocialMediaProps> = ({
	className,
	levelUrl,
	children,
}) => {
	const encodedTweetText = encodeURIComponent(
		`Check out this level I made in @JumpClubGame ${levelUrl}`
	);

	const twitterLink = `https://twitter.com/intent/tweet?text=${encodedTweetText}`;

	return (
		<a className={className} href={twitterLink} target="_blank" rel="noopener">
			<FaTwitter />
			<span>{children || 'Share on Twitter'}</span>
		</a>
	);
};

const ShareLevelViaFacebook: FunctionComponent<ShareLevelViaSocialMediaProps> = ({
	className,
	levelUrl,
	children,
}) => {
	const facebookLink = `https://www.facebook.com/share.php?u=${encodeURIComponent(
		levelUrl
	)}`;

	return (
		<a className={className} href={facebookLink} target="_blank" rel="noopener">
			<FaFacebook />
			<span>{children || 'Share on Facebook'}</span>
		</a>
	);
};

const CopyLevelToClipboardLink: FunctionComponent<ShareLevelViaSocialMediaProps> = ({
	className,
	levelUrl,
}) => {
	const [hasCopied, setHasCopied] = useClipboard(levelUrl);

	const finalClassName = clsx(className, { hasCopied });

	return (
		<a
			className={finalClassName}
			onClick={(e) => {
				e.preventDefault();
				setHasCopied();
			}}
		>
			<span className="notCopied">Copy link to clipboard</span>
			<span className="copied">copied!</span>
		</a>
	);
};

export {
	ShareLevelViaTwitter,
	ShareLevelViaFacebook,
	CopyLevelToClipboardLink,
};
