import React, { useState, useEffect } from "react";
import "../styles/base.scss";
import "../styles/gallery.scss";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(Flip);
gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollToPlugin);

const POSTER_COUNT = 25;
let winsize = { width: window.innerWidth, height: window.innerHeight };
window.addEventListener("resize", () => {
    winsize = { width: window.innerWidth, height: window.innerHeight };
});

export default function Gallery() {
    const [isAnimating, updateAnimation] = useState(false);
    const [isOpen, updateOpen] = useState(false);

    // eslint-disable-next-line
    const [index, updateIndex] = useState(-1);

    const [el, setEl] = useState(null);
    const [items, setItems] = useState(null);
    const [slides, setSlides] = useState(null);
    const [wrap, setWrap] = useState(null);

    useEffect(() => {
        setEl(document.querySelector(".stack"));
        setItems(document.querySelectorAll(".stack-item"));
        setSlides(document.querySelector(".slides"));
        setWrap(document.querySelector(".stack-wrap"));
    }, []);

    const openSlideshow = (name, index) => {
        if (isAnimating || isOpen) {
            return;
        }

        updateAnimation(true);
        updateIndex(index);
        console.log(index);

        const scrollY = window.scrollY;
        document.body.classList.add("oh");

        const state = Flip.getState(items, { props: "opacity" });
        slides.appendChild(el);

        const item = document.getElementById(`poster-day-${index}`);
        const itemCenter = item.offsetTop + item.offsetHeight / 2;

        document.documentElement.scrollTop = document.body.scrollTop = 0;
        gsap.set(el, {
            y: winsize.height / 2 - itemCenter + scrollY,
        });
        document.documentElement.scrollTop = document.body.scrollTop = 0;

        Flip.from(state, {
            duration: 1,
            ease: "expo",
            onComplete: () => {
                updateAnimation(false);
                updateOpen(true);
            },
            onStart: () =>
                (document.documentElement.scrollTop = document.body.scrollTop =
                    scrollY),
            absoluteOnLeave: true,
        });
    };

    const closeSlideshow = () => {
        if (isAnimating) {
            return;
        }

        document.body.classList.remove("oh");
        const state = Flip.getState(items, { props: "opacity" });
        wrap.appendChild(el);

        gsap.set(el, {
            y: 0,
        });

        Flip.from(state, {
            duration: 1,
            ease: "expo",
            onComplete: () => {
                updateAnimation(false);
                updateOpen(false);
                updateIndex(-1);
            },
            absoluteOnLeave: true,
        });
    };

    const navigation = (direction) => {
        if (isAnimating) {
            return;
        }
        updateAnimation(true);

        const status = direction === "next" ? direction + 1 : direction - 1;

        const next = document.getElementById("#next");
        const prev = document.getElementById("#prev");
        gsap.set(prev, { opacity: status > 1 ? 1 : 0 });
        gsap.set(next, { opacity: status < posterContent.length ? 1 : 0 });

        gsap.timeline().to(el, {
            duration: 1,
            ease: "expo",
            y:
                direction === "next"
                    ? `-=${winsize.height / 2 + winsize.height * 0.32}`
                    : `+=${winsize.height / 2 + winsize.height * 0.32}`,
            onComplete: () => {
                updateAnimation(false);
            },
        });
    };

    const onMouseDown = (name, index) => {
        // Interfering
        if (isAnimating) {
            return;
        } else if (isOpen) {
            closeSlideshow();
        }
        openSlideshow(name, index);
    };

    let postersNumber = Array.from(
        { length: POSTER_COUNT },
        (_, index) => index + 1
    );
    return (
        <>
            {/* <div className="content">
                <ContentCollection />
            </div> */}
            <div className="nav-wrap">
                <div
                    className="btn"
                    id="prev"
                    onMouseDown={() => navigation("prev")}
                >
                    Up
                </div>
                <div
                    className="btn"
                    id="next"
                    onMouseDown={() => navigation("next")}
                >
                    Down
                </div>
            </div>
            <div className="slides"></div>
            <div className="stack-wrap">
                <div className="stack">
                    <div className="stack-item stack-item--empty"></div>
                    {postersNumber.map((number) => (
                        <Poster
                            key={"poster" + number}
                            backgroundImage={`url(${
                                process.env.PUBLIC_URL +
                                "/posters/day" +
                                number +
                                ".jpg"
                            })`}
                            name={"day-" + number}
                            index={number}
                            content={"temporary"}
                            onMouseDown={(name, index) =>
                                onMouseDown(name, index)
                            }
                        />
                    ))}
                    <div className="stack-item stack-item--empty"></div>
                </div>
            </div>
        </>
    );
}

const Poster = (props) => {
    return (
        <div
            id={"poster-" + props.name}
            style={{ backgroundImage: props.backgroundImage }}
            className="stack-item"
            name={props.name}
            index={props.index}
            content={props.content}
            onMouseDown={() => props.onMouseDown(props.name, props.index)}
        ></div>
    );
};

// eslint-disable-next-line
class ContentCollection extends React.Component {
    render() {
        let postersNumber = Array.from(
            { length: POSTER_COUNT },
            (_, index) => index + 1
        );
        return (
            <>
                {postersNumber.map((element) => (
                    <Content key={"content" + element} index={element} />
                ))}
            </>
        );
    }
}

const Content = (props) => {
    let name = posterContent[props.index - 1].name;
    let info = posterContent[props.index - 1].info;
    return (
        <div id={"content-" + props.index} className="content-item">
            <h2 className="content-item-title">{name}</h2>
            <div className="content-item-info">
                <p className="oh">Day {props.index}</p>
                <p className="oh">{info}</p>
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
        name: "Inertwined",
        info: "",
    },
    {
        name: "Psyched",
        info: "",
    },
    {
        name: "My Daily Process",
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
];
