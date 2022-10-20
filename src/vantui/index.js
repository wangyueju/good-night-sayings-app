import {
    PullRefresh,
    Loading,
    ImagePreview,
} from 'vant'

const vantComponents = [
    PullRefresh,
    Loading,
    ImagePreview,
]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}