//告警列表

<template>
    <div class="alert-container">
      <div class="search-section">
        <el-card shadow="never">
          <el-form :model="searchForm" inline>
            <el-form-item label="威胁等级">
              <el-select v-model="searchForm.level" placeholder="请选择威胁等级" clearable style="width: 180px" >
                <el-option label="低" value="low" />
                <el-option label="中" value="medium" />
                <el-option label="高" value="high" />
                <el-option label="紧急" value="critical" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="告警时间">
              <el-date-picker
                v-model="searchForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="handleSearch" :icon="Search">搜索</el-button>
              <el-button @click="handleReset" :icon="Refresh">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
  
      <div class="table-section">
        <el-card shadow="never">
          <AlertTable 
            :data="tableData"
            :loading="loading"
            :pagination="pagination"
            @row-click="handleRowClick"
            @page-change="handlePageChange"
          />
        </el-card>
      </div>
  
      <AlertDetail 
        v-model="detailVisible"
        :alert-data="currentAlert"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { Search, Refresh } from '@element-plus/icons-vue'
  import AlertTable from '@/components/AlertTable.vue'
  import AlertDetail from '@/components/AlertDetail.vue'
  import { getAlertList } from '@/utils/mockData'
  
  const searchForm = reactive({
    level: 'low',        //打开网页后默认跳转低威胁集合
    dateRange: []
  })
  
  const tableData = ref([])
  const loading = ref(false)
  const detailVisible = ref(false)
  const currentAlert = ref({})
  
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })
  
  // 获取告警列表
  const fetchAlertList = async () => {
    loading.value = true
    try {
      const params = {
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        level: searchForm.level,
        startDate: searchForm.dateRange?.[0],
        endDate: searchForm.dateRange?.[1]
      }
      
      const result = await getAlertList(params)
      tableData.value = result.data
      pagination.total = result.total
    } catch (error) {
      console.error('获取告警列表失败:', error)
    } finally {
      loading.value = false
    }
  }
  
  // 搜索
  const handleSearch = () => {
    pagination.currentPage = 1
    fetchAlertList()
  }
  
  // 重置
  const handleReset = () => {
    searchForm.level = ''
    searchForm.dateRange = []
    pagination.currentPage = 1
    fetchAlertList()
  }
  
  // 点击表格行
  const handleRowClick = (row) => {
    currentAlert.value = row
    detailVisible.value = true
  }
  
  // 分页变化
  const handlePageChange = (page) => {
    pagination.currentPage = page
    fetchAlertList()
  }
  
  onMounted(() => {
    fetchAlertList()
  })
  </script>
  
  <style scoped>
  /* .select-value:deep(.el-input__inner){
    border-color: #409EFF;
    background-color: #f0f9ff;
    font-weight: 500;
    color: #409EFF;
  } */


  .alert-container {
    padding: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .search-section {
    margin-bottom: 20px;
  }
  
  .table-section {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  :deep(.el-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  :deep(.el-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  </style>