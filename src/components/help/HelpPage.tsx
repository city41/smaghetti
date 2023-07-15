import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Root } from '../layout/Root';
import typographyStyles from '../../styles/typography.module.css';
import { IconAlert } from '../../icons';
import { DISCORD_LINK } from '../../constants';

function toId(s: string): string {
	return s
		.toLowerCase()
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '');
}

function HelpEntry({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	const id = toId(title);

	return (
		<div className="mt-16 pb-16 px-4 sm:px-0 border-b border-dotted border-gray-500 last:border-0">
			<a href={`#${id}`}>
				<h3 id={id} className="group text-white font-bold mb-2 text-3xl">
					{title}
				</h3>
			</a>
			<div className={clsx(typographyStyles.typography, 'text-gray-200 ml-6')}>
				{children}
			</div>
		</div>
	);
}

function HelpPage() {
	return (
		<Root title="Help" metaDescription="">
			<div className="max-w-2xl mx-auto pt-16">
				<h1 className="font-bold text-5xl text-center mb-8">Help</h1>
				<p className="bg-green-500 text-white -mx-2 p-2">
					Need more help? You can ask on{' '}
					<a
						className="text-green-200 underline"
						target="_blank"
						rel="noreferrer"
						href={DISCORD_LINK}
					>
						Discord
					</a>{' '}
					or{' '}
					<a
						className="text-green-200 underline"
						target="_blank"
						rel="noreferrer"
						href="https://github.com/city41/smaghetti/discussions"
					>
						GitHub
					</a>
					, and I&apos;ll help you out.
				</p>
				<HelpEntry title="The game runs slowly when I test my level">
					<p>
						Unfortunately it can take a pretty powerful machine to get an
						emulator to run at full speed in a browser.
					</p>
					<p className="font-bold">
						Try using Chrome as your browser, as it runs the emulator the
						fastest.
					</p>
					<p>
						Try turning off audio, as that will require the emulator to do less
						work.
					</p>
					<p>
						There isn&apos;t much that can be done about this for the time being
						I am sorry to say. In the future Smaghetti may be able to switch to
						a different, and better, emulator that should help with speed
						issues. future that might help 🤞
					</p>
				</HelpEntry>
				<HelpEntry title="The game audio is slow, lags, or is glitchy">
					<p>
						The audio will sound best in Chrome but even there is not perfect.
						Emulating audio in a web browser is challenging. There isn&apos;t
						too much that can be done about this for now. But eventually
						Smaghetti may be able to switch to a different, and better, emulator
						that should help with audio issues.
					</p>
				</HelpEntry>
				<HelpEntry title="Some weird glitch is happening in my level">
					<p>
						This might be a bug in Smaghetti, or it could be a bug in Super
						Mario Advance. Glitches are going to happen sometimes, just the
						nature of making a level editor like this.
					</p>
					<p>
						We need to reverse engineer how the game works, and as we learn
						more, we are often able to fix glitches. You can help us out by
						sharing the glitch in your level with us on{' '}
						<a
							className="text-blue-300"
							target="_blank"
							rel="noreferrer"
							href={DISCORD_LINK}
						>
							Discord
						</a>{' '}
						or{' '}
						<a
							className="text-blue-300"
							target="_blank"
							rel="noreferrer"
							href="https://github.com/city41/smaghetti/discussions"
						>
							GitHub
						</a>
					</p>
					<h4 className="text-2xl text-green-400 font-bold">
						Also check for warnings
					</h4>
					<p>
						Smaghetti can often detect if your level is going to have a problem.
						When it does, it will put this symbol
						<IconAlert className="inline-block w-5 h-5 bg-white text-red-700 mx-2" />
						on an entity that is causing problems. Click on that symbol to see
						what can be done to fix the problem.
					</p>
					<p>
						You can see all warnings in a list by clicking on the warning link
						down in the footer of the editor.
					</p>
				</HelpEntry>
				<HelpEntry title="I added an entity to my level but it is not showing up">
					<p>
						There are many reasons why this can happen. Since we need to figure
						out how this game engine works, you might have stumbled upon a
						combination that does not work that we don&apos;t yet know about.
						That is just how level editors for existing games tend to go.
					</p>
					<p>
						Your idea might just not work, or there might be more we need to
						figure out to make it happen. You can always reach out on{' '}
						<a
							className="text-blue-300"
							target="_blank"
							rel="noreferrer"
							href={DISCORD_LINK}
						>
							Discord
						</a>{' '}
						or{' '}
						<a
							className="text-blue-300"
							target="_blank"
							rel="noreferrer"
							href="https://github.com/city41/smaghetti/discussions"
						>
							GitHub
						</a>{' '}
						and we can see if we can help figure out what is wrong.
					</p>
				</HelpEntry>
				<HelpEntry title="Why do so many things get grayed out in the item chooser?">
					<p>
						To draw graphics on the screen, the Game Boy Advance first has to
						load the graphic data into its video RAM. Since the GBA doesn&apos;t
						have much RAM, not everything can be loaded at once. To handle this,
						Nintendo divided everything into sets. Some sets can not be loaded
						at the same time. There isn&apos;t much that can be done about this
						limitation, even Nintendo had to work around it. This is one reason
						why in official Nintendo levels, you never see certain enemies in
						some types of levels.
					</p>
					<p>
						To help you out a little, you can view an entity&apos;s
						compatibility page. You can click to it from within the item
						chooser. It will show you what that entity is compatible with and
						not compatible with. For example, here is{' '}
						<a
							className="text-blue-300"
							target="_blank"
							rel="noreferrer"
							href="/compatibility/Goomba"
						>
							Goomba&apos;s compatibility
						</a>
					</p>
				</HelpEntry>
			</div>
		</Root>
	);
}

export { HelpPage, toId };
