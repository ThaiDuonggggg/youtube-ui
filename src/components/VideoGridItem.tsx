import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '../utilities/formatDuration';
import { formatTimeAgo } from '../utilities/formatTimeAgo';

type VideoGridItemProps = {
    id: string;
    title: string;
    channel: {
        name: string;
        id: string;
        profileUrl: string;
    };
    views: number;
    postedAt: Date;
    duration: number;
    thumbnailUrl: string;
    videoUrl: string;
};

const VIEW_FORMATTER = Intl.NumberFormat(undefined, {
    notation: 'compact',
});

const VideoGridItem = ({
    id,
    title,
    channel,
    views,
    postedAt,
    duration,
    thumbnailUrl,
    videoUrl,
}: VideoGridItemProps) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current == null) {
            return;
        }
        if (isVideoPlaying) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isVideoPlaying]);

    return (
        <div
            className="flex flex-col gap-2"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            <a href={`/watch?v=${id}`} className="relative aspect-video">
                <img src={thumbnailUrl} alt="" className="block w-full h-full object-cover rounded-xl" />
                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
                    {formatDuration(duration)}
                </div>
                <video
                    className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 delay-200 ${
                        isVideoPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                    ref={videoRef}
                    muted
                    playsInline
                    src={videoUrl}
                />
            </a>
            <div className="flex gap-2">
                <a href={`/@${channel.id}`} className="flex-shrink-0">
                    <img src={channel.profileUrl} className="w-12 h-12 rounded-full object-cover" />
                </a>
                <div className="flex flex-col">
                    <a href={`/@watch?v=${id}`} className="font-bold">
                        {title}
                    </a>
                    <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
                        {channel.name}
                    </a>
                    <div className="text-secondary-text text-sm">
                        {VIEW_FORMATTER.format(views)} View • {formatTimeAgo(postedAt)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGridItem;
