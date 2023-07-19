export const Selectedfood = ({ food }: { food: string[] }) => {
  if (food?.length)
    return (
      <>
        <div className="customer-food-container">
          <div className="customer-food-list">
            {food.map((foodItem) => {
              return <p key={foodItem}>{foodItem}</p>;
            })}
          </div>
        </div>
      </>
    );
  else {
    return (
      <>
        <div>You have not yet added any food to your order !</div>
      </>
    );
  }
};
