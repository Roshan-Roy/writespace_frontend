import { Outlet, useSearchParams, NavLink } from "react-router"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"
import { useState, useEffect, Fragment } from "react"
import { profileLinks } from "@/constants/ProfileLinks"
import searchLinks from "@/constants/SearchLinks"

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
      ) : (
        <div className="pt-1 md:pt-10">
          <div className="pb-4 md:pb-6">
            <p className="font-semibold text-2xl md:text-5xl truncate">
              <span className="text-muted-foreground">Results for </span>
              <span className="text-foreground">{searchTerm.trim()}</span>
            </p>
          </div>
          <div className="flex sticky top-14 z-20 bg-background">
            {searchLinks.map(e => {
              return (
                <Fragment key={e.route}>
                  <NavLink to={`${e.route}?q=${encodeURIComponent(searchTerm.trim())}`} className={({ isActive }) => `py-3 md:py-4 border-b-2 ${isActive ? "border-b-foreground text-foreground" : "border-muted text-foreground/70 hover:text-foreground"}`} end={e.route === "."}>{e.label}</NavLink>
                  <div className="border-b-2 border-muted w-6 md:w-8"></div>
                </Fragment>
              )
            })}
            <div className="border-b-2 border-muted flex-1"></div>
          </div>
          <Outlet />
        </div>
      )}

    </div>
  )
}

export default SearchLayout
