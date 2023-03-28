import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageUtil = () => {
  const storeData = async (value) => {
    // try {
    //   let jsonValue = "";
    //   let storageData = await getData();
    //   const storageKey = value.name;
    //   if (Array.isArray(storageData)) {
    //     let tmpArr = [...storageData];
    //     tmpArr.push(value);
    //     jsonValue = JSON.stringify([...tmpArr]);
    //   } else {
    //     jsonValue = JSON.stringify([value]);
    //   }

    //   try {
    //     await AsyncStorage.setItem(storageKey, jsonValue);
    //     return "success";
    //   } catch (err) {
    //     console.log("##err in setItem", err);
    //     return "error";
    //   }
    // } catch (error) {
    //   console.log("##error", error);
    //   return "error";
    // }
    try {
      const storageKey = value.name;
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
      return "success";
    } catch (err) {
      console.log("##err in setItem", err);
      return "error";
    }
  };

  const updateData = async (value) => {
    try {
      const storageKey = value.name;
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
      return "success";
    } catch (err) {
      console.log("##err in updateData", err);
      return "error";
    }
  };

  const getData = async () => {
    // try {
    //   const jsonValue = await AsyncStorage.getItem(storageKey);
    //   let resArr;
    //   console.log(
    //     "##jsonValue",
    //     typeof jsonValue !== "object",
    //     jsonValue !== null,
    //     jsonValue !== "null"
    //   );
    //   if (
    //     typeof jsonValue !== "object" &&
    //     jsonValue !== null &&
    //     jsonValue !== "null"
    //   ) {
    //     console.log("##????");
    //     resArr = JSON.parse(jsonValue);
    //     console.log("##resArr", resArr, Array.isArray(resArr), typeof resArr);
    //   }
    //   if (Array.isArray(resArr)) {
    //     console.log("##getData1");
    //     return resArr;
    //   } else {
    //     console.log("##getData2");
    //     return [];
    //   }
    // } catch (err) {
    //   console.log("##err in getData", err);
    // }
    try {
      const values = await getMultiple();
      const newValues = values.map((item) => {
        return JSON.parse(item[1]);
      });
      console.log("##newValues", newValues);
      return newValues;
    } catch (err) {
      console.log("##err in getData", err);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Clear.");
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (err) {
      console.log("##err in getAllKeys", err);
    }
  };

  const getMultiple = async () => {
    let values;
    try {
      const keys = await getAllKeys();
      if (keys && keys.length > 0)
        try {
          values = await AsyncStorage.multiGet(keys);
          return values;
        } catch (err) {
          console.log("##err in getMultiple", err);
        }
    } catch (err) {
      console.log("##err in getMultiple", err);
    }
  };

  return {
    storeData: storeData,
    getData: getData,
    removeValue: removeValue,
    updateData: updateData,
    clearAll: clearAll,
  };
};

const storageUtil = StorageUtil();
export { storageUtil };
