import { makeAutoObservable, runInAction } from "mobx";

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
      if (data.user) {
        this.jwt = data.token;
        this.isLogged = true;
      }
      console.log(data);
      console.log("is logged: ", this.isLogged);
    });
  }

  logout() {
    runInAction(() => {
      this.jwt = "";
      this.isLogged = false;
      console.log("is logged: ", this.isLogged);
    });
  }

  async register(email: string, password: string, name: string) {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    const data = await res.json();
    runInAction(() => {
      if (data.user) {
        this.jwt = data.token;
        this.isLogged = true;
      }
      console.log(data);
      console.log("is logged: ", this.isLogged);
    });
  }

  logut() {
    this.jwt = undefined;
    this.isLogged = false;
  }
}

export const authStore = new AuthStore();
