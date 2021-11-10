import { Parallax } from 'react-scroll-parallax';

const ParallaxImage = () => (
    <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
        <Image src="/image.jpg" />
    </Parallax>
);