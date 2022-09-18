import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithHideOnError = (props) => {
    const [hideImage, setHideImage] = useState(false);

    return (
        !hideImage && (
            <Image
               {...props}
               onError={() => {
                   setHideImage(true);
               }}
            />
        )
    );
};

export default ImageWithHideOnError;