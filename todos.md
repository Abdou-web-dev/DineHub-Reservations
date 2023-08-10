# Todo1: add a map above the customer's order, so that when a user chooses a location from the select dropdown,he will see a red circle placed above this location

# Todo2: if the foodList contains more than 3 food items that have more than 10 characters each, then change the direction of the dragging to be vertical, if not, leave it as horizontal

# Todo3: when clicking on newFoodItem button, display a spinner, then the description text, then OK btn , if Ok clicked , close the modal

# Todo4: when the reservation infos are filled, allow the user to modify them through btns, when the user hovers over each CARD.

<!-- concerning number of guests , show + - btns when the user hovers, hide them when he hovers outside the card -->
<!-- concerning date , show dateIconBtn when the user hovers, hide it when he hovers outside the card -->
<!-- concerning time , show dateIconBtn when the user hovers, hide it when he hovers outside the card -->

# Todo5: add a border around the droppable area, when the user is dragging items

# Todo6: wadd info btn below the food items, on hover , display this msg : You can reorder these items by dragging and dropping them,

# Todo7: on hovering on each food item option button, the descirption will appear below , preceded by a spinner

# Todo8: when the user selects lunch or dinner menu, display three buttons next to the AutoComplete : meals, dessert, ALL.

dinner will have its specific desserts , lunch too.

# Todo9: if a food item is added manually with the AutoComplete, display it as a disabled btn , and when the user hovers over it , display this msg : We don't serve this meal, please choose from the list above, and delete this item from the storedItems array inside FoodListModalContent component

# todo10: You can further enhance the app by adding features like quantity selection, total order cost calculation, and more.

# todo11 : add sub-options for Lasagne ; Wings, Wraps ...

https://realfood.tesco.com/search.html?&page=2&Course=Lunch
https://realfood.tesco.com/recipes/teriyaki-wings.html
https://realfood.tesco.com/recipes/sticky-sweet-chilli-wings.html
https://realfood.tesco.com/recipes/garlic-and-pesto-wings.html
sub items :
Garlic and pesto wings recipe

\*\*

- \*\*
  <!-- use mantine react components library in a new project with React Query  --> npm i @mantine/core !!!!!!

<!-- @AbdelmounimSIFELHAK All the customer data is in the Redux store, you can use the useSelector to select the customer state, and if you need to access a specific customer's data you can write a selector function that takes a customer id value and searches the customers array. There shouldn't be much to need to pass around in props. – -->

# Redux/persisting state infos: @AbdelmounimSIFELHAK The frontend app state is effectively just another cache. Persisting the store to localStorage is a way to keep the cache around longer so you won't necessarily need to refetch all of the data every time the app mounts or the page reloads. Sure, you can use Redux and any number of React Contexts. –

# Redux/persisting state infos: @AbdelmounimSIFELHAK That depends entirely on the UX you want and how much network traffic you want to create or handle. It can vary depending on app needs. You could persist nothing and refetch everything every time if that is necessary, or you could cache/persist everything and only occasionally "check-in"/refetch data. Or anything between, like persisting auth state and basic necessary data, and always fetching on-demand content that updates in the backend often. Does this make sense? There's no one single solution for all. –

# props drilling in React: Too subjective to answer. I try to not pass props more than a couple layers deep, but that's my personal preference/rule. 3-4 doesn't seem unreasonable for a general "rule of thumb". Yes, beyond this it is quite excessive to need to ensure all components are passing all extra props they don't care about. This is the madness of props drilling that is unnecessary and completely avoidable.

// https://stackoverflow.com/questions/62378796/cannot-destructure-property-of-object-from-context
// the solution is to wrap the components with the context Provider

// https://www.npmjs.com/package/turnstone
// Turnstone is a highly customisable, easy-to-use autocomplete search component for React.
// Yes, you can have as many global variables (context values) in a context file as you need. However, keep in mind that having too many context values might lead to more complex management and potential performance issues. It's generally a good practice to group related state variables together in a single context if possible.
