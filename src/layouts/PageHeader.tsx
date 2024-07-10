import { useState } from 'react';
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react';

import { Button } from '../components/Button';
import logo from '../assets/Logo.png';

const PageHeader = () => {
    const [showFullWidth, setShowFullWidth] = useState(false);

    return (
        <div className="flex gap-9 lg:gap-20 justify-between pt-2 px-4 mb-6">
            <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${showFullWidth ? 'flex' : 'hidden'}`}
                onClick={() => setShowFullWidth(false)}
            >
                <ArrowLeft className="flex-shrink-0" />
            </Button>
            <div className={`md:flex items-center gap-4 flex-shrink-0 ${showFullWidth ? 'hidden ' : 'flex'}`}>
                <Button variant="ghost" size="icon">
                    <Menu className="flex-shrink-0" />
                </Button>
                <a href="/">
                    <img src={logo} alt="Logo" className="h-6 " />
                </a>
            </div>
            <form className={`md:flex flex-grow justify-center gap-4 ${showFullWidth ? 'flex' : 'hidden'}`}>
                <div className="flex flex-grow max-w-[600px]">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border rounded-full rounded-tr-none rounded-br-none outline-none border-secondary-border w-full py-1 px-4 text-lg focus:border-blue-500 shadow-inner shadow-secondary"
                    />
                    <div className="transition-colors rounded p-2 px-4 border border-l-0 border-secondary-border bg-secondary rounded-tl-none rounded-bl-none rounded-r-full hover:bg-secondary-hover cursor-pointer">
                        <Search />
                    </div>
                </div>
                <Button variant="default" size="icon" className="transition-colors hover:bg-secondary-hover">
                    <Mic className="flex flex-shrink-0" />
                </Button>
            </form>
            <div className={`md:flex items-center flex-shrink-0 md:gap-2 ${showFullWidth ? 'hidden' : 'flex'}`}>
                <Button variant="ghost" size="icon" onClick={() => setShowFullWidth(true)} className="md:hidden">
                    <Search />
                </Button>
                <Button variant="ghost" size="icon">
                    <Upload />
                </Button>
                <Button variant="ghost" size="icon">
                    <Bell />
                </Button>
                <Button variant="ghost" size="icon">
                    <User />
                </Button>
            </div>
        </div>
    );
};

export default PageHeader;
