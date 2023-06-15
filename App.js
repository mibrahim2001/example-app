import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import AutoScrollFlatlist from "./components/AutoScrollFlatlist";

const { width, height } = Dimensions.get("window");
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 20 }}>
        Auto Scroll Flatlist Demo
      </Text>
      <AutoScrollFlatlist />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
});
