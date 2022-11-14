import React, {useState} from "react";

type SearchProps = {
  search: Function;
}

function Search (props: SearchProps): JSX.Element {
  const [searchValue, setSearchValue] = useState('');

  function handleSearchInputChanges (e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(e.target.value);
  }

  function resetInputField (): void {
    setSearchValue('');
  }

  function callSearchFunction (e: React.FormEvent<HTMLInputElement>): void {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <form className="search">
        <input value={searchValue} onChange={handleSearchInputChanges} type="text"/>
        <input onClick={callSearchFunction} type="submit" value="SEARCH"/>
      </form>
  )
}

export default Search;
