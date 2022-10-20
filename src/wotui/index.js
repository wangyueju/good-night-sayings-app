import {
    Popup,
    PullRefresh,
    Loading,
    InfiniteLoad,
    Input,
    Button
} from 'wot-design'

const UIComponents = [
    Popup,
    PullRefresh,
    Loading,
    InfiniteLoad,
    Input,
    Button
]


const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(Component => {

        Vue.use(Component)

    })

}

export default WotUIPlugin
