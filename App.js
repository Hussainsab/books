import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, collection, getDocs } from "./firebase/index";
export default function App() {
  const [data, setData] = useState([]);

  // get data from the firebase
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      console.log(`${doc.id} => ${data.title}`);
      setData((prev) => [...prev, data.title]);
    });
    // console.log(querySnapshot);
  };

  // to make a request only once to a data base when fisrt time the app loads
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{data[0] ?? "No data found"}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
