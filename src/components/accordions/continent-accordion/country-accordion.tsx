import Accordion from "../accordion/accordion";
import CountryAccordionProps from "../../../types/props/country-accordion-props.types";

const CountryAccordion = (props: CountryAccordionProps) => {
  return (
      <Accordion key={props.country} title={props.country} containerClassOverride="border-2 border-amber-200 p-4 my-0.5">
        <div><span className="font-bold">Capital City:&nbsp;</span><span>{props.capital}</span></div>
        <div><span className="font-bold">Languages:&nbsp;</span><span>{props.languages.join(", ")}</span></div>
      </Accordion>
  )
}

export default CountryAccordion