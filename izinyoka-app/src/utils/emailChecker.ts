export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// if (!isValidEmail(email)) {
//       Alert.alert("Invalid email", "Please ensure that the email is correct");
//       return;
//     }
//     if (!isStrongPassword(password)) {
//       Alert.alert(
//         "Password not strong enough",
//         "Please ensure that password has more than 6 characters, uppercase,number,symbol",
//       );
//       return;
//     }
