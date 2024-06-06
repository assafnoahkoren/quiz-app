import {Button, SwipeableDrawer, Switch} from "@mui/material";
import { uiStore } from "../stores/UIStore";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";
import NiceModal from "@ebay/nice-modal-react";
import {quizStore} from "../stores/QuizStore.ts";
import {dataStore} from "../stores/DataStore.ts";

export const Sidebar = observer(() => {
  return (
    <SwipeableDrawer
      anchor={'left'}
      open={uiStore.menuOpen}
      onClose={() => uiStore.menuOpen = false}
      onOpen={() => uiStore.menuOpen = true}
      swipeAreaWidth={50}
    >
      <SidebarContent />
    </SwipeableDrawer>

  )
});


const SidebarContent = observer(() => {

  return (
      <>
        <div className="p-3 flex justify-center">
          {authStore.hasRole("admin") &&
              <Button onClick={() => NiceModal.show("AddQuestionsModal")}>הוספת שאלות</Button>}
        </div>
        <div className="w-full h-[1px] bg-black opacity-10"></div>

        <div className="p-3 flex justify-center items-center">
            <Switch checked={dataStore.filterQuestionsByVisibility}
                    onChange={() => dataStore.filterQuestionsByVisibility = !dataStore.filterQuestionsByVisibility}/>
            מפורסם
        </div>
        <div className="w-full h-[1px] bg-black opacity-10"></div>

        <div className="w-[60vw] flex flex-col">
          <div
              className="p-2 text-red-500 flex gap-1 items-center p-3"
              onClick={() => authStore.logout()}
          >
            <i className="fa-regular fa-right-from-bracket"></i>
            <span>התנתק</span>
          </div>
        </div>
      </>
  )
})
