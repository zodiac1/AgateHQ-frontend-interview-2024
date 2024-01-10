import { useState } from "react"
import "./accordion.css";
import AccordionProps from "../../../types/props/accordion-props.types";

const Accordion = (props: AccordionProps) => {
  const [isActive, setIsActive] = useState(false)

  return (
      <div
        className={props.containerClassOverride ?? "border-8 border-green-100 p-4 my-0.5"}
        onClick={(e) => { setIsActive((prevIsActive) => !prevIsActive); e.stopPropagation(); }}
      >
        <div className="d-flex">
          <div className={props.buttonClassOverride ?? "accordion-circle cursor-pointer d-flex my-auto"}><span className={props.buttonContentClassOverride ?? "text-3xl my-auto mx-auto symbol"}>{isActive ? "-" : "+"}</span></div>
          <div className={props.titleClassOverride ?? "font-bold my-auto ml-5"}>{props.title}</div>
        </div>
        {isActive && <div>{props.children}</div>}
      </div>
  )
}

export default Accordion