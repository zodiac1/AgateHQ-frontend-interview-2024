import ContinentAccordion from "../../accordions/continent-accordion/continent-accordion";
import CountryAccordion from "../../accordions/continent-accordion/country-accordion";

const ContinentsView = (props: {continents: Map<string, Map<string, Country>>}): JSX.Element => {
    const continentsBuffer: JSX.Element[] = [];
    const countriesBuffer: Map<string, JSX.Element[]> = new Map<string, JSX.Element[]>();

    props.continents.forEach((continent, key) =>
        {continent.forEach((country, key) => {
            if (country.continent && key) {
                let countries = countriesBuffer.get(country.continent);

                if (!countries) {
                    countries = [];
                }

                countries.push(<CountryAccordion key={key} country={key} capital={country.capital} languages={country.languages} />);
                countriesBuffer.set(country.continent, countries);
            }
        })}
    );

    props.continents.forEach((continent, key) =>
    {
        if (key) {
            continentsBuffer.push(
                <ContinentAccordion key={key} continent={key}>
                    <div className="mt-4">
                        {countriesBuffer.get(key)}
                    </div>
                </ContinentAccordion>
            )
        }
    }
    );

    return <>{continentsBuffer}</>;
}

export default ContinentsView