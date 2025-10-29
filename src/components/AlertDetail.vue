//告诫详情界面

<template>
    <el-drawer
      v-model="drawerVisible"
      title="告警详情"
      direction="rtl"
      size="40%"
      destroy-on-close
    >
      <div class="alert-detail" v-if="props.alertData.id">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="告警ID">
            {{ props.alertData.id }}
          </el-descriptions-item>
          
          <el-descriptions-item label="告警时间">
            {{ formatTime(props.alertData.alertTime) }}
          </el-descriptions-item>
          
          <el-descriptions-item label="IP地址">
            {{ props.alertData.ip }}
          </el-descriptions-item>
          
          <el-descriptions-item label="域名">
            {{ props.alertData.domain }}
          </el-descriptions-item>
          
          <el-descriptions-item label="威胁等级">
            <el-tag :type="getLevelType(props.alertData.level)" effect="light">
              {{ getLevelText(props.alertData.level) }}
            </el-tag>
          </el-descriptions-item>
          
          <el-descriptions-item label="状态">
            <el-tag :type="props.alertData.status === 'processed' ? 'success' : 'warning'" effect="light">
              {{ props.alertData.status === 'processed' ? '已处理' : '未处理' }}
            </el-tag>
          </el-descriptions-item>
          
          <el-descriptions-item label="威胁类型">
            {{ props.alertData.threatType }}
          </el-descriptions-item>
          
          <el-descriptions-item label="描述">
            {{ props.alertData.description }}
          </el-descriptions-item>
          
          <el-descriptions-item label="来源地区">
            {{ props.alertData.sourceRegion }}
          </el-descriptions-item>
          
          <el-descriptions-item label="目标端口">
            {{ props.alertData.targetPort }}
          </el-descriptions-item>
        </el-descriptions>
  
        <div class="action-buttons" v-if="props.alertData.status === 'unprocessed'">
          <el-button type="primary" @click="handleProcess">标记为已处理</el-button>
        </div>
      </div>
      
      <div v-else class="empty-detail">
        <el-empty description="暂无数据" />
      </div>
    </el-drawer>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    alertData: {
      type: Object,
      default: () => ({})
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'refresh'])
  
  const drawerVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
  
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
  
  // 处理告警
  const handleProcess = () => {
    ElMessage.success('告警已标记为已处理')
    emit('refresh')
    drawerVisible.value = false
  }
  </script>
  
  <style scoped>
  .alert-detail {
    padding: 0 20px;
  }
  
  .action-buttons {
    margin-top: 20px;
    text-align: center;
  }
  
  .empty-detail {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  :deep(.el-descriptions) {
    margin-top: 20px;
  }
  
  :deep(.el-descriptions__label) {
    width: 100px;
    font-weight: bold;
  }
  </style>