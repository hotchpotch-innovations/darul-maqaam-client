// Utility function to filter out undefined, null, or empty values from an object
const filterUndefinedValues = <T extends Record<string, any>(obj: T): Partial<T> => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    ) as Partial<T>;
  };
  
  
  const data = {
    name: "John Doe",
    age: 30,
    email: null,
    address: "",
    isActive: undefined,
  };
  
  const filteredData = filterUndefinedValues(data);
  console.log(filteredData);
  // Output: { name: "John Doe", age: 30 }
  