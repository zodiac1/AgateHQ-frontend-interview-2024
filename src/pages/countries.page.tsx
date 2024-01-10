import { useState, useMemo, useRef } from "react"
import SearchBar from '../components/search-bar/search-bar';
import ContinentsView from '../components/views/continents/continent-view';
import { getCountriesByContinentAsc } from '../helpers/country-data-helpers';
import $ from "jquery";

const CountriesPage = () => {
    const countriesByContinentAsc = useMemo(() => getCountriesByContinentAsc(), []);
    const [searchText, setSearchText] = useState<string | null>(null);
    const filteredCountries = useMemo(() => {
        if (searchText &&
            searchText.trim().length > 0) {
                const filteredContinents = new Map<string, Map<string, Country>>();

                countriesByContinentAsc.forEach((countries: Map<string, Country>) => {
                    const filteredCountries = new Map<string, Country>();

                    countries.forEach((country: Country) => {
                        if (country.capital?.toLocaleLowerCase().startsWith(searchText) ||
                            country.country.toLocaleLowerCase().startsWith(searchText)) {
                                filteredCountries.set(country.country, country);
                                filteredContinents.set(country.continent, filteredCountries);
                        }
                    });

                });

                return filteredContinents;
        } else {
            return countriesByContinentAsc;
        }
    }, [searchText]);

    function searchBarKeyUpHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        const searchText = e.currentTarget.value.toLocaleLowerCase();
        setSearchText(searchText);
    }

    function clearSearchText() {
        $("#search-text").val("");
    }

    return (
        <>
            {filteredCountries &&
                <>
                    <SearchBar onKeyUp={(e) => searchBarKeyUpHandler(e)} onClick={() => { clearSearchText(); setSearchText(null); } } />
                    <ContinentsView continents={filteredCountries} />
                </>
            }
        </>
    )
}

export default CountriesPage