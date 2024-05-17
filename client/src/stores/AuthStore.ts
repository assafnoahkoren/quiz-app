import axios from "axios";
import { autorun, makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";

// This store will manage the authentication state of the user
class AuthStore {
  jwt?: string;
  isLogged = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "AuthStore",
      properties: ["jwt", "isLogged"],
      storage: window.localStorage,
    });
  }

  async login(email: string, password: string) {
    const res = await axios.post("/auth/login", {
      email: email,
      password: password,
    });
    const data = res.data;

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
    const res = await axios.post("/auth/register", {
      email: email,
      password: password,
      name: name,
    });
    const data = res.data;
    
    runInAction(() => {
      if (data.user) {
        this.jwt = data.token;
        this.isLogged = true;
      }
      console.log(data);
      console.log("is logged: ", this.isLogged);
    });
  }

}

export const authStore = new AuthStore();

autorun(() => {
  console.log('Setting axios headers', authStore.jwt);
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = authStore.jwt;
    return config;
  });
})
