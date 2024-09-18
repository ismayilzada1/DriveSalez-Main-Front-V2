import React from "react";
import "./CustomAccordion.css"
import {useSelector} from "react-redux";

const CustomAccordion = ({ id, parentId, title, content, isList }) => {


    const theme = useSelector((state) => state.theme.theme);

    return (
        <div className={`accordion-item ${theme === 'dark' ? 'accordion-dark' : ''}`}>
            <h2 className="accordion-header" id={`heading${id}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="false" aria-controls={`collapse${id}`}>
                    {title}
                </button>
            </h2>
            <div id={`collapse${id}`} className="accordion-collapse collapse" aria-labelledby={`heading${id}`} data-bs-parent={`#${parentId}`}>
                <div className="accordion-body">
                    {isList ? (
                        <ul className='list-group'>
                            {content.map((item, index) => (
                                <li key={index} className='list-group-item'>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{content}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomAccordion;
