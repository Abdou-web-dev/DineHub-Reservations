// import food_4 from "../../assets/img/food_item/food_4.svg"
// import food_1 from "../../assets/img/food_item/food-dish.svg"

import { Button } from "antd";
import "./modal_styles.scss";

export const ButtonsModalContent = ({
  //   foodList,
  setShowChoosenFoodInfos,
  setShowChoosenFood,
}: {
  //   foodList: [{ food_value: string; food_id: number }];
  setShowChoosenFood: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChoosenFoodInfos: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  let list_of_images = [
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=600",
    `https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80`,
    "https://plus.unsplash.com/premium_photo-1664297897697-b8ee713dbe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1556269923-e4ef51d69638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80",
    "https://plus.unsplash.com/premium_photo-1661677259637-1996c342299a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=449&q=80",
    "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1479894127662-a987d1e38f82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1457785097656-8ac31dcf679f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1685633224237-71b3a2022715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    "https://images.resto.com/view?iid=resto.be:3ad5f416-3176-4626-8575-d5a73ba939c3&context=default&imageType=JPEG&hash=622dbac8ded08e35390d83bf941d3795",
  ];
  const generateRandomBgImage = (): string => {
    let bg_image =
      list_of_images[Math.floor(Math.random() * list_of_images.length)];
    return bg_image;
  };

  return (
    <>
      <div className="btns-modal-content-container">
        <Button
          style={{
            background: `url(${generateRandomBgImage()})`,
            backgroundSize: "cover",
          }}
          className="f-list-btn"
          onClick={() => setShowChoosenFood(true)}
        >
          <span>View food list</span>
        </Button>
        <Button
          className="f-infos-btn"
          onClick={() => setShowChoosenFoodInfos(true)}
        >
          <span>View food infos</span>
        </Button>
      </div>
    </>
  );
};
