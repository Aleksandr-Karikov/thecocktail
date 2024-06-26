import { useEffect, useRef } from 'react';

export function useLazy(src: string) {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = imgRef.current;
        if ('IntersectionObserver' in window && img) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        img.src = src;
                        observer.unobserve(img);
                    }
                });
            });

            observer.observe(img);

            return () => {
                observer.disconnect();
            };
        } else {
            if (img) {
                img.src = src;
            }
        }
    }, [src]);

    return imgRef;
}
