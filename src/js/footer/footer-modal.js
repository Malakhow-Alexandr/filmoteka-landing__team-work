// const refs = {
//     openModalBtn: document.querySelector('[data-action="open-modal"]'),
//     closeModalBtn: document.querySelector('[data-action="close-modal"]'),
//     backdrop: document.querySelector(".js-backdrop"),
//   };
  
//   refs.openModalBtn.addEventListener("click", onOpenModalBtnClick);
//   refs.closeModalBtn.addEventListener("click", onCloseModalBtnClick);
//   refs.backdrop.addEventListener("click", onBackDropClick);
  
//   function onOpenModalBtnClick(event) {
//     document.body.classList.add("show-modal");
//     window.addEventListener("keydown", onEscBtnPress);
//   }
  
//   function onCloseModalBtnClick(event) {
//     document.body.classList.remove("show-modal");
//     window.removeEventListener("keydown", onEscBtnPress);
//   }
  
//   function onBackDropClick(event) {
//     if (event.currentTarget === event.target) {
//       onCloseModalBtnClick();
//     }
//   }
  
//   function onEscBtnPress(event) {
//     console.log(event);
//     if (event.code === "Escape") {
//       onCloseModalBtnClick();
//     }
//   }
  