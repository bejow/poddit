import React, { useState, useEffect } from "react"
import Select, { components } from "react-select"
import styles from "./SearchBar.module.scss"
import "./Searchbar.scss"
import SvgSearch from "../icons/Search"
import { SEARCHBAR_PLACEHOLDER } from "../../assets/constants/strings"
import { getCommunities } from "../../utils/api"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import useErrorStore from "../../states/Error"
import { useNavigate } from "react-router-dom"
import paths from "../../routing/routePaths"

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ]

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
  const [communities, setCommunities] = useState([])
  const { setError } = useErrorStore()
  const navigate = useNavigate()
  const { runAsyncFunction } = useAsyncLoading()
  useEffect(() => {
    try {
      runAsyncFunction(handleCommunities)
    } catch (error) {
      setError({ message: error.message })
    }
    return () => {}
  }, [])

  const handleCommunities = async () => {
    const fetchedCommunities = await getCommunities()
    setCommunities(
      fetchedCommunities.map((community) => ({ value: community.id, label: community.title })),
    )
  }

  const onSelectedChange = (option) => {
    setSelectedOption(option)
    navigate(`${paths.community}/${option.value}`)
  }
  return (
    <Select
      classNamePrefix="search"
      placeholder={SEARCHBAR_PLACEHOLDER}
      components={customComponents}
      className={styles.wrapper}
      value={selectedOption}
      onChange={onSelectedChange}
      options={communities}
    />
  )
}

export default SearchBar
