function validate() {

  if (document.logInForm.fname.value == "") {
    alert("First name cannot be empty.");
    document.getElementsByTagName("fname").style.color = "red";
    return false;
  }

  if (document.logInForm.lname.value == "") {
    alert("Last name cannot be empty.");
    document.logInForm.lname.focus();
    return false;
  }
  if (document.logInForm.password.value == "") {
    alert("Password cannot be empty");
    document.logInForm.password.focus();
    return false;
  }
  return true;
}
