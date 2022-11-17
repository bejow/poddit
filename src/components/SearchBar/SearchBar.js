import React, { useState } from "react"
import Select, { components } from "react-select"
import styles from "./SearchBar.module.scss"
import "./Searchbar.scss"
import SvgSearch from "../icons/Search"
import { SEARCHBAR_PLACEHOLDER } from "../../assets/constants/strings"

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
]

const customComponents = {
  IndicatorsContainer: () => {
    return null
  },
  // eslint-disable-next-line react/prop-types
  Control: ({ children, ...props }) => {
    return (
      <components.Control className="search__control" {...props}>
        <SvgSearch className={styles.searchIcon} height="25px" width="25px" viewBox="0 0 30 30" />
        {children}
      </components.Control>
    )
  },
}

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState(null)

  const onSelectedChange = (option) => {
    setSelectedOption(option)
  }
  return (
    <Select
      classNamePrefix="search"
      placeholder={SEARCHBAR_PLACEHOLDER}
      components={customComponents}
      className={styles.wrapper}
      value={selectedOption}
      onChange={onSelectedChange}
      options={options}
    />
  )
}

export default SearchBar
