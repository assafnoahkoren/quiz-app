import axios from "axios";
import { action, autorun, makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import {JWTPayload} from "@shared/types/JWTPayload.ts";

// This store will manage the authentication state of the user
class AuthStore {
  jwt?: string;
  user?: JWTPayload;
  isLogged = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "AuthStore",
      properties: ["jwt", "isLogged", "user"],
      storage: window.localStorage,
    });
  }

  async login(email: string, password: string) {
    this.loading = true;
    let res;
    try {
      res = await axios.post("/auth/login", {
        email: email,
        password: password,
      });  
    } catch (error) {
      this.loading = false;
    }
    

    this.loading = false;

    const data = res?.data;

    runInAction(() => {
      if (data.user) {
        this.jwt = data.token;
        this.user = data.user;
        this.isLogged = true;
      }
      console.log(data);
      console.log("is logged: ", this.isLogged);
    });
  }

  
  logout() {
    runInAction(() => {      
      this.jwt = "";
      this.user = undefined;
      this.isLogged = false;
      window.location.href = "/";
    });

  }

  hasRole(role: string) {
    return this.user?.roles?.includes(role);
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
