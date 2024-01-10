import Accordion from "../accordion/accordion";
import ContinentAccordionProps from "../../../types/props/continent-accordion-props.types";

const ContinentAccordion = (props: ContinentAccordionProps) => {
  return (
      <Accordion key={props.continent} title={props.continent}>
        {props.children}
      </Accordion>
  )
}

export default ContinentAccordion