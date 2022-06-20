import { Button, Modal } from 'antd';
import React, { useState } from 'react';



export default function ConfirmModal({onConfirm, onCancel, children}){
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={hideModal}
      >
        {children}
      </Modal>
    </>
  );
};