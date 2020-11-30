"use strict";

const userId = document.querySelector(".user__id");
const userPw = document.querySelector(".user__pw");
const loginBtn = document.querySelector(".login__btn");
const login__form = document.querySelector(".login__form");

const checkUserLogin = (event) => {
  const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const userIdValue = userId.value;
  const userPwValue = userPw.value;
  const errorMsg = document.querySelector(".login__error");
  if (
    emailCheck.test(String(userIdValue).toLowerCase()) === false ||
    userPwValue.length < 5
  ) {
    errorMsg.innerText = "계정을 다시 확인해주세요";
  } else {
    errorMsg.innerText = "로그인 성공";
  }
};

const chnageBtn = () => {
  const currentBtn = userId.value && userPw.value;
  loginBtn.disabled = currentBtn ? false : true;
};

const init = () => {
  userId.addEventListener("keyup", chnageBtn);
  userPw.addEventListener("keyup", chnageBtn);
  loginBtn.addEventListener("click", checkUserLogin);
  loginBtn.disabled = true;
};

init();