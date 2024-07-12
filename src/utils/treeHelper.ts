interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: "id",
  children: "children",
  pid: "pid"
}

//获取配置 Object.assign 从一个或多个源对象复制到目标对象
const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)


export function treeToList<T=any>(tree:any,config:Partial<TreeHelperConfig> = {}):T {
  config = getConfig(config)
  const {children} = config
  const result:any = [...tree]
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children!]) continue
    result.splice(i+1,0,...result[i][children!])
  }
  return result
}