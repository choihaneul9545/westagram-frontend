const loginEvent = document.getElementsByClassName("loginbutton")[0];

loginEvent.addEventListener("click", function () {
  const id = document.getElementsByClassName("loginId")[0].value;
  const password = document.getElementsByClassName("loginPw")[0].value;

  if (!id) {
    alert("아이디를 입력해주세요!");
    return;
  }
  if (!password) {
    alert("비밀번호를 입력해주세요!");
    return;
  }
  alert("로그인 성공!!");
});

const loginBox = document.getElementsByClassName("login")[0];

loginBox.addEventListener("keyup", function () {
  const id = document.getElementsByClassName("loginId")[0].value;
  const password = document.getElementsByClassName("loginPw")[0].value;
  const color = document.getElementsByClassName("loginbutton")[0];
  if (id && password) {
    return (color.style.backgroundColor = "red");
  }
});