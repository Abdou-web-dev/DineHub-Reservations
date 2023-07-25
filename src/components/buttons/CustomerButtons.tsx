import { Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../../feature/customerSlice";
import { CloseXIconBtn } from "../icons/Icons";
import { CancelBtn, CancelBtn as NoBtn } from "./CancebBtn";
import { OrderBtn, OrderBtn as YesBtn } from "./OrderBtn";
import "./btns_styles.scss";

interface CustomerButtonsType {
  foodList: [
    {
      food_value: string;
      food_id: number;
    }
  ];
  index: number;
  setOpenOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAutoCompleteBorder: React.Dispatch<React.SetStateAction<string>>;
}

export function CustomerButtons({
  foodList,
  index,
  setOpenOrderModal,
  setAutoCompleteBorder,
}: CustomerButtonsType) {
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  console.log(foodList.length);
  // each customer card has a unique index key obtained with this line of code:
  //  customers.map((customer: Customer, index: number) => { return <CustomerCard .../>}
  function handleOrder() {
    setOpenOrderModal(true);
  }

  return (
    <div className="customer-card-btns-container">
      <CancelBtn
        // handleCancelClick={() => dispatch(deleteCustomer(index))}
        handleCancelClick={() => setOpenDeleteModal(true)}
        label="Cancel"
        {...{ index }}
      />
      <OrderBtn
        label="Order"
        {...{ foodList, handleOrder, setAutoCompleteBorder }}
      />
      <>
        <Modal
          destroyOnClose
          // when closing the modal and then reopening it, only a portion of the next random generated bg image is displayed
          // by adding destroyOnClose prop, the bg image of ButtonsModalContent component is no longer
          // displayed partially, and so it's displayed totally
          className="order-customer-card-modal"
          open={openDeleteModal}
          maskClosable={true}
          closable={false}
          keyboard={true}
          mask={true}
          onOk={() => setOpenDeleteModal(false)}
          onCancel={() => setOpenDeleteModal(false)}
          width={"40%"}
          footer={null}
          title={
            <div className="order-customer-card-modal-header">
              <span>Delete this order ?</span>
              <div className="order-customer-card-modal-header-close-icon">
                <CloseXIconBtn
                  handleCloseClick={() => setOpenDeleteModal(false)}
                />
              </div>
            </div>
          }
        >
          <div className="yes-no-btns">
            <NoBtn
              handleCancelClick={() => setOpenDeleteModal(false)}
              label="No"
            />
            <YesBtn
              handleOrder={() => dispatch(deleteCustomer(index))}
              label="Yes"
            />
          </div>
        </Modal>
      </>
    </div>
  );
}
