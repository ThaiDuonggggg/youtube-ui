import {
    ChevronDown,
    ChevronUp,
    Clapperboard,
    Clock,
    Film,
    Flame,
    History,
    Home,
    Library,
    ListVideo,
    Music2,
    PlaySquare,
    Repeat,
    ShoppingBag,
} from 'lucide-react';
import { Children, ElementType, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, buttonStyles } from '../components/Button';
import { playlists, subscriptions } from '../data/sidebar';
import { useSidebarContext } from '../context/SidebarContext';
import { PageHeaderFirstSection } from './PageHeader';

export const Sidebar = () => {
    const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

    return (
        <>
            <aside
                className={`sticky top-0 overflow-y-auto ml-1 scrollbar-hidden pb-4 flex flex-col lg:hidden ${
                    isLargeOpen ? 'lg:hidden' : 'lg:flex'
                }`}
            >
                <SmallSidebarItem IconOrImgUrl={Home} title="Home" url="/" />
                <SmallSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/repeat" />
                <SmallSidebarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
                <SmallSidebarItem IconOrImgUrl={Library} title="Library" url="/library" />
            </aside>
            {isSmallOpen && (
                <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"></div>
            )}
            <aside
                className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 lg:flex ${
                    isLargeOpen ? 'lg:flex' : 'lg:hidden'
                } ${isSmallOpen ? 'flex z-[999] bg-white max-h-screen' : 'hidden'}`}
            >
                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageHeaderFirstSection />
                </div>
                <LargeSidebarSection visibleItemCount={3}>
                    <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
                    <LargeSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/repeat" />
                    <LargeSidebarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection visibleItemCount={3}>
                    <LargeSidebarItem isActive IconOrImgUrl={Library} title="library" url="/library" />
                    <LargeSidebarItem IconOrImgUrl={History} title="History" url="/history" />
                    <LargeSidebarItem IconOrImgUrl={PlaySquare} title="PlaySquare" url="/playSquare" />
                    <LargeSidebarItem IconOrImgUrl={Clock} title="Clock" url="/clock" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection visibleItemCount={3}>
                    <LargeSidebarItem isActive IconOrImgUrl={Library} title="library" url="/library" />
                    <LargeSidebarItem IconOrImgUrl={History} title="History" url="/history" />
                    <LargeSidebarItem IconOrImgUrl={PlaySquare} title="PlaySquare" url="/playSquare" />
                    <LargeSidebarItem IconOrImgUrl={Clock} title="Clock" url="/clock" />
                    {playlists.map((playlist) => (
                        <LargeSidebarItem
                            key={playlist.id}
                            IconOrImgUrl={ListVideo}
                            title={playlist.name}
                            url={`/playlist?list=${playlist.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Subscriptions" visibleItemCount={1}>
                    {subscriptions.map((subscription) => (
                        <LargeSidebarItem
                            key={subscription.id}
                            IconOrImgUrl={subscription.imgUrl}
                            title={subscription.channelName}
                            url={`/@${subscription.imgUrl}`}
                        />
                    ))}
                </LargeSidebarSection>
                <LargeSidebarSection title="Explore" visibleItemCount={5}>
                    <LargeSidebarItem IconOrImgUrl={Flame} title="Trending" url="/trending" />
                    <LargeSidebarItem IconOrImgUrl={ShoppingBag} title="Shopping" url="/shopping" />
                    <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
                    <LargeSidebarItem IconOrImgUrl={Film} title="film" url="/film" />
                    <LargeSidebarItem IconOrImgUrl={Flame} title="Trending" url="/trending" />
                </LargeSidebarSection>
            </aside>
        </>
    );
};

type SmallSidebarItemProps = {
    IconOrImgUrl: ElementType;
    title: string;
    url: string;
};

export const SmallSidebarItem = ({ IconOrImgUrl, title, url }: SmallSidebarItemProps) => {
    return (
        <a
            href={url}
            className={twMerge(buttonStyles({ variant: 'ghost' }), 'py-4 px-1 flex flex-col items-center rounded-lg')}
        >
            <IconOrImgUrl className="w-6 h-6" />
            <div className="text-sm"> {title}</div>
        </a>
    );
};

type LargeSidebarSectionProps = {
    children?: ReactNode;
    title?: string;
    visibleItemCount: number;
};

const LargeSidebarSection = ({
    children,
    title,
    visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const childrenArray = Children.toArray(children).flat();
    const showExpandButton = childrenArray.length > visibleItemCount;
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChildren}
            {showExpandButton && (
                <Button
                    onClick={() => setIsExpanded((e) => !e)}
                    variant="ghost"
                    className="w-full flex items-center rounded-lg gap-4 p-3"
                >
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? 'Show Less' : 'Show More'}</div>
                </Button>
            )}
        </div>
    );
};

type LargeSidebarItemProps = {
    isActive?: boolean;
    IconOrImgUrl: ElementType | string;
    title: string;
    url: string;
};

const LargeSidebarItem = ({ isActive = false, IconOrImgUrl, title, url }: LargeSidebarItemProps) => {
    return (
        <a
            href={url}
            className={twMerge(
                buttonStyles({ variant: 'ghost' }),
                `w-full flex items-center rounded-lg gap-4 p-3 ${
                    isActive ? 'font-bold bg-neutral-100 hover:bg-secondary' : null
                }`,
            )}
        >
            {typeof IconOrImgUrl === 'string' ? (
                <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
            ) : (
                <IconOrImgUrl className="w-6 h-6" />
            )}
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        </a>
    );
};
