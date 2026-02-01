import { Outlet, useSearchParams } from "react-router"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"
import { useState, useEffect } from "react"


const SearchLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get("q")
  const [recentSearches, setRecentSearches] = useState([])
  const [query, setQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setSearchParams({ q: "" })
      return
    }

    setSearchParams({ q: trimmedQuery })
  }

  useEffect(() => {
    setQuery(searchTerm ? searchTerm.trim() : "")
  }, [searchTerm])

  return (
    <div className="mx-auto w-17/20 max-w-4xl">
      <div className="py-6 md:hidden">
        <form onSubmit={handleSearch}>
          <InputGroup className="h-11 rounded-full">
            <InputGroupInput placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
      {(!searchTerm || searchTerm.trim() === "") ? (
        <div className="md:pt-10">
          <span className="font-semibold text-2xl md:text-5xl">Recent Searches</span>
          <div className="py-6 md:py-10">
            <span className="text-muted-foreground md:text-xl">You have no recent searches</span>
          </div>
        </div>
      ) : <p>Results here {searchTerm}</p>}

    </div>
  )
}

export default SearchLayout
