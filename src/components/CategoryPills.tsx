import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from './Button';

type categoryProps = {
    category: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({ category, selectedCategory, setSelectedCategory }: categoryProps) => {
    const [translate, setTranslate] = useState(0);
    const [isLeftVisible, setIsLeftVisible] = useState(false);
    const [isRightVisible, setIsRightVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current == null) {
            return;
        }
        const observer = new ResizeObserver((entries) => {
            // get element parent
            const container = entries[0]?.target;

            if (container == null) {
                return;
            }
            setIsLeftVisible(translate > 0);
            setIsRightVisible(translate + container.clientWidth < container.scrollWidth);
        });

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [category, translate]);

    return (
        <div ref={containerRef} className="overflow-x-hidden relative">
            <div
                className="flex gap-3 whitespace-nowrap transition-transform w-[max-content]"
                style={{
                    transform: `translateX(-${translate}px)`,
                }}
            >
                {category.map((item) => (
                    <Button
                        key={item}
                        variant={`${selectedCategory === item ? 'dark' : 'default'}`}
                        className="rounded-lg py-1 px-3 whitespace-nowrap"
                        onClick={() => setSelectedCategory(item)}
                    >
                        {item}
                    </Button>
                ))}
            </div>
            {isLeftVisible && (
                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
                    <Button
                        onClick={() => {
                            setTranslate((translate) => {
                                const newTranslate = translate - TRANSLATE_AMOUNT;
                                if (newTranslate <= 0) return 0;
                                return newTranslate;
                            });
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-full w-auto aspect-square p-1.5"
                    >
                        <ChevronLeft />
                    </Button>
                </div>
            )}
            {isRightVisible && (
                <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
                    <Button
                        onClick={() => {
                            setTranslate((translate) => {
                                if (containerRef.current == null) {
                                    return translate;
                                }
                                const newTranslate = translate + TRANSLATE_AMOUNT;
                                const edge = containerRef.current.scrollWidth;
                                const width = containerRef.current.clientWidth;
                                if (newTranslate + width >= edge) {
                                    return edge - width;
                                }
                                return newTranslate;
                            });
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-full w-auto aspect-square p-1.5"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CategoryPills;
