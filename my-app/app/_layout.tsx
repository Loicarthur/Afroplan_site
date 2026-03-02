import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <View className="flex-1 bg-afro-light-gray">
        <Header />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
            animation: "fade",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="coiffeurs" />
          <Stack.Screen name="hair-types" />
          <Stack.Screen name="about" />
          <Stack.Screen name="coiffeur/[id]" />
          <Stack.Screen name="booking/[id]" />
        </Stack>
      </View>
    </>
  );
}
