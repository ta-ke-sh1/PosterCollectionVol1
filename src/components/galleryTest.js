// eslint-disable-next-line
import React, { useEffect, useRef, useState } from "react";
import "../styles/test.scss";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import locomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(Flip);

const POSTER_COUNT = 30;

// eslint-disable-next-line
let winsize = { width: window.innerWidth, height: window.innerHeight };
window.addEventListener("resize", () => {
    winsize = { width: window.innerWidth, height: window.innerHeight };
});

export default function Test() {
    const scrollRef = React.createRef();
    const [images, setImages] = useState([]);
    const [isAnimating, setAnimating] = useState(false);
    const [isOpen, setOpen] = useState(false);
    let postersNumber = Array.from(
        { length: POSTER_COUNT },
        (_, index) => index + 1
    );

    useEffect(() => {
        const scroll = new locomotiveScroll({
            el: scrollRef.current,
            direction: "horizontal",
            smooth: true,
            lerp: 0.05,
            tablet: {
                smooth: true,
            },
            smartphone: {
                smooth: true,
            },
        });
        setImages(document.querySelectorAll(".item"));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const selectImage = (number) => {
        console.log(number);
    };

    const openImage = (index) => {
        if (isAnimating || isOpen) return;
        setAnimating(true);
        setOpen(true);

        const scrollY = window.scrollY;
        document.body.classList.add("oh");
        const slides = document.querySelector(".slides");
        const el = document.querySelector(".items");
        const state = Flip.getState(images, { props: "opacity" });
        slides.appendChild(el);

        // const item = document.getElementById(`poster-day-${index}`);
        // const itemCenter = item.offsetTop + item.offsetHeight / 2;
        // //

        // document.documentElement.scrollTop = document.body.scrollTop = 0;
        // gsap.set(el, {
        //     y: winsize.height / 2 - itemCenter + scrollY,
        // });
        // document.documentElement.scrollTop = document.body.scrollTop = 0;

        Flip.from(state, {
            duration: 1.5,
            ease: "expo",
            onComplete: () => {
                setAnimating(false);
                setOpen(true);
            },
            onStart: () =>
                (document.documentElement.scrollTop = document.body.scrollTop =
                    scrollY),
            absoluteOnLeave: true,
        });
    };

    const closeImage = () => {
        if (isAnimating || !isOpen) return;
        const stack = document.querySelector(".stack");
        const el = document.querySelector(".items");
        const state = Flip.getState(images, { props: "opacity" });
        stack.appendChild(el);

        Flip.from(state, {
            duration: 1.5,
            ease: "expo",
            onComplete: () => {
                setAnimating(false);
                setOpen(false);
            },
        });
    };

    const handleClick = (index) => {
        if (isAnimating) return;
        if (!isOpen) openImage(index);
        else closeImage();
    };

    return (
        <main>
            <div className="ui"></div>
            <div className="wrapper">
                <div className="slides"></div>
                <div className="stack" data-scroll-container>
                    <div className="items" data-scroll-section ref={scrollRef}>
                        <div
                            className="item blank"
                            data-scroll
                            data-scroll-speed="1"
                        ></div>
                        {postersNumber.map((number) => (
                            <Poster
                                backgroundImage={`url(${
                                    process.env.PUBLIC_URL +
                                    "/posters/day" +
                                    number +
                                    ".jpg"
                                })`}
                                name={"day-" + number}
                                index={number}
                                content={"temporary"}
                                key={"poster" + number}
                                onMouseDown={() => handleClick(number)}
                            />
                        ))}
                        <div
                            className="item blank"
                            data-scroll
                            data-scroll-speed="1"
                        ></div>
                    </div>
                </div>
            </div>
        </main>
    );
}

const Poster = (props) => {
    return (
        <div
            id={"poster-" + props.name}
            style={{ backgroundImage: props.backgroundImage }}
            className="item"
            name={props.name}
            index={props.index}
            content={props.content}
            onMouseDown={() => props.onMouseDown()}
            data-scroll
            data-scroll-speed="1"
        ></div>
    );
};

// eslint-disable-next-line
const Content = (props) => {
    let name = posterContent[props.index - 1].name.split(" ");
    let info = posterContent[props.index - 1].info;
    return (
        <div id={"content-" + props.index} className="content-item">
            <h2 className="content-item-title">
                {name.map((word) => (
                    <span className="oh" key={word}>
                        <span className="oh__inner">{word}</span>
                    </span>
                ))}
            </h2>
            <div className="content-item-info">
                <p className="oh">
                    <strong className="oh__inner">Day {props.index}</strong>
                </p>
                <p className="oh">
                    <span className="oh__inner">{info}</span>
                </p>
            </div>
        </div>
    );
};

const posterContent = [
    {
        name: "Convergence",
        info: "",
    },
    {
        name: "Mars",
        info: "",
    },
    {
        name: "Manifest",
        info: "",
    },
    {
        name: "Sunburst",
        info: "",
    },
    {
        name: "Summertime",
        info: "",
    },
    {
        name: "Pressure",
        info: "",
    },
    {
        name: "Liberation",
        info: "",
    },
    {
        name: "Radical",
        info: "",
    },
    {
        name: "Solitude",
        info: "",
    },
    {
        name: "Accelerate",
        info: "",
    },
    {
        name: "Sunflower",
        info: "",
    },
    {
        name: "Conflict of Interest",
        info: "",
    },
    {
        name: "Polaroid",
        info: "",
    },
    {
        name: "Morninng Coffee",
        info: "",
    },
    {
        name: "Labyrinth",
        info: "",
    },
    {
        name: "Existential",
        info: "",
    },
    {
        name: "RUN!!!",
        info: "",
    },
    {
        name: "Disoriented",
        info: "",
    },
    {
        name: "Intertwined",
        info: "",
    },
    {
        name: "Psyched",
        info: "",
    },
    {
        name: "Daily Process",
        info: "",
    },
    {
        name: "Superfluid",
        info: "",
    },
    {
        name: "Void",
        info: "",
    },
    {
        name: "Diagnosis",
        info: "",
    },
    {
        name: "Where do we belong?",
        info: "",
    },
    {
        name: "Gradient",
        info: "",
    },
    {
        name: "Spacewalker",
        info: "",
    },
    {
        name: "Lost in Translation",
        info: "",
    },
    {
        name: "Break your limit",
        info: "",
    },
    {
        name: "El Paradiso",
        info: "",
    },
];
