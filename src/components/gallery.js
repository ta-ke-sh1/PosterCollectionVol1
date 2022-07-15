import React, { useEffect, useState } from "react";
import '../styles/base.scss'
import '../styles/gallery.scss'
import { gsap } from "gsap";
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(Flip);
gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollToPlugin);

const POSTER_COUNT = 20;
let winsize = { width: window.innerWidth, height: window.innerHeight };
window.addEventListener('resize', () => {
    winsize = { width: window.innerWidth, height: window.innerHeight };
});

export default function Gallery() {
    const [isAnimating, updateAnimation] = useState(false);
    const [isOpen, updateOpen] = useState(false);
    const [index, updateIndex] = useState(-1);

    const openSlideshow = (name, index) => {
        let el = document.querySelector('.stack');
        let items = document.querySelectorAll('.stack-item');
        let slides = document.querySelector('.slides');

        if (isAnimating || isOpen) {
            return;
        }

        updateAnimation(true);
        updateIndex(index);

        const scrollY = window.scrollY;
        document.body.classList.add('oh');

        const item = document.getElementById(`poster-day-${index}`);
        const state = Flip.getState(items, { props: 'opacity' });
        slides.appendChild(el);

        
        const itemCenter = item.offsetTop + item.offsetHeight / 2;

        gsap.set(el, {
            y: winsize.height / 2 - itemCenter + scrollY
        })

        console.log(index);

        Flip.from(state, { // Animating
            duration: 1,
            ease: 'expo',
            onStart: () => document.documentElement.scrollTop = document.body.scrollTop = scrollY,
            onComplete: () => {
                updateAnimation(false);
                updateOpen(true)
            },
            absoluteOnLeave: true,
        });
    }

    const closeSlideshow = () => {
        // if (isAnimating || !isOpen) {
        //     return;
        // }

        let el = document.querySelector('.stack');
        let items = document.querySelectorAll('.stack-item');
        let stackWrap = document.querySelector('.stack-wrap');
        document.body.classList.remove('oh');

        const state = Flip.getState(items, { props: 'opacity' });
        stackWrap.appendChild(el);

        gsap.set(el, {
            y: 0
        })

        Flip.from(state, { // Animating
            duration: 1,
            ease: "expo",
            onComplete: () => {
                updateAnimation(false);
                updateOpen(false);
                updateIndex(-1)
            },
            absoluteOnLeave: true,
        });
    }

    const navigation = (direction) => {

    }

    const onMouseDown = (name, index) => {
        // Interfering
        if (isAnimating) {
            return;
        }
        else if (isOpen) {
            closeSlideshow();
        }
        openSlideshow(name, index);
    }

    let postersNumber = Array.from({ length: POSTER_COUNT }, (_, index) => index + 1);
    return (
        <>
            <div className="content">
                <ContentCollection />
            </div>
            <button id="closeBtn" onClick={() => closeSlideshow()}>Close</button>
            <div className="slides"></div>
            <div className="stack-wrap">
                <div className="stack">
                    {
                        postersNumber.map((number) =>
                            <Poster
                                key={'poster' + number}
                                backgroundImage={`url(${process.env.PUBLIC_URL + '/posters/day' + number + '.jpg'})`}
                                name={'day-' + number}
                                index={number}
                                content={'temporary'}
                                onMouseDown={(name, index) => onMouseDown(name, index)}
                            />
                        )}
                </div>
            </div>
        </>
    )
}

const Poster = (props) => {
    return (
        <div
            id={'poster-' + props.name}
            style={{ backgroundImage: props.backgroundImage }}
            className='stack-item'
            name={props.name}
            index={props.index}
            content={props.content}
            onMouseDown={() => props.onMouseDown(props.name, props.index)}
        >
        </div>
    )
}

class Content extends React.Component {
    render() {
        const {
            name,
            info,
            headings
        } = this.props
        return (
            <div
                id={'content-' + name}
                info={info}
                headings={headings}
            ></div>
        )
    }
}

class ContentCollection extends React.Component {
    render() {
        let postersNumber = Array.from({ length: POSTER_COUNT }, (_, index) => index + 1);
        return (
            <>
                {
                    postersNumber.map((number) =>
                        <Content
                            key={'content' + number}
                            name={'day-' + number}
                            info={'Information of day ' + number}
                            headings={'Poster no.' + number}
                        />
                    )}
            </>
        )
    }
}