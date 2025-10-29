//数据模拟



// 定义告警数据接口
export interface AlertItem {
  id: number;
  alertTime: number;
  ip: string;
  domain: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  status: 'unprocessed' | 'processed';
  threatType: string;
  description: string;
  sourceRegion: string;
  targetPort: number;
}

// 定义请求参数接口
export interface GetAlertListParams {
  page?: number;
  pageSize?: number;
  level?: string;
  startDate?: string;
  endDate?: string;
}

// 定义返回数据接口
export interface GetAlertListResult {
  data: AlertItem[];
  total: number;
  page: number;
  pageSize: number;
}

// 模拟数据生成
const generateMockData = (): AlertItem[] => {
  const levels: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];
  const statusList: ('unprocessed' | 'processed')[] = ['unprocessed', 'processed'];
  const threatTypes: string[] = ['DDoS攻击', '端口扫描', '恶意软件', '钓鱼网站', '数据泄露'];
  const regions: string[] = ['中国', '美国', '俄罗斯', '德国', '日本', '韩国', '印度'];
  const domains: string[] = ['example.com', 'test.org', 'demo.net', 'sample.cn', 'website.com'];
  
  const data: AlertItem[] = [];
  const baseTime = Date.now();
  
  for (let i = 1; i <= 100; i++) {
    const levelIndex = Math.floor(Math.random() * levels.length);
    const statusIndex = Math.floor(Math.random() * statusList.length);
    const threatTypeIndex = Math.floor(Math.random() * threatTypes.length);
    const domainIndex = Math.floor(Math.random() * domains.length);
    const regionIndex = Math.floor(Math.random() * regions.length);
    const descDomainIndex = Math.floor(Math.random() * domains.length);
    const descThreatTypeIndex = Math.floor(Math.random() * threatTypes.length);
    
    // 确保数组索引有效且不为 undefined
    const domain = domains[domainIndex] || 'unknown.com';
    const level = levels[levelIndex] || 'low';
    const status = statusList[statusIndex] || 'unprocessed';
    const threatType = threatTypes[threatTypeIndex] || '未知威胁';
    const sourceRegion = regions[regionIndex] || '未知地区';
    const descDomain = domains[descDomainIndex] || 'unknown.com';
    const descThreatType = threatTypes[descThreatTypeIndex] || '未知威胁';
    
    data.push({
      id: i,
      alertTime: baseTime - Math.random() * 7 * 24 * 60 * 60 * 1000, // 最近7天内
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      domain: domain,
      level: level,
      status: status,
      threatType: threatType,
      description: `检测到针对域名 ${descDomain} 的${descThreatType}行为`,
      sourceRegion: sourceRegion,
      targetPort: Math.floor(Math.random() * 65535)
    });
  }
  
  return data;
}

const mockData: AlertItem[] = generateMockData();

// 模拟API接口
export const getAlertList = (params: GetAlertListParams = {}): Promise<GetAlertListResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [...mockData];
      
      // 等级筛选
      if (params.level) {
        data = data.filter(item => item.level === params.level);
      }
      
      // 时间筛选
      if (params.startDate && params.endDate) {
        const start = new Date(params.startDate).getTime();
        const end = new Date(params.endDate).getTime() + 24 * 60 * 60 * 1000;
        data = data.filter(item => {
          const alertTime = item.alertTime;
          return alertTime >= start && alertTime <= end;
        });
      }
      
      // 分页
      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pageData = data.slice(startIndex, endIndex);
      
      resolve({
        data: pageData,
        total: data.length,
        page: page,
        pageSize: pageSize
      });
    }, 500); // 模拟网络延迟
  });
}