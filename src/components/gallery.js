import React from "react";
import '../styles/base.scss'
import '../styles/gallery.scss'
import { gsap } from "gsap";
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Flip);
gsap.registerPlugin(Observer);

const POSTER_COUNT = 19;
let winsize = { width: window.innerWidth, height: window.innerHeight };
window.addEventListener('resize', () => {
    winsize = { width: window.innerWidth, height: window.innerHeight };
});

export default class Gallery extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isAnimating: false,
            isOpen: false,
            current: null,
            item: null,
            content: null,
            items: [...document.querySelectorAll('.card')]
        }
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    componentDidMount() {
        // console.log('componentDidMount');
        console.log(document.documentElement.y);
        console.log(window.scrollY);
    }

    openSlideshow = (name) => {
        this.setState({
            current: name,
            isAnimating: true
        })

        const scrollY = window.scrollY;

        if (this.state.current !== null) { // Close previous open
            document.getElementById(`poster-${this.state.current}`).className = 'card'
        }

        const stack = document.querySelectorAll(`#stack`)[0];
        const state = Flip.getState(stack.children);

        const curr = document.querySelector(`#stack`)
        curr.classList.toggle(`display`) // toggling class

        const currentPoster = document.getElementById(`poster-${name}`);
        const posterCenter = currentPoster.offsetTop + currentPoster.offsetHeight / 2;

        gsap.set(curr, {
            y: winsize.height / 2 - posterCenter + scrollY
        })

        Flip.from(state, { // Animating
            duration: 1,
            ease: "expo",
            onStart: () => document.documentElement.scrollTop = document.body.scrollTop = scrollY,
            onComplete: () => {
                this.setState({
                    isAnimating: false,
                    isOpen: true,
                })
            },
            absoluteOnLeave: true,
        });
    }

    closeSlideshow = () => {
        console.log('Close!');

        const stack = document.querySelectorAll(`#stack`)[0];
        const state = Flip.getState(stack.children);

        const curr = document.querySelector(`#stack`)
        curr.classList.toggle(`display`) // toggling class

        gsap.set(curr, {
            y: 0
        })

        Flip.from(state, { // Animating
            duration: 1,
            ease: "expo",
            onComplete: () => {
                this.setState({
                    current: null,
                    isAnimating: false,
                    isOpen: false,
                })
            },
            absoluteOnLeave: true,
        });
    }

    navigation = (direction) => {

    }

    onMouseDown = (name) => {
        // Interfering
        if (this.state.isAnimating) {
            return;
        }
        else if (!this.state.isOpen) {
            this.openSlideshow(name);
        }
        else {
            this.closeSlideshow();
        }
    }

    render() {
        let postersNumber = Array.from({ length: POSTER_COUNT }, (_, index) => index + 1);

        return (
            <div>
                <div className="content">
                    <ContentCollection />
                </div>
                <div className="slides">
                    <div className="stack" id="stack">
                        {
                            postersNumber.map((number) =>
                                <Poster
                                    key={'poster' + number}
                                    backgroundImage={`url(${process.env.PUBLIC_URL + '/posters/day' + number + '.jpg'})`}
                                    name={'day-' + number}
                                    content={'temporary'}
                                    onMouseDown={(name) => this.onMouseDown(name)}
                                />
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

class Poster extends React.Component {
    render() {
        const {
            name,
            backgroundImage,
            content,
            onMouseDown
        } = this.props
        return (
            <div
                id={'poster-' + name}
                style={{ backgroundImage: backgroundImage }}
                className='card'
                name={name}
                content={content}
                onMouseDown={() => onMouseDown(name)}>
            </div>
        )
    }
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