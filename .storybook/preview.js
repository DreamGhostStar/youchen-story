import '../src/styles/index.scss'
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  options: {
    storySort: {
      order: ['使用前须知', '通用'], // 配置故事展示的顺序
    },
  },
}