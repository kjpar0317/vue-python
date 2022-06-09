import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const layoutStore = defineStore("layout", () => {
  const data = reactive({ sidebar: true, theme: "light" });

  function setSidebar(sidebar) {
    data.sidebar = sidebar;
  }

  function setTheme(theme) {
    data.theme = theme;
  }

  return {
    ...toRefs(data),
    setSidebar,
    setTheme,
  };
});
