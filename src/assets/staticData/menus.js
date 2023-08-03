const lunch_menu = [
  { value: "Slow-roasted beef with mustard potatoes recipe" },
  {
    value: "tacos",
    disabled: isListContainsObject({ food_value: "tacos" }, storedItems),
  },
  {
    value: "pizza",
    disabled: isListContainsObject({ food_value: "pizza" }, storedItems),
  },
  {
    value: "sandwich",
    disabled: isListContainsObject({ food_value: "sandwich" }, storedItems),
  },
  {
    value: "Shawarma",
    disabled: isListContainsObject({ food_value: "Shawarma" }, storedItems),
  },
  {
    value: "hamburger",
    disabled: isListContainsObject({ food_value: "hamburger" }, storedItems),
  },
  {
    value: "tajine",
    disabled: isListContainsObject({ food_value: "tajine" }, storedItems),
  },
  {
    value: "burger",
    disabled: isListContainsObject({ food_value: "burger" }, storedItems),
  },
  {
    value: "salad",
    disabled: isListContainsObject({ food_value: "salad" }, storedItems),
  },
  {
    value: "ANY",
    // disabled: containsObject({ food_value: "" }, storedItems),
  },
];
