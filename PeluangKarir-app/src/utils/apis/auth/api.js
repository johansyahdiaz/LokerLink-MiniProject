export const userRegister = async (data) => {
  return new Promise((resolve, reject) => {
    const existingUser = localStorage.getItem("email");

    if (existingUser) {
      reject({ message: "email already exists", payload: null });
    } else {
      localStorage.setItem("UserId", data.userId);
      localStorage.setItem("companyName", data.companyName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("phoneNumber", data.phoneNumber);
      localStorage.setItem("password", data.password);

      setTimeout(() => {
        resolve({ message: "Register Success", payload: data });
      }, 1000);
    }
  });
};

export const userLogin = async (data) => {
  return new Promise((resolve, reject) => {
    const savedEmail = localStorage.getItem("email", data.email);
    const savedPassword = localStorage.getItem("password", data.password);

    setTimeout(() => {
      if (data.email === savedEmail && data.password === savedPassword) {
        resolve({ message: "Login Success", payload: data });
      } else if (data.email === savedEmail && data.password !== savedPassword) {
        reject({ message: "Invalid password", payload: null });
      } else if (data.email !== savedEmail && data.password === savedPassword) {
        reject({ message: "Invalid username", payload: null });
      } else {
        reject({ message: "Invalid email or password", payload: null });
      }
    }, 1000);
  });
};
