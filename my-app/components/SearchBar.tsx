import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Search, MapPin, ChevronDown, SlidersHorizontal, Baby } from "lucide-react-native";

interface SearchBarProps {
  onSearch?: (query: string, location: string) => void;
}

const FILTERS = ["Filtres", "Kids friendly"];

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <View className="gap-3">
      {/* Main search row */}
      <View className="flex-row items-center bg-white border border-afro-border rounded-2xl overflow-hidden shadow-sm">
        {/* Service search */}
        <View className="flex-1 flex-row items-center px-4 py-3 gap-2">
          <Search size={18} color="#6B6B6B" />
          <TextInput
            placeholder="Recherche par type de coiffeur, coiffeur"
            placeholderTextColor="#9B9B9B"
            value={query}
            onChangeText={setQuery}
            className="flex-1 text-afro-black text-sm"
          />
        </View>

        {/* Divider */}
        <View className="w-px h-8 bg-afro-border" />

        {/* Location */}
        <View className="flex-row items-center px-4 py-3 gap-2" style={{ minWidth: 180 }}>
          <MapPin size={18} color="#6B6B6B" />
          <TextInput
            placeholder="Ville, quartier..."
            placeholderTextColor="#9B9B9B"
            value={location}
            onChangeText={setLocation}
            className="flex-1 text-afro-black text-sm"
          />
        </View>

        {/* Divider */}
        <View className="w-px h-8 bg-afro-border" />

        {/* Ou dropdown */}
        <TouchableOpacity className="flex-row items-center px-4 py-3 gap-1">
          <Text className="text-afro-gray text-sm">Où</Text>
          <ChevronDown size={16} color="#6B6B6B" />
        </TouchableOpacity>

        {/* Search button */}
        <TouchableOpacity
          className="bg-afro-black px-6 py-4 m-1 rounded-xl"
          onPress={() => onSearch?.(query, location)}
        >
          <Text className="text-white font-medium text-sm">Rechercher</Text>
        </TouchableOpacity>
      </View>

      {/* Filter tags */}
      <View className="flex-row gap-2">
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(activeFilter === filter ? null : filter)}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full border ${
              activeFilter === filter
                ? "bg-afro-black border-afro-black"
                : "bg-white border-afro-border"
            }`}
          >
            {filter === "Filtres" ? (
              <SlidersHorizontal size={14} color={activeFilter === filter ? "white" : "#1A1A1A"} />
            ) : (
              <Baby size={14} color={activeFilter === filter ? "white" : "#1A1A1A"} />
            )}
            <Text className={`text-xs font-medium ${activeFilter === filter ? "text-white" : "text-afro-dark"}`}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
