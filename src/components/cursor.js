import '../styles/cursor.scss';
import $ from 'jquery';

export default function Cursor() {
    return (
        <div>
            <span id="outer-circle" className="outer-circle"></span>
            <span id="circle" className="circle"></span>
        </div>
    )
}

$(function () {
    $(document).on("mousemove", (event) => {
        $(".circle").css({
            left: event.clientX - 2,
            top: event.clientY - 2,
        });
    });

    $(document).on("mousemove", (event) => {
        $(".outer-circle").css({
            left: event.clientX - 20,
            top: event.clientY - 20,
        });
    });

    var cursor = $(".circle");
    var outer_cursor = $(".outer-circle");

    $(window)
        .on('mouseleave', () => {
            cursor.css({ opacity: "0" });
            outer_cursor.css({ opacity: "0" });
        })
        .on('mouseenter', () => {
            cursor.css({ opacity: "1" });
            outer_cursor.css({ opacity: "1" });
        });


    $(document)
        .on('mousedown', () => {
            cursor.css({ transform: "scale(.2)" });
            outer_cursor.css({ transform: "scale(.3)" });
        })
        .on('mouseup', () => {
            cursor.css({ transform: "scale(1)" });
            outer_cursor.css({ transform: "scale(1)" });
        });
});