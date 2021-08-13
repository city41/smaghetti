import React from 'react';
import clsx from 'clsx';

type YoutubeEmbeddedVideoProps = {
	className?: string;
	videoId: string;
	title: string;
};

function YoutubeEmbeddedVideo({
	className,
	videoId,
	title,
}: YoutubeEmbeddedVideoProps) {
	return (
		<div
			className={clsx(className, 'overflow-hidden relative')}
			style={{ paddingBottom: '56.25%', height: 0 }}
		>
			<iframe
				className="absolute top-0 left-0 h-full w-full"
				width={853}
				height={480}
				src={`https://youtube.com/embed/${videoId}`}
				frameBorder={0}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title={title}
			/>
		</div>
	);
}

export { YoutubeEmbeddedVideo };
