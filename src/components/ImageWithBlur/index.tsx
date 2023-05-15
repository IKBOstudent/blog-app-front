import React from 'react';
import { Blurhash } from 'react-blurhash';

export const ImageWithBlur = ({
    src,
    hash,
    alt,
    styling,
}: {
    src: string;
    hash: string;
    alt: string;
    styling: string;
}) => {
    const [loaded, setLoaded] = React.useState(false);
    const ref = React.useRef<HTMLImageElement>(null);

    const onLoad = () => {
        setLoaded(true);
    };

    React.useEffect(() => {
        if (!loaded && ref.current && ref.current.complete) {
            onLoad();
        }
    });

    return (
        <>
            <Blurhash
                hash={hash}
                className={styling}
                height={1200}
                width={1200}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                style={{ display: loaded ? 'none' : 'block' }}
            />

            <img
                style={{ display: !loaded ? 'none' : 'inline' }}
                className={styling}
                ref={ref}
                onLoad={onLoad}
                src={src}
                alt={alt}
            />
        </>
    );
};
