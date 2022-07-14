import React, { useEffect } from "react";
import '../styles/base.scss'
import '../styles/scroll.scss'
import LocomotiveScroll from 'locomotive-scroll';

export default function Locomotive() {
    const scrollRef = React.createRef();

    useEffect(() => {
        // eslint-disable-next-line
        const scroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
        })
    });

    return (
        <div>
            <div className="scroll" ref={scrollRef}>
                <h1 data-scroll data-scroll-speed="-1" data-scroll-position="top">Hello World</h1>
                <h2 data-scroll data-scroll-speed="2" data-scroll-position="top">
                    Locomotive Scroll in React
                </h2>
                <h3
                    data-scroll
                    data-scroll-speed="3"
                    data-scroll-position="bottom"
                >
                    Ima go sideways
                </h3>
            </div>
        </div>
    )
}
