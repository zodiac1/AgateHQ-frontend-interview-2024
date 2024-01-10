import SearchBarProps from "../../types/props/search-bar-props"

const SearchBar = (props: SearchBarProps) => {
  return (
      <div>
        <label htmlFor="search-text"className="mr-10">Search:</label>
        <input autoFocus id="search-text" type="text" placeholder="Country or Capital City" className="border border-2 border-green-600 mx-12 my-3 text-2xl w-10/12 p-2" onKeyUp={props.onKeyUp} />
        <button id="search-button" className="bg-red-500 font-bold hover:bg-red-700 px-4 py-2 rounded text-white" onClick={props.onClick}>Reset</button>
      </div>
  )
}

export default SearchBar