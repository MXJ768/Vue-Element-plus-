//告诫表格组件

<template>
    <div class="alert-table">
      <el-table
        :data="props.data"
        :loading="props.loading"
        @row-click="handleRowClick"
        style="width: 100%"
        height="100%"
        highlight-current-row
      >
        <el-table-column prop="alertTime" label="告警时间" width="180" sortable>
          <template #default="{ row }">
            {{ formatTime(row.alertTime) }}
          </template>
        </el-table-column>
        
        <el-table-column prop="ip" label="IP地址" width="150" />
        
        <el-table-column prop="domain" label="域名" min-width="200" show-overflow-tooltip />
        
        <el-table-column prop="level" label="威胁等级" width="100">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)" effect="light">
              {{ getLevelText(row.level) }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'processed' ? 'success' : 'warning'" effect="light">
              {{ row.status === 'processed' ? '已处理' : '未处理' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
  
      <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="props.pagination.pageSize"
        :total="props.pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => ({})
    }
  })
  
  const emit = defineEmits(['row-click', 'page-change'])
  
  const currentPage = computed({
    get: () => props.pagination.currentPage,
    set: (value) => emit('page-change', value)
  })
  
  // 点击行
  const handleRowClick = (row) => {
    emit('row-click', row)
  }
  
  // 分页大小变化
  const handleSizeChange = (size) => {
    emit('page-change', 1)
    
  }
  
  // 当前页变化
  const handleCurrentChange = (page) => {
    emit('page-change', page)
  }
  
  // 格式化时间
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }
  
  // 获取等级类型
  const getLevelType = (level) => {
    const types = {
      low: 'info',
      medium: 'warning',
      high: 'danger',
      critical: 'danger'
    }
    return types[level] || 'info'
  }
  
  // 获取等级文本
  const getLevelText = (level) => {
    const texts = {
      low: '低',
      medium: '中',
      high: '高',
      critical: '紧急'
    }
    return texts[level] || '未知'
  }
  </script>
  
  <style scoped>
  .alert-table {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .pagination-container {
    padding: 20px 0;
    display: flex;
    justify-content: flex-end;
  }
  
  :deep(.el-table) {
    flex: 1;
  }
  
  :deep(.el-table__row) {
    cursor: pointer;
  }
  
  :deep(.el-table__row:hover) {
    background-color: #f5f7fa;
  }
  </style>