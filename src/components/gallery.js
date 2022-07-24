import React, { useState, useEffect } from "react";
import "../styles/base.scss";
import "../styles/gallery.scss";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(Flip);
gsap.registerPlugin(Observer);

const POSTER_COUNT = 29;
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
    const [content, setContent] = useState(null);

    useEffect(() => {
        setEl(document.querySelector(".stack"));
        setItems(document.querySelectorAll(".stack-item"));
        setSlides(document.querySelector(".slides"));
        setWrap(document.querySelector(".stack-wrap"));
        setContent(document.querySelector('.content'));
    }, []);

    const openSlideshow = (index) => {
        if (isAnimating || isOpen) {
            return;
        }

        updateAnimation(true);
        updateIndex(index);

        const scrollY = window.scrollY;
        document.body.classList.add("oh");
        content.classList.add('content--open');

        const contentText = new ContentItem(document.getElementById(`content-${index}`));
        contentText.DOM.el.classList.add('content-item-current');

        const state = Flip.getState(items, { props: "opacity" });
        slides.appendChild(el);

        const item = document.getElementById(`poster-day-${index}`);
        const itemCenter = item.offsetTop + item.offsetHeight / 2;

        //

        document.documentElement.scrollTop = document.body.scrollTop = 0;
        gsap.set(el, {
            y: winsize.height / 2 - itemCenter + scrollY,
        });
        document.documentElement.scrollTop = document.body.scrollTop = 0;

        Flip.from(state, {
            duration: 1.5,
            ease: "expo",
            onComplete: () => {
                updateAnimation(false);
                updateOpen(true);
            },
            onStart: () =>
            (document.documentElement.scrollTop = document.body.scrollTop =
                scrollY),
            absoluteOnLeave: true,
        })
            .to(contentText.DOM.texts, {
                duration: 1.5,
                ease: 'expo',
                startAt: { yPercent: 101 },
                yPercent: 0
            }, 0);
    };

    const closeSlideshow = () => {
        if (isAnimating || !isOpen) {
            return;
        }

        updateAnimation(true);

        const contentText = new ContentItem(document.getElementById(`content-${index}`));

        document.body.classList.remove("oh");

        const state = Flip.getState(items, { props: "opacity" });
        wrap.appendChild(el);

        gsap.set(el, {
            y: 0,
        });

        Flip.from(state, {
            duration: 1.5,
            ease: "expo",
            onComplete: () => {
                content.classList.remove('content--open');
                contentText.DOM.el.classList.remove('content-item-current');
                updateAnimation(false);
                updateOpen(false);
                updateIndex(-1);
            },
            absoluteOnLeave: true,
        })
            .to(contentText.DOM.texts, {
                duration: 1.5,
                ease: 'expo',
                yPercent: -101
            }, 0);
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
            duration: 1.5,
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

    const onMouseDown = (index) => {
        console.log(isOpen);
        // Interfering
        if (isAnimating) {
            return;
        } else if (isOpen) {
            closeSlideshow();
        }
        openSlideshow(index);
    };

    let postersNumber = Array.from(
        { length: POSTER_COUNT },
        (_, index) => index + 1
    );
    return (
        <main>
            <div className='frame'>
                <div className="nav">
                    <div
                        className="btn"
                        id="prev"
                        onMouseDown={() => navigation("prev")}
                    >
                        Prev
                    </div>
                    <div
                        className=" btn"
                        id="next"
                        onMouseDown={() => closeSlideshow()}
                    >
                        Close
                    </div>
                    <div
                        className=" btn"
                        id="next"
                        onMouseDown={() => navigation("next")}
                    >
                        Next
                    </div>
                </div>
            </div>
            <div className="content">
                {postersNumber.map((number) => (
                    <Content key={"content" + number} index={number} />
                ))}
            </div>
            <div className="slides"></div>
            <div className="stack-wrap">
                <div className="stack">
                    <div className="stack-item stack-item--empty"></div>
                    {postersNumber.map((number) => (
                        <Poster
                            key={"poster" + number}
                            backgroundImage={`url(${process.env.PUBLIC_URL +
                                "/posters/day" +
                                number +
                                ".jpg"
                                })`}
                            name={"day-" + number}
                            index={number}
                            content={"temporary"}
                            onMouseDown={(index) =>
                                onMouseDown(index)
                            }
                        />
                    ))}
                    <div className="stack-item stack-item--empty"></div>
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
            className="stack-item"
            name={props.name}
            index={props.index}
            content={props.content}
            onMouseDown={() => props.onMouseDown(props.index)}
        ></div>
    );
};

const Content = (props) => {
    let name = posterContent[props.index - 1].name.split(' ');
    let info = posterContent[props.index - 1].info;
    return (
        <div id={"content-" + props.index} className="content-item">
            <h2 className="content-item-title">
                {name.map((word) =>
                    <span className="oh" key={word}>
                        <span className="oh__inner">
                            {word}
                        </span>
                    </span>
                )}
            </h2>
            <div className="content-item-info">
                <p className="oh" >
                    <strong className="oh__inner">
                        Day {props.index}
                    </strong>
                </p>
                <p className="oh">
                    <span className="oh__inner">
                        {info}
                    </span>
                </p>
            </div>
        </div>
    );
};

class ContentItem {
    DOM = {
        // main element (.content__item)
        el: null,
        // title (.content__item-title)
        title: null,
        // description (.content__item-description)
        description: null,
        // all .oh__inner text spans that will animate in/out
        texts: null
    }

    /**
     * Constructor.
     * @param {NodeList} DOM_el - main element (.content-item)
     */
    constructor (DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.title = this.DOM.el.querySelector('.content-item-title');
        this.DOM.description = this.DOM.el.querySelector('.content-item-info');
        this.DOM.texts = [...this.DOM.el.querySelectorAll('.oh > .oh__inner')];
    }
}

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
        name: "Morning Coffee",
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
        name: 'Spacewalker',
        info: ''
    },
    {
        name: 'Lost in Translation',
        info: ''
    },
    {
        name: 'Break your limit',
        info: ''
    }
];
