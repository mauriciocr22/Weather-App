import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchCities, City } from "../services/weatherService";

export default function SearchBar({ onCitySelect }: { onCitySelect: (city: City) => void }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const cities = await fetchCities(query);
        setSuggestions(cities);
      } catch (error) {
        console.error("Erro ao buscar cidade", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative bg-[#fefefe] w-[375px] md:w-[450px] ${suggestions.length > 0 || loading ? "rounded-t-3xl" : "rounded-3xl"} border border-[#e5e5e5] shadow-md hover:shadow-sm transition-shadow duration-200`}>
      {/* Input */}
      <div className="flex items-center justify-center w-full py-2">
        <FaSearch className="fill-gray-500" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[88%] focus:outline-none pl-4 text-lg"
          placeholder="Digite sua cidade"
        />
      </div>

      {/* Autocomplete */}
      {loading && <p className="absolute top-full left-0 w-full bg-[#fefefe] border-t-0 border border-[#e5e5e5] rounded-b-3xl shadow-md z-10 text-gray-600 text-center py-2">Carregando...</p>}
      {suggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="absolute top-full left-0 w-full bg-[#fefefe] border-t-0 border border-[#e5e5e5] rounded-b-3xl shadow-md z-10"
        >
          {suggestions.map((city: City) => {
            const displayText = `${city.name}${city.state ? `, ${city.state}` : ""} - ${city.country}`;
            return (
              <li
                key={`${city.name}-${city.lat}-${city.lon}`}
                className="p-2 px-6 cursor-pointer hover:bg-gray-200 text-lg"
                onClick={() => {
                  setSuggestions([]);
                  onCitySelect(city);
                  setQuery("");
                  console.log(city);
                }}
              >
                {displayText}
              </li>
            );
          })}
        </ul>
      )}
    </div>



    // <div className="relative">
    //   <input
    //     type="text"
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //     placeholder="Digite a cidade"
    //     className="w-full p-2 border rounded"
    //   />
    //   {loading && <p className="text-gray-500">Carregando...</p>}
    //   {suggestions.length > 0 && (
    //     <ul className="absolute z-10 w-full bg-white border rounded shadow-md">
    //       {suggestions.map((city: City) => (
    //         <li
    //           key={`${city.name}-${city.lat}-${city.lon}`}
    //           className="p-2 cursor-pointer hover:bg-gray-200"
    //           onClick={() => {
    //             onCitySelect(city);
    //             setQuery(city.name); // Atualiza o input com o nome selecionado
    //             setSuggestions([]);  // Limpa as sugestões
    //           }}
    //         >
    //           {city.name}, {city.country}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>





    // ${query && "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[90%] after:h-[1px] after:bg-gray-300"}
  )
}