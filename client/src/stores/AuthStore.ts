import { action, makeAutoObservable, runInAction } from "mobx";

// This store will manage the authentication state of the user
class AuthStore {
  jwt?: string;
  isLogged = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(email: string, password: string) {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    runInAction(() => {
        this.jwt = data.token;
        this.isLogged = true;
    });
    
  }

  register(email: string, password: string) {
    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  logut() {
    this.jwt = undefined;
    this.isLogged = false;
  }


}

export const authStore = new AuthStore();

//@ts-ignore
window.authStore = authStore;