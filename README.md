# 域名威胁告警管理系统

一个基于 Vue 3 + Element Plus 构建的现代化域名威胁告警管理平台，用于实时监控、分析和处理网络安全威胁告警。

## 🛠 技术选型

- **前端框架**: Vue 3 + Composition API
- **UI组件库**: Element Plus
- **构建工具**: Vite
- **开发语言**: TypeScript
- **图标库**: Element Plus Icons


## 开发工具

构建工具: Vite

包管理器: npm

图标库: Element Plus Icons


## 📁 项目结构
<img width="374" height="310" alt="image" src="https://github.com/user-attachments/assets/2396f361-caf5-42fe-843c-2f9c7c1d393a" />

## 📐 页面结构

顶部: 搜索筛选组件（固定高度）

中部: 告警表格（自适应高度）

右侧: 详情抽屉（点击行时滑出）

## 🔄 数据逻辑


Mock Data → API调用 → 状态管理 → 组件渲染 → 用户交互 → 状态更新


###核心状态管理：

<img width="783" height="571" alt="image" src="https://github.com/user-attachments/assets/abfda5e7-ae30-4cd5-a3ca-e31f009e620f" />






###交互逻辑：

页面加载: 自动获取初始数据

搜索筛选: 用户设置条件 → 重置页码 → 重新获取数据

分页操作: 页码变化 → 更新状态 → 重新获取数据

查看详情: 点击行 → 设置当前告警 → 显示详情抽屉

处理告警: 点击处理 → 更新状态 → 关闭抽屉 → 刷新列表


## 🚀 快速开始

### 环境要求
- Node.js 16.0+
- npm 或 yarn

### 安装依赖
```bash
npm install

###启动开发服务器
npm run dev

###构建生产版本
npm run build

## 📝 使用说明
1.查看告警列表：首页展示所有域名威胁告警

2.筛选告警：使用顶部搜索栏按等级或时间筛选

3.查看详情：点击表格行查看告警详细信息

4.处理告警：在详情面板中标记告警为已处理


