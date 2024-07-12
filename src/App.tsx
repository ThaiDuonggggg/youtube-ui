import { useState } from 'react';

import { category, videos } from './data/home';
import CategoryPills from './components/CategoryPills';
import PageHeader from './layouts/PageHeader';
import VideoGridItem from './components/VideoGridItem';
import { Sidebar } from './layouts/Sidebar';
import { SidebarProvider } from './context/SidebarContext';

function App() {
    const [selectedCategory, setSelectedCategory] = useState(category[0]);

    return (
        <SidebarProvider>
            <div className="max-h-screen flex flex-col">
                <PageHeader />
                <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
                    <Sidebar />
                    <div className="overflow-x-hidden px-8 pb-4">
                        <div className="sticky top-0 bg-white z-10 pb-4">
                            <CategoryPills
                                category={category}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </div>
                        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                            {videos.map((video) => (
                                <VideoGridItem key={video.id} {...video} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}

export default App;
