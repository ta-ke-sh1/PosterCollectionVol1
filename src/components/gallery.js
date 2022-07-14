import React from "react";
import '../styles/base.scss'
import '../styles/gallery.scss'
import { gsap } from "gsap";
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Flip);
gsap.registerPlugin(Observer);

const POSTER_COUNT = 19;


export default function Gallery() {
    return (
        <div>
            <div className="content">
                <ContentCollection />
            </div>
            <div className="slides">
                <div className="stack" id="stack">
                    <PostersCollection />
                </div>
            </div>
        </div>
    )
}



class PostersCollection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isAnimating: false,
            isOpen: null,
            item: null,
            content: null,
            items: [...document.querySelectorAll('.card')]
        }
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    componentDidMount() {
        // console.log('componentDidMount');
    }

    onMouseDown = (name) => {
        // Interfering
        if (this.state.isAnimating) {
            return;
        }
        this.setState({
            isOpen: name,
            isAnimating: true
        })

        if (this.state.isOpen !== null) { // Close previous open
            document.getElementById(`poster-${this.state.isOpen}`).className = 'card'
        }

        const current = document.querySelectorAll(`#stack`)[0];
        const state = Flip.getState(current.children);

        const curr = document.querySelector(`#stack`)
        curr.classList.toggle(`display`) // toggling class

        const scrollY = window.scrollY;

        Flip.from(state, { // Animating
            duration: 1,
            ease: "expo",
            onStart: () => document.documentElement.scrollTop = document.body.scrollTop = scrollY,
            onComplete: () => {
                this.setState({
                    isAnimating: false
                })
            },
            absoluteOnLeave: true,
        });
    }

    closeSlideshow = () => {

    }

    render() {
        let postersNumber = Array.from({ length: POSTER_COUNT }, (_, index) => index + 1);
        return (
            <>
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
            </>
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