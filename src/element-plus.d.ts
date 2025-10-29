//消除ts对 Element Plus 的类型声明警告


declare module 'element-plus' {
    const ElementPlus: any;
    export default ElementPlus;
  }
  
  declare module '@element-plus/icons-vue' {
    import type { Component } from 'vue';
    const icons: Record<string, Component>;
    export default icons;
  }