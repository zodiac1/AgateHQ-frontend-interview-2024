import countriesByContinentJson from "../resources/country-data/country-by-continent.json"
import countriesByCapitalCityJson from "../resources/country-data/country-by-capital-city.json"
import countriesByLanguagesJson from "../resources/country-data/country-by-languages.json"

function saveCountriesByLanguage(countriesByName: Map<string, Country>) {
    countriesByLanguagesJson.forEach((c: {country: string, languages: string[]}) => {
        const country = countriesByName.get(c.country);

        if (country) {
            country.languages = c.languages;
            countriesByName.set(c.country, country);
        }
        else {
            // Ignore for now
        }
    });
}

function saveCountriesByContinent(countriesByName: Map<string, Country>) {
    countriesByContinentJson.forEach((c: {country: string, continent: string}) => {
        const country = countriesByName.get(c.country);

        if (country) {
            country.continent = c.continent;
            countriesByName.set(c.country, country);
        }
        else {
            // Ignore for now
        }
    });
}

function saveCountriesByCapital(countriesByName: Map<string, Country>) {
    countriesByCapitalCityJson.forEach((c: {country: string, city: string | null}) => {
        countriesByName.set(c.country, {country: c.country, continent: "", capital: c.city, languages: []})
    });
}

function aggregateCountriesByContinent(countriesByName: Map<string, Country>): Map<string, Map<string, Country>> {
    const countriesByContinent: Map<string, Map<string, Country>> = new Map<string, Map<string, Country>>();

    countriesByName.forEach((c: Country) => {
        let countries = countriesByContinent.get(c.continent);

        if (!countries) {
            countries = new Map<string, Country>();
        }

        countries.set(c.country, c);
        countriesByContinent.set(c.continent, countries);
    });

    return countriesByContinent;
}


export function getCountriesByContinent(): Map<string, Map<string, Country>> {
    const countriesByName: Map<string, Country> = new Map<string, Country>();

    saveCountriesByCapital(countriesByName);
    saveCountriesByLanguage(countriesByName);
    saveCountriesByContinent(countriesByName);

    return aggregateCountriesByContinent(countriesByName);
}

export function getCountriesByContinentAsc(): Map<string, Map<string, Country>> {
    const countriesByContinent = getCountriesByContinent();
    const continentNamesAsc = Array.from(countriesByContinent.keys()).sort();
    const countriesByContinentAsc: Map<string, Map<string, Country>> = new Map<string, Map<string, Country>>();

    continentNamesAsc.forEach((continentName: string) => {
        const continentData = countriesByContinent.get(continentName);

        if (continentData) {
            countriesByContinentAsc.set(continentName, continentData);
        }
    });

    countriesByContinent.forEach((countries: Map<string, Country>, key) => {
        const countryNamesAsc = Array.from(countries.keys()).sort();
        const countriesAsc = new Map<string, Country>();

        countryNamesAsc.forEach((countryName: string) => {
            const countryData = countries.get(countryName);

            if (countryData) {
                countriesAsc.set(countryName, countryData);
            }
        });

        countriesByContinentAsc.set(key, countriesAsc);
    });

    return countriesByContinentAsc;
}