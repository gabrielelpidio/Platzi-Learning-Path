import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { MdImage, MdSave, MdOpenInNew } from 'react-icons/md';
import { ActionButton, ActionLinkButton } from './ActionButton';
import { Modal } from './Modal';

const saveBase64AsFile = (base64, fileName) => {
  const link = document.createElement('a');

  link.setAttribute('href', base64);
  link.setAttribute('download', fileName);
  link.click();
};

const saveImage = link => saveBase64AsFile(link, `ruta-de-aprendizaje`);
const openInNewTab = link =>
  window
    .open()
    .document.write(
      '<iframe src="' +
        link +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
// window.open().document.write(`<img src="${canvas.toDataURL()}" />`);

export const CaptureScreen = ({ className, username, items }) => {
  const [imgLink, setImgLink] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const captureScreen = () => {
    console.log(html2canvas);
    html2canvas(document.body, {
      scale: 1,
      width: 1000,
      height: 1000,
      windowWidth: 1000,
      windowHeight: 1000
    }).then(c => {
      setImgLink(c.toDataURL());
      setShowModal(true);
    });
  };

  const show = items > 2;
  const handleModal = bool => {
    setShowModal(bool);
  };

  return (
    <div>
      <ActionButton show={show} onClickAction={() => captureScreen()}>
        <MdImage className="m-auto" />
      </ActionButton>
      <Modal onOutClick={handleModal} show={showModal}>
        <div className="w-full max-w-md h-auto p-6 pb-0">
          <img
            src={imgLink}
            alt=""
            className="shadow-lg border-gray-300 border-solid border-2"
          />
        </div>
        <div className="flex align-middle text-center px-6 my-2">
          <ActionButton
            onClickAction={() => saveImage(imgLink)}
            show={show && imgLink}
          >
            <MdSave className="m-auto" />
          </ActionButton>
          <span className="my-auto md:text-sm">Guardar Imagen</span>
        </div>
      </Modal>
    </div>
  );
};
