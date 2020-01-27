import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home-page',
            component: require('@/components/HomePage').default
        },
        {
            path: '/monitor',
            name: 'monitor-page',
            component: require('@/components/MonitorPage').default
        },
        {
            path: '/census',
            name: 'census-page',
            component: require('@/components/CensusPage').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
