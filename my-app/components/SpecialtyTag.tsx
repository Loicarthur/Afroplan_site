import React from "react";
import { View, Text } from "react-native";
import { Specialty } from "../lib/types";

interface SpecialtyTagProps {
  label: Specialty | string;
  active?: boolean;
}

export default function SpecialtyTag({ label, active = false }: SpecialtyTagProps) {
  return (
    <View
      className={`px-3 py-1 rounded-full border ${
        active
          ? "bg-afro-black border-afro-black"
          : "bg-afro-tag-bg border-afro-border"
      }`}
    >
      <Text className={`text-xs font-medium ${active ? "text-white" : "text-afro-dark"}`}>
        {label}
      </Text>
    </View>
  );
}
